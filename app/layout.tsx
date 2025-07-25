import "./globals.css";
import type { Metadata } from "next/metadata";
import { Inter } from "next/font/google";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import FloatingActions from "@/components/ui/floating-actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D-Balance Pilates Studio | Ankara'nın En İyi Pilates Merkezi",
  description:
    "Ankara'da pilates, klinik pilates, reformer pilates ve mat pilates dersleri. Uzman eğitmenlerimizle vücudunuzu güçlendirin.",
  keywords:
    "pilates ankara, reformer pilates, klinik pilates, mat pilates, pilates dersi, ankara pilates studio",
  openGraph: {
    title: "D-Balance Pilates Studio",
    description: "Ankara'nın en deneyimli pilates stüdyosu",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
