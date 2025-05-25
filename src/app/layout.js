import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";
import ClickSpark from "@/src/components/ui/ClickSpark";
export const metadata = {
  title: "SRB CODES - Creator",
  description:
    "Get high quality insights on internet communities, building products communities love and startups. This weekly email will get your creative juices flowing. CEO of Late Checkout - a holding company building community-based technology businesses.",
  keywords: [
    "startups",
    "business",
    "entrepreneurship",
    "communities",
    "tech",
    "SRB.Codes",
  ],
  authors: [{ name: "SRB.Codes" }],
  openGraph: {
    title: "SRB.Codes - Creator",
    description:
      "Get high quality insights on internet communities, building products communities love and startups.",
    url: "https://www.srb.codes",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#fefeff] ">
        <ClickSpark
          sparkColor="#000"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <main className="flex-grow">{children}</main>
          <Toaster />
        </ClickSpark>
      </body>
    </html>
  );
}
