"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, ArrowUp, ArrowDown } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export interface HeroSlide {
  _id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/admin/hero-slides");
      if (response.ok) {
        const data = await response.json();
        setSlides(data.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order));
      }
    } catch (error) {
      console.error("Failed to fetch slides:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSlide = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/hero-slides/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSlides(slides.filter((slide) => slide._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete slide:", error);
    }
  };

  const updateOrder = async (id: string, newOrder: number) => {
    try {
      const response = await fetch(`/api/admin/hero-slides/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: newOrder }),
      });
      if (response.ok) {
        fetchSlides(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const moveSlide = (index: number, direction: "up" | "down") => {
    const newSlides = [...slides];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newSlides.length) return;

    // Swap orders
    const currentSlide = newSlides[index];
    const targetSlide = newSlides[targetIndex];

    updateOrder(currentSlide._id, targetSlide.order);
    updateOrder(targetSlide._id, currentSlide.order);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  console.log(slides);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Hero Slayt Yönetimi
          </h1>
          <p className="text-gray-600">Ana sayfa hero slaytlarınızı yönetin</p>
        </div>
        <Button asChild>
          <Link href="/admin/hero-slides/new">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Slayt
          </Link>
        </Button>
      </div>

      {slides.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Image src={""} alt="Hero Slide" width={500} height={300} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz hero slaytı yok
            </h3>
            <p className="text-gray-600 mb-4">
              İlk hero slaytınızı oluşturmak için başlayın
            </p>
            <Button asChild>
              <Link href="/admin/hero-slides/new">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Slayt
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {slides.map((slide, index) => (
            <Card key={slide._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="relative w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {slide.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {slide.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge
                          variant={slide.isActive ? "default" : "secondary"}
                        >
                          {slide.isActive ? "Aktif" : "Pasif"}
                        </Badge>
                        <Badge variant="outline">Sıra: {slide.order}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveSlide(index, "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveSlide(index, "down")}
                          disabled={index === slides.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={slide.ctaLink} target="_blank">
                            <Eye className="h-4 w-4 mr-1" />
                            Görüntüle
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/hero-slides/${slide._id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Hero slaytını sil
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Bu işlem geri alınamaz. Hero slaytı kalıcı
                                olarak silinecek.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>İptal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteSlide(slide._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Sil
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
