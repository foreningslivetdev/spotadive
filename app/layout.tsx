export const metadata = {
  title: "Spotadive",
  description: "Öppen statistik om diving-utvisningar i hockey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
