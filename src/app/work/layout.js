import { Header } from "@/src/components/layout/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header className="flex justify-center items-center" />

      <main className="flex-grow">{children}</main>
    </>
  );
}
