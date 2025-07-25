// 'use client';

// import { useState, useEffect } from 'react';
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
import { getRecentBlogs } from "@/lib/blog";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  createdAt: string;
  __v?: number;
}

const defaultBlogs = [
  {
    _id: "1",
    title: "Pilates İle Günlük Yaşam Kalitenizi Artırın",
    slug: "pilates-ile-gunluk-yasam-kalitenizi-artirin",
    excerpt:
      "Pilates egzersizlerinin günlük yaşamınıza nasıl pozitif etkiler yaptığını keşfedin.",
    image:
      "https://images.pexels.com/photos/3823042/pexels-photo-3823042.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Reformer Pilates: Başlangıç Rehberi",
    slug: "reformer-pilates-baslangic-rehberi",
    excerpt:
      "Reformer pilates hakkında bilmeniz gereken her şey ve başlangıç için ipuçları.",
    image:
      "https://images.pexels.com/photos/3823048/pexels-photo-3823048.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "Klinik Pilates ve Rehabilitasyon",
    slug: "klinik-pilates-ve-rehabilitasyon",
    excerpt:
      "Yaralanma sonrası iyileşme sürecinde klinik pilatesin rolü ve faydaları.",
    image:
      "https://images.pexels.com/photos/3823101/pexels-photo-3823101.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: new Date().toISOString(),
  },
];

export default async function BlogSection() {
  // const [blogs, setBlogs] = useState<Blog[]>(defaultBlogs);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await fetch('/api/blogs?limit=3');
  //       const data = await response.json();
  //       if (data && data.length > 0) {
  //         setBlogs(data);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch blogs:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlogs();
  // }, []);

  await dbConnect();
  const rawBlogs = await getRecentBlogs();
  const blogs: Blog[] = rawBlogs.map((b: any) => ({
    _id: b._id,
    createdAt: b.createdAt,
    __v: b.__v,
    title: b.title ?? "",
    slug: b.slug ?? "",
    excerpt: b.excerpt ?? "",
    image: b.image ?? "",
  }));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Son Bloglar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilates dünyasından haberler, ipuçları ve uzman görüşleri
          </p>
        </div>

        {/* {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : ( */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        {/* )} */}

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/blog">Tüm Blogları Gör</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
