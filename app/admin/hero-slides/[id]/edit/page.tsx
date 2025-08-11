"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, Upload } from "lucide-react";

export default function EditHeroSlideForm({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const fetchSlide = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/hero-slides/${params.id}`);
        if (!res.ok) {
          setError("Veri alınamadı.");
          return;
        }

        const slide = await res.json();
        setFormData(slide);
      } catch (err) {
        setError("Sunucu hatası.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlide();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number" ? +e.target.value : e.target.value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const uploadForm = new FormData();
    uploadForm.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadForm,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev: any) => ({ ...prev, image: data.url }));
      } else {
        setError("Resim yüklenemedi.");
      }
    } catch {
      setError("Resim yüklenemedi.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev: any) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/hero-slides/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/hero-slides");
      } else {
        const data = await res.json();
        setError(data.error || "Güncelleme sırasında hata oluştu.");
      }
    } catch {
      setError("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  console.log(formData);

 if (loading || !formData) {
  return <div>Yükleniyor...</div>;
}


  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 p-10">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Slayt İçeriği</CardTitle>
          <CardDescription>Hero slayt içeriğini güncelleyin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Başlık *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Açıklama *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaText">Buton Metni *</Label>
              <Input
                id="ctaText"
                name="ctaText"
                value={formData.ctaText}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="ctaLink">Buton Linki *</Label>
              <Input
                id="ctaLink"
                name="ctaLink"
                value={formData.ctaLink}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="order">Sıra Numarası</Label>
            <Input
              id="order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
              min="0"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Durum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev: any) => ({ ...prev, isActive: checked }))
                }
              />
              <Label htmlFor="isActive">Aktif</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Slayt Görseli</CardTitle>
            <CardDescription>Görsel yükleyin veya değiştirin</CardDescription>
          </CardHeader>
          <CardContent>
            {formData.image ? (
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={formData.image}
                    alt="Slayt Görseli"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemoveImage}
                >
                  Görseli Kaldır
                </Button>
              </div>
            ) : (
              <div>
                <Label htmlFor="image" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {imageUploading
                        ? "Yükleniyor..."
                        : "Resim yüklemek için tıklayın"}
                    </p>
                  </div>
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={imageUploading}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Button type="submit" disabled={loading}>
        <Save className="h-4 w-4 mr-2" />
        {loading ? "Güncelleniyor..." : "Güncelle"}
      </Button>
    </form>
  );
}
