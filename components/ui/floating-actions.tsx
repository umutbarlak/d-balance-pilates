"use client";

import { Button } from "@/components/ui/button";
import WhatsApp from "./whatsapp";
import Phone from "./phone";

export default function FloatingActions() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = encodeURIComponent(
    "Merhaba, D-Balance Pilates hakkında bilgi almak istiyorum."
  );

  console.log(whatsappNumber, phoneNumber);

  return (
    <>
      {/* Phone Button - Left */}
      <div className="fixed left-4 bottom-8 z-50">
        <Button
          asChild
          size="lg"
          className="h-28 w-28 rounded-full shadow-lg hover:scale-110 transition-transform bg-green-500 hover:bg-green-400"
        >
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone className="w-16 h-16 text-green-600" />
          </a>
        </Button>
      </div>

      <div className="fixed right-4 bottom-8 z-50">
        <Button
          asChild
          size="lg"
          className="h-28 w-28 rounded-full shadow-lg hover:scale-110 transition-transform bg-green-500 hover:bg-green-400"
        >
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp className="w-16 h-16 text-green-600" />
          </a>
        </Button>
      </div>
    </>
  );
}
