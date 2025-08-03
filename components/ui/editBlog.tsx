"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save } from "lucide-react";
import Image from "next/image";

export default function EditBlogForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/blogs/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/blogs");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Label>Başlık</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Slug</Label>
        <Input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Özet</Label>
        <Textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>İçerik</Label>
        <Textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={15}
          required
        />
      </div>

      <div>
        <Label>Meta Başlık</Label>
        <Input
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Meta Açıklama</Label>
        <Textarea
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isPublished"
          checked={formData.isPublished}
          onCheckedChange={(val) =>
            setFormData((prev: any) => ({ ...prev, isPublished: val }))
          }
        />
        <Label htmlFor="isPublished">Yayında</Label>
      </div>

      <div>
        <Label>Görsel</Label>
        {formData.image && (
          <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
            <Image
              src={formData.image}
              alt="Görsel"
              fill
              className="object-cover"
            />
          </div>
        )}
        <Input
          type="file"
          onChange={handleImageUpload}
          disabled={imageUploading}
        />
      </div>

      <Button type="submit" disabled={loading}>
        <Save className="w-4 h-4 mr-2" />
        {loading ? "Kaydediliyor..." : "Güncelle"}
      </Button>
    </form>
  );
}
