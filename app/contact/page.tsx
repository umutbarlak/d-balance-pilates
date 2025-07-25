import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "İletişim | D-Balance Pilates Studio",
  description:
    "D-Balance Pilates Studio ile iletişime geçin. Ankara'da pilates dersleri için randevu alın.",
};

export default function ContactPage() {
  const phoneNumber =
    process.env.NEXT_PUBLIC_PHONE_NUMBER || "+90 505 586 15 38";
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905551234567";
  const address = process.env.ADDRESS || "Ankara, Türkiye";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            İletişim
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Size en yakın pilates stüdyomuzda buluşalım. Sorularınız için bize
            ulaşın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-6 w-6 text-primary mr-3" />
                  Adres
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{address}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-6 w-6 text-primary mr-3" />
                  Telefon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-primary hover:underline font-medium"
                >
                  {phoneNumber}
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  E-posta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:info@dbalancepilates.com"
                  className="text-primary hover:underline font-medium"
                >
                  info@dbalancepilates.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-6 w-6 text-primary mr-3" />
                  Çalışma Saatleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Pazartesi - Cuma:</span>
                    <span>08:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cumartesi:</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pazar:</span>
                    <span>10:00 - 16:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">
                  WhatsApp İletişim
                </CardTitle>
                <CardDescription className="text-green-600">
                  Hızlı yanıt için WhatsApp üzerinden yazın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Merhaba, D-Balance Pilates hakkında bilgi almak istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  WhatsApp'tan Yazın
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Google Maps */}
          <div className="h-96 lg:h-full">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.258352879651!2d28.623741375726894!3d41.041479017380404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f005839da8b%3A0xdb748a4da514ca2a!2sD-Balance%20Pilates%20Studio!5e0!3m2!1str!2str!4v1753039554622!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="D-Balance Pilates Studio Lokasyon"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
