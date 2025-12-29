/**
 * OpenGraph Image Generation Script
 *
 * Generates the default OG image (1200x630) from the source logo.
 * Run with: node scripts/generate-og-image.mjs
 */

import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');
const sourceLogo = join(publicDir, 'logo', '2.png');
const outputPath = join(publicDir, 'og-image.png');

// Brand colors
const NAVY = '#1B2838';

// OG image dimensions (standard for social sharing)
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateOGImage() {
  console.log('Starting OG image generation...');
  console.log('Source logo:', sourceLogo);

  try {
    // Get source image metadata
    const metadata = await sharp(sourceLogo).metadata();
    console.log(`Source image: ${metadata.width}x${metadata.height}`);

    // Calculate logo size to fit nicely in the OG image
    // We want the logo to be prominently featured but with padding
    // Target about 70% of the smaller dimension for the logo area
    const maxLogoWidth = Math.floor(OG_WIDTH * 0.7);
    const maxLogoHeight = Math.floor(OG_HEIGHT * 0.75);

    // Resize logo while maintaining aspect ratio
    const resizedLogo = await sharp(sourceLogo)
      .resize(maxLogoWidth, maxLogoHeight, {
        fit: 'inside',
        withoutEnlargement: false,
      })
      .toBuffer();

    // Get resized logo dimensions
    const resizedMetadata = await sharp(resizedLogo).metadata();
    console.log(`Resized logo: ${resizedMetadata.width}x${resizedMetadata.height}`);

    // Calculate position to center the logo
    const left = Math.floor((OG_WIDTH - resizedMetadata.width) / 2);
    const top = Math.floor((OG_HEIGHT - resizedMetadata.height) / 2);

    // Create the OG image with navy background and centered logo
    await sharp({
      create: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        channels: 4,
        background: NAVY,
      },
    })
      .composite([
        {
          input: resizedLogo,
          left: left,
          top: top,
        },
      ])
      .png({
        quality: 90,
        compressionLevel: 9,
      })
      .toFile(outputPath);

    console.log(`\nGenerated: og-image.png (${OG_WIDTH}x${OG_HEIGHT})`);
    console.log(`Output: ${outputPath}`);
    console.log('\nOG image generated successfully!');

  } catch (error) {
    console.error('Error generating OG image:', error);
    process.exit(1);
  }
}

generateOGImage();
