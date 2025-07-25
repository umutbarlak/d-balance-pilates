import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const footerSections = [
  {
    title: 'D-Balance Pilates',
    links: [
      { label: 'Hakkımızda', href: '/hakkimizda' },
      { label: 'Ekibimiz', href: '/ekibimiz' },
      { label: 'Postür Değerlendirme', href: '/postur-degerlendirme' },
      { label: 'İletişim', href: '/iletisim' },
    ],
  },
  {
    title: 'Pilates',
    links: [
      { label: 'Temel Pilates', href: '/pilates' },
      { label: 'Pilates Nedir', href: '/pilates-nedir' },
      { label: 'Pilates Faydaları', href: '/pilates-faydalari' },
      { label: 'Pilates Türleri', href: '/pilates-turleri' },
    ],
  },
  {
    title: 'Klinik Pilates',
    links: [
      { label: 'Klinik Pilates', href: '/klinik-pilates' },
      { label: 'Rehabilitasyon', href: '/klinik-pilates-rehabilitasyon' },
      { label: 'Fizyoterapi', href: '/klinik-pilates-fizyoterapi' },
      { label: 'Sağlık Pilates', href: '/saglik-pilates' },
    ],
  },
  {
    title: 'Reformer Pilates',
    links: [
      { label: 'Reformer Pilates', href: '/reformer-pilates' },
      { label: 'Reformer Pilates Piriformis', href: '/reformer-pilates-piriformis' },
      { label: 'Reformer Pilates Yıldız', href: '/reformer-pilates-yildiz-kirkkonaklar' },
      { label: 'Erkekler İçin Reformer Pilates', href: '/erkekler-icin-reformer-pilates-ankara' },
      { label: 'Aletli Pilates', href: '/aletli-pilates' },
      { label: 'En İyi Reformer Pilates', href: '/reformer-pilates-ankara-en-iyi-hoca' },
    ],
  },
  {
    title: 'Mat Pilates',
    links: [
      { label: 'Mat Pilates', href: '/mat-pilates' },
      { label: 'Evde Pilates', href: '/evde-mat-pilates' },
      { label: 'Başlangıç Mat Pilates', href: '/baslangic-mat-pilates' },
      { label: 'İleri Mat Pilates', href: '/ileri-mat-pilates' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="ml-2 text-xl font-bold">D-Balance Pilates</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ankara'nın en deneyimli pilates stüdyosu. Uzman eğitmenlerimizle 
              vücudunuzu güçlendirin, yaşam kalitenizi artırın.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-300">{process.env.ADDRESS || 'Ankara, Türkiye'}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <a 
                  href={`tel:${process.env.PHONE_NUMBER}`}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {process.env.PHONE_NUMBER || '+90 555 123 45 67'}
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
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
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
              <Link href="/gizlilik-politikasi" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}