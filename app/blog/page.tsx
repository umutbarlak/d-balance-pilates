import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/mongodb";
import { getAllBlogs } from "@/lib/blog";
import { Blog } from "@/components/ui/blog-section";

export const metadata = {
  title: "Blog | D-Balance Pilates Studio",
  description:
    "Pilates dünyasından son haberler, ipuçları ve uzman görüşleri. Sağlıklı yaşam için blog yazılarımızı okuyun.",
};

function BlogGrid({ blogs }: { blogs: Blog[] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <Card
          key={blog._id}
          className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
        >
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
              {blog.title}
            </CardTitle>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(blog.createdAt)}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <CardDescription className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
              {blog.excerpt}
            </CardDescription>

            <Button
              asChild
              variant="ghost"
              className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-colors"
            >
              <Link href={`/blog/${blog.slug}`}>
                Devamını Oku
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function BlogPage() {
  await dbConnect();
  const blogs: Blog[] = await getAllBlogs();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilates dünyasından son haberler, uzman ipuçları ve sağlıklı yaşam
            rehberleri
          </p>
        </div>

        <Suspense fallback={<div>Yükleniyor...</div>}>
          <BlogGrid blogs={blogs} />
        </Suspense>
      </div>
    </div>
  );
}
