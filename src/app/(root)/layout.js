import Header from "@/src/components/layout/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />

      <main className="flex-grow">{children}</main>
    </>
  );
}
