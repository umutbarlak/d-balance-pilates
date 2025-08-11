import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { getFooterLinks } from "@/lib/footer";
import dbConnect from "@/lib/mongodb";
import Image from "next/image";

export default async function Footer() {
  await dbConnect();
  const footerLinks: Array<{
    category: string;
    pages: Array<{ title: string; slug: string }>;
  }> = await getFooterLinks();

  const address =
    "Çakmaklı Mah. Hadımköy Yolu Cad. No: 53, Büyükçekmece/İstanbul";
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-primary rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  width={80}
                  height={80}
                  className="bg-[#101827] object-cover"
                  src="/logo.png"
                  alt="d-balance pilates"
                />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                D-Balance Pilates
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              İstanbul'un en deneyimli pilates stüdyosu. Uzman eğitmenlerimizle
              vücudunuzu güçlendirin, yaşam kalitenizi artırın.
            </p>

            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-300">{address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <a
                  href={`tel:5055861538`}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  0 505 586 15 38
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <a
                  href="mailto:info@dbalancepilates.com"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  info@dbalancepilates.com
                </a>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.category}>
              <h3 className="font-semibold text-lg mb-4 capitalize">
                {section.category}
              </h3>
              <ul className="space-y-2">
                {section.pages.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={link.slug}
                      className="text-gray-300 hover:text-primary transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 D-Balance Pilates Studio. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/gizlilik-politikasi"
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/kullanim-kosullari"
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
