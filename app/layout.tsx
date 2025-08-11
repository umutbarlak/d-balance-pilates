import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import FloatingActions from "@/components/ui/floating-actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D-Balance Pilates Studio | İstanbul'un En İyi Pilates Merkezi",
  description:
    "İstanbulda'da pilates, klinik pilates, reformer pilates ve mat pilates dersleri. Uzman eğitmenlerimizle vücudunuzu güçlendirin.",
  keywords:
    "pilates ankara, reformer pilates, klinik pilates, mat pilates, pilates dersi, istanbul pilates studio",
  openGraph: {
    title: "D-Balance Pilates Studio",
    description: "İstanbul'un en deneyimli pilates stüdyosu",
    type: "website",
  },
  icons: {
    icon: "/logo-1.png",
    apple: "/logo-1.png",
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
