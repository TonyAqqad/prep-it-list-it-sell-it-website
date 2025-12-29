/**
 * Favicon Generation Script
 *
 * Generates all required favicon sizes from the source logo.
 * Run with: node scripts/generate-favicons.mjs
 */

import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');
const sourceLogo = join(publicDir, 'logo', '2.png');

// Brand colors
const NAVY = '#1B2838';

// Favicon sizes to generate
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

async function generateFavicons() {
  console.log('Starting favicon generation...');
  console.log('Source logo:', sourceLogo);

  try {
    // Get source image metadata
    const metadata = await sharp(sourceLogo).metadata();
    console.log(`Source image: ${metadata.width}x${metadata.height}`);

    // Generate each size
    for (const { name, size } of sizes) {
      const outputPath = join(publicDir, name);

      await sharp(sourceLogo)
        .resize(size, size, {
          fit: 'contain',
          background: NAVY,
        })
        .png()
        .toFile(outputPath);

      console.log(`Generated: ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (multi-size ICO file)
    // Sharp doesn't natively support ICO, so we'll create a 32x32 PNG
    // and name it favicon.ico (browsers accept PNG format for favicons)
    // For a proper .ico file, we'd need a separate tool like png-to-ico

    // Instead, let's create the ICO as a PNG (most browsers support this)
    // Or we can generate multiple sizes and use the 32x32 as the primary
    const faviconPath = join(publicDir, 'favicon.ico');

    // For proper ICO support, we'll generate a 48x48 PNG that works well
    // Modern browsers prefer the link rel="icon" tags anyway
    await sharp(sourceLogo)
      .resize(48, 48, {
        fit: 'contain',
        background: NAVY,
      })
      .png()
      .toFile(faviconPath);

    console.log('Generated: favicon.ico (48x48 PNG)');

    console.log('\nAll favicons generated successfully!');
    console.log('\nGenerated files:');
    sizes.forEach(({ name }) => console.log(`  - public/${name}`));
    console.log('  - public/favicon.ico');

  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
