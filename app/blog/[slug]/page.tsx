import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dbConnect from "@/lib/mongodb";
import { getBlogBySlug } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // In a real app, you would fetch the blog post here
  await dbConnect();
  const blogResult = await getBlogBySlug(params.slug);
  const blog = Array.isArray(blogResult) ? blogResult[0] : blogResult;

  if (!blog) {
    return {
      title: "Blog Yazısı Bulunamadı | D-Balance Pilates",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
      type: "article",
    },
  };
}

type Blog = {
  title: string;
  createdAt: string;
  readTime?: number;
  author: string;
  image: string;
  content: string;
};

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  await dbConnect();
  const blogResult = await getBlogBySlug(params.slug);
  const blog: Blog | null =
    Array.isArray(blogResult) && blogResult.length > 0
      ? (blogResult[0] as unknown as Blog)
      : (blogResult as unknown as Blog);

  if (!blog) {
    notFound();
  }

  function stripHtml(html: any) {
    if (typeof window === "undefined") {
      // Server side: basit regex kullanabilirsiniz
      return html.replace(/<[^>]*>?/gm, "");
    } else {
      // Client side: DOM parser kullanabilirsiniz
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent || div.innerText || "";
    }
  }

  function calculateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length; // Kelime sayısı
    const minutes = words / wordsPerMinute;
    const readTime = Math.ceil(minutes); // Yukarı yuvarla
    return readTime; // dakika cinsinden okuma süresi
  }
  const text = stripHtml(blog.content);
  const readingTime = calculateReadingTime(text);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Bloglara Dön
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {formatDate(blog.createdAt)}
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {readingTime} dk okuma
            </div>
            {/* <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              {blog.author}
            </div> */}
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-ol:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-primary text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Pilates Yolculuğunuza Başlayın
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Uzman eğitmenlerimizle birlikte vücudunuzu güçlendirin ve yaşam
                kalitenizi artırın.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/iletisim">Randevu Alın</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
