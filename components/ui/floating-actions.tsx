"use client";

import { Button } from "@/components/ui/button";
import WhatsApp from "./whatsapp";
import Phone from "./phone";

export default function FloatingActions() {
  const phoneNumber = "+90 505 586 15 38";
  const whatsappNumber = "905055861538";
  const message = encodeURIComponent(
    "Merhaba, D-Balance Pilates hakkında bilgi almak istiyorum."
  );

  return (
    <>
      {/* Phone Button - Left */}
      <div className="fixed left-4 bottom-8 z-50">
        <Button
          size="lg"
          className="w-16 h-16 md:h-24 md:w-24 rounded-full shadow-lg hover:scale-110 transition-transform bg-green-500 hover:bg-green-400"
        >
          <a
            href={`tel:${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone className="w-6 h-6 md:w-14 md:h-14" />
          </a>
        </Button>
      </div>

      <div className="fixed right-4 bottom-8 z-50">
        <Button
          size="lg"
          className="w-16 h-16 md:h-24 md:w-24 rounded-full shadow-lg hover:scale-110 transition-transform bg-green-500 hover:bg-green-400 z-30 border-b-0"
        >
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp className="w-8 h-8 md:w-14 md:h-14" />
          </a>
        </Button>
      </div>
    </>
  );
}
