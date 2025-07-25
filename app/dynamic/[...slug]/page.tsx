import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dbConnect from "@/lib/mongodb";
import { getPageBySlug, getRelatedPages } from "@/lib/page";
import { get } from "node:http";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join("/");
  await dbConnect();
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: "Sayfa Bulunamadı | D-Balance Pilates",
    };
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      images: [page.image],
      type: "website",
    },
  };
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join("/");
  await dbConnect();
  const page = await getPageBySlug(slug);
  // const page = mockPages[slug as keyof typeof mockPages];

  if (!page) {
    notFound();
  }

  const relatedPages = await getRelatedPages(page.category, page._id);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {page.title}
          </h1>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={page.image}
            alt={page.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Page Content */}
        <Card className="border-0 shadow-lg mb-12">
          <CardContent className="p-8 md:p-12">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-ol:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </CardContent>
        </Card>

        {/* Related Pages */}
        {relatedPages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              İlgili Sayfalar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPages.map((p) => (
                <Card
                  key={p._id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-32 overflow-hidden rounded-t-lg">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start p-0"
                    >
                      <Link href={`/${p.slug}`}>Detayları Gör →</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <Card className="bg-primary text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {page.title} Derslerimize Katılın
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Uzman eğitmenlerimizle birlikte {page.title.toLowerCase()}{" "}
              antrenmanlarına başlayın.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Randevu Alın</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
