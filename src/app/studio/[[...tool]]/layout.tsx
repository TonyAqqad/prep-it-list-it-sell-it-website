export const metadata = {
  title: "CMS | Prep It List It Sell It",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Don't wrap in html/body - the root layout handles that
  // Use a full-height container for Sanity Studio
  return (
    <div className="fixed inset-0 bg-white" style={{ margin: 0 }}>
      {children}
    </div>
  );
}
