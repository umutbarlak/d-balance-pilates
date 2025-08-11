"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, Heart, Dumbbell, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const serviceIcons = {
  pilates: Activity,
  "klinik-pilates": Heart,
  "reformer-pilates": Dumbbell,
  "mat-pilates": User,
};

const defaultServices = [
  {
    title: "Pilates",
    slug: "pilates",
    description: "Güçlü bir vücut ve zihin için temel pilates egzersizleri",
    image:
      "https://res.cloudinary.com/da0fgi2si/image/upload/v1754506286/pilates-studio/2150830123_parcnv.jpg",
  },
  {
    title: "Klinik Pilates",
    slug: "klinik-pilates",
    description: "Fizyoterapist eşliğinde rehabilitasyon odaklı pilates",
    image:
      "https://res.cloudinary.com/da0fgi2si/image/upload/v1754506287/pilates-studio/2150858066_cgnc6f.jpg",
  },
  {
    title: "Reformer Pilates",
    slug: "reformer-pilates",
    description: "Modern aletlerle desteklenmiş ileri seviye pilates",
    image:
      "https://res.cloudinary.com/da0fgi2si/image/upload/v1754506287/pilates-studio/2150830112_nqfpgm.jpg",
  },
  {
    title: "Mat Pilates",
    slug: "mat-pilates",
    description: "Matla yapılan temel pilates hareketleri",
    image:
      "https://res.cloudinary.com/da0fgi2si/image/upload/v1754506287/pilates-studio/2148924700_pynbds.jpg",
  },
];

export default function ServiceCards() {
  const [services, setServices] = useState(defaultServices);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Neler Yapıyoruz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uzman eğitmenlerimizle birlikte vücudunuzu güçlendirin ve yaşam
            kalitenizi artırın
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent =
              serviceIcons[service.slug as keyof typeof serviceIcons] ||
              Activity;

            return (
              <Card
                key={service.slug}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                  >
                    <Link href={`/${service.slug}`}>Detayları Gör</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
