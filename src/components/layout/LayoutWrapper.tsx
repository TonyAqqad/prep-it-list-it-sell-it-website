import { getLayoutData } from "@/lib/getLayoutData";
import Header from "./Header";
import Footer from "./Footer";

export default async function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const data = await getLayoutData();

  return (
    <>
      <Header
        navLinks={data.navigation.mainNav}
        ctaButton={data.navigation.ctaButton}
        phone={data.contactInfo.phoneOffice}
        phoneRaw={data.contactInfo.phoneOfficeRaw}
      />
      {children}
      <Footer
        companyName={data.siteSettings.companyName}
        companyDescription={data.siteSettings.description}
        credentials={data.siteSettings.credentials}
        contactInfo={data.contactInfo}
        quickLinks={data.footer.quickLinks}
        services={data.services}
      />
    </>
  );
}
