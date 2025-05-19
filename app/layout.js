import "./globals.css";

export const metadata = {
  title: "Codes",
  description: "srb codes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
