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
import { Plus, Edit, Trash2, Eye, Calendar, Folder } from "lucide-react";
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

interface Page {
  _id: string;
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  image?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/admin/pages");
      if (response.ok) {
        const data = await response.json();
        setPages(data);
      }
    } catch (error) {
      console.error("Failed to fetch pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPages(pages.filter((page) => page._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete page:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      pilates: "bg-blue-100 text-blue-800",
      "klinik pilates": "bg-green-100 text-green-800",
      "reformer pilates": "bg-purple-100 text-purple-800",
      "mat pilates": "bg-orange-100 text-orange-800",
      default: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.default;
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sayfa Yönetimi</h1>
          <p className="text-gray-600">Web sitesi sayfalarınızı yönetin</p>
        </div>
        <Button asChild>
          <Link href="/admin/pages/new">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Sayfa
          </Link>
        </Button>
      </div>

      {pages.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Folder className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz sayfa yok
            </h3>
            <p className="text-gray-600 mb-4">
              İlk sayfanızı oluşturmak için başlayın
            </p>
            <Button asChild>
              <Link href="/admin/pages/new">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Sayfa
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Card
              key={page._id}
              className="group hover:shadow-lg transition-shadow"
            >
              {page.image && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={page.image}
                    alt={page.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={page.isPublished ? "default" : "secondary"}>
                      {page.isPublished ? "Yayında" : "Taslak"}
                    </Badge>
                  </div>
                </div>
              )}

              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getCategoryColor(page.category)}>
                    {page.category}
                  </Badge>
                  {page.subcategory && (
                    <Badge variant="outline" className="text-xs">
                      {page.subcategory}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {page.title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(page.createdAt)}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-sm text-gray-600 mb-4">
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    /{page.slug}
                  </code>
                </div>

                <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <Link href={`/${page.slug}`} target="_blank">
                      <Eye className="h-4 w-4 mr-1" />
                      Görüntüle
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/pages/${page._id}/edit`}>
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
                        <AlertDialogTitle>Sayfayı sil</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bu işlem geri alınamaz. Sayfa kalıcı olarak silinecek.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deletePage(page._id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Sil
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
