"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  _id?: string;
  title: string;
  links: FooterLink[];
  order?: number;
};

export default function FooterAdminPage() {
  const [sections, setSections] = useState<FooterSection[]>([]);
  const [loading, setLoading] = useState(false);

  // Footer bölümlerini yükle
  useEffect(() => {
    fetch("/api/footer-sections")
      .then((res) => res.json())
      .then(setSections);
  }, []);

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      { title: "", links: [{ label: "", href: "" }] },
    ]);
  };

  const handleAddLink = (sectionIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].links.push({ label: "", href: "" });
    setSections(updated);
  };

  const handleSectionChange = (
    sectionIndex: number,
    field: keyof FooterSection,
    value: string
  ) => {
    const updated = [...sections];
    (updated[sectionIndex][field] as any) = value;
    setSections(updated);
  };

  const handleLinkChange = (
    sectionIndex: number,
    linkIndex: number,
    field: keyof FooterLink,
    value: string
  ) => {
    const updated = [...sections];
    updated[sectionIndex].links[linkIndex][field] = value;
    setSections(updated);
  };

  const handleRemoveLink = (sectionIndex: number, linkIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].links.splice(linkIndex, 1);
    setSections(updated);
  };

  const handleRemoveSection = (sectionIndex: number) => {
    const updated = [...sections];
    updated.splice(sectionIndex, 1);
    setSections(updated);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/footer-sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sections),
      });
      if (!res.ok) throw new Error("Kayıt başarısız");
      alert("Footer güncellendi");
    } catch (err) {
      console.error(err);
      alert("Hata oluştu");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Footer Yönetimi</h1>
        <p className="text-gray-600">Site altbilgi bağlantılarını yönetin</p>
      </div>

      <div className="space-y-6 mb-8">
        {sections.map((section, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Bölüm {i + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveSection(i)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                placeholder="Bölüm Başlığı"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(i, "title", e.target.value)
                }
              />

              <div className="space-y-3">
                {section.links.map((link, j) => (
                  <div key={j} className="flex gap-2 items-center">
                    <Input
                      placeholder="Label"
                      value={link.label}
                      onChange={(e) =>
                        handleLinkChange(i, j, "label", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Href"
                      value={link.href}
                      onChange={(e) =>
                        handleLinkChange(i, j, "href", e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveLink(i, j)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleAddLink(i)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Link Ekle
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleAddSection}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Bölüm
        </Button>

        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>
    </div>
  );
}
