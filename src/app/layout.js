import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";
import ClickSpark from "@/src/components/ui/ClickSpark";
import { DATA } from "@/src/data/resume";

export const metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <link rel="icon" type="image/icon" sizes="32x32" href="/favicon.ico" />
      <body className="bg-[#000] text-white">
        <ClickSpark
          sparkColor="#3B82F6"
          sparkSize={8}
          sparkRadius={12}
          sparkCount={6}
          duration={300}
        >
          <main className="flex-grow">{children}</main>
          <Toaster position="bottom-center" />
        </ClickSpark>
      </body>
    </html>
  );
}
