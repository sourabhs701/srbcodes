import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";
import ClickSpark from "@/src/components/ui/ClickSpark";

export const metadata = {
  title: "SRB CODES - HOME",
  description:
    "Premium AI-powered development services for businesses who demand excellence. From scalable backends to intelligent automation solutions. SRB CODES so you dont have to.",
  keywords: [
    "full-stack development",
    "AI integration",
    "backend architecture",
    "DevOps",
    "scalable systems",
    "professional development",
    "automation solutions",
    "SRB.Codes",
    "enterprise software",
    "technical consulting",
  ],
  authors: [{ name: "SRB.Codes" }],
  openGraph: {
    title: "SRB CODES - So You Don't Have To",
    description:
      "Premium AI-powered development services for businesses who demand excellence. From scalable backends to intelligent automation solutions.",
    url: "https://www.srb.codes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SRB CODES - So You Don't Have To",
    description:
      "Premium AI-powered development services for businesses who demand excellence.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#000] text-white">
        <ClickSpark
          sparkColor="#3B82F6"
          sparkSize={8}
          sparkRadius={12}
          sparkCount={6}
          duration={300}
        >
          <main className="flex-grow">{children}</main>
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#1F2937",
                color: "#F9FAFB",
                border: "1px solid #374151",
              },
            }}
          />
        </ClickSpark>
      </body>
    </html>
  );
}
