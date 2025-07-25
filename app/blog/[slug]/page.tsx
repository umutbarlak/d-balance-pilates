import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// This would typically fetch from your API
const mockBlog = {
  _id: "1",
  title: "Pilates İle Günlük Yaşam Kalitenizi Artırın",
  slug: "pilates-ile-gunluk-yasam-kalitenizi-artirin",
  excerpt:
    "Pilates egzersizlerinin günlük yaşamınıza nasıl pozitif etkiler yaptığını keşfedin.",
  content: `
    <p>Pilates, 20. yüzyılın başlarında Joseph Pilates tarafından geliştirilen bir egzersiz sistemidir. Başlangıçta "Contrology" olarak adlandırılan bu sistem, zihin ve beden arasındaki bağlantıyı güçlendirmeyi amaçlar.</p>

    <h2>Pilatesin Temel Prensipleri</h2>
    <p>Pilates altı temel prensip üzerine kurulmuştur:</p>
    <ul>
      <li><strong>Konsantrasyon:</strong> Her hareketi tam dikkat ile yapmak</li>
      <li><strong>Kontrol:</strong> Hareketlerin kontrollü olması</li>
      <li><strong>Merkezleme:</strong> Vücudun merkezinden güç almak</li>
      <li><strong>Akışkanlık:</strong> Hareketlerin akıcı olması</li>
      <li><strong>Nefes:</strong> Doğru nefes teknikleri</li>
      <li><strong>Hassasiyet:</strong> Kaliteli ve hassas hareketler</li>
    </ul>

    <h2>Günlük Yaşama Faydaları</h2>
    <p>Düzenli pilates antrenmanları günlük yaşamınızda birçok olumlu değişiklik yaratır:</p>

    <h3>Fiziksel Faydalar</h3>
    <ul>
      <li>Postür iyileşmesi</li>
      <li>Kas gücü artışı</li>
      <li>Esneklik gelişimi</li>
      <li>Denge ve koordinasyon</li>
      <li>Sırt ağrısı azalması</li>
    </ul>

    <h3>Zihinsel Faydalar</h3>
    <ul>
      <li>Stres azalması</li>
      <li>Odaklanma becerisi</li>
      <li>Zihinsel berraklık</li>
      <li>Uyku kalitesi artışı</li>
      <li>Özgüven artışı</li>
    </ul>

    <h2>Başlangıç İçin Öneriler</h2>
    <p>Pilates yolculuğunuza başlamak için:</p>
    <ol>
      <li>Uzman bir eğitmenle çalışın</li>
      <li>Düzenli antrenman yapın (haftada 2-3 kez)</li>
      <li>Temel hareketlerle başlayın</li>
      <li>Vücut dinleyin ve zorlamayın</li>
      <li>Sabırlı olun ve ilerlemeyi takip edin</li>
    </ol>

    <p>D-Balance Pilates olarak, size en uygun pilates programını oluşturmak için buradayız. Uzman eğitmenlerimiz ile tanışın ve pilates yolculuğunuza başlayın.</p>
  `,
  image:
    "https://images.pexels.com/photos/3823042/pexels-photo-3823042.jpeg?auto=compress&cs=tinysrgb&w=1200",
  metaTitle: "Pilates İle Günlük Yaşam Kalitenizi Artırın | D-Balance Pilates",
  metaDescription:
    "Pilates egzersizlerinin günlük yaşamınıza pozitif etkilerini keşfedin. Fiziksel ve zihinsel sağlığınızı pilates ile geliştirin.",
  createdAt: "2024-01-15T10:00:00Z",
  readTime: 5,
  author: "D-Balance Pilates Ekibi",
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // In a real app, you would fetch the blog post here
  console.log(params);
  const blog = mockBlog;

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

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // In a real app, you would fetch the blog post based on the slug

  const blog = mockBlog;

  if (!blog) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>bu detay sayfası</div>
    // <div className="min-h-screen bg-gray-50 py-12">
    //   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    //     {/* Back Button */}
    //     <div className="mb-8">
    //       <Button asChild variant="ghost">
    //         <Link href="/blog" className="flex items-center">
    //           <ArrowLeft className="h-4 w-4 mr-2" />
    //           Bloglara Dön
    //         </Link>
    //       </Button>
    //     </div>

    //     {/* Article Header */}
    //     <div className="mb-8">
    //       <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
    //         {blog.title}
    //       </h1>

    //       <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
    //         <div className="flex items-center">
    //           <Calendar className="h-5 w-5 mr-2" />
    //           {formatDate(blog.createdAt)}
    //         </div>
    //         <div className="flex items-center">
    //           <Clock className="h-5 w-5 mr-2" />
    //           {blog.readTime} dk okuma
    //         </div>
    //         <div className="flex items-center">
    //           <User className="h-5 w-5 mr-2" />
    //           {blog.author}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Featured Image */}
    //     <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
    //       <Image
    //         src={blog.image}
    //         alt={blog.title}
    //         fill
    //         className="object-cover"
    //         priority
    //       />
    //     </div>

    //     {/* Article Content */}
    //     <Card className="border-0 shadow-lg">
    //       <CardContent className="p-8 md:p-12">
    //         <div
    //           className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-ol:text-gray-700 prose-strong:text-gray-900"
    //           dangerouslySetInnerHTML={{ __html: blog.content }}
    //         />
    //       </CardContent>
    //     </Card>

    //     {/* Call to Action */}
    //     <div className="mt-12 text-center">
    //       <Card className="bg-primary text-white border-0">
    //         <CardContent className="p-8">
    //           <h3 className="text-2xl font-bold mb-4">
    //             Pilates Yolculuğunuza Başlayın
    //           </h3>
    //           <p className="text-lg mb-6 opacity-90">
    //             Uzman eğitmenlerimizle birlikte vücudunuzu güçlendirin ve yaşam
    //             kalitenizi artırın.
    //           </p>
    //           <Button asChild size="lg" variant="secondary">
    //             <Link href="/iletisim">Randevu Alın</Link>
    //           </Button>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
  );
}
