import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

  const staticPages = [
    '',
    '/blog',
    '/iletisim',
    '/pilates',
    '/klinik-pilates',
    '/reformer-pilates',
    '/mat-pilates',
    '/hakkimizda',
    '/ekibimiz',
    '/postur-degerlendirme',
  ];

  const dynamicPages = [
    '/reformer-pilates-piriformis',
    '/reformer-pilates-yildiz-kirkkonaklar',
    '/erkekler-icin-reformer-pilates-ankara',
    '/aletli-pilates',
    '/reformer-pilates-ankara-en-iyi-hoca',
    '/pilates-nedir',
    '/pilates-faydalari',
    '/pilates-turleri',
    '/klinik-pilates-rehabilitasyon',
    '/klinik-pilates-fizyoterapi',
    '/saglik-pilates',
    '/evde-mat-pilates',
    '/baslangic-mat-pilates',
    '/ileri-mat-pilates',
  ];

  const blogPages = [
    '/blog/pilates-ile-gunluk-yasam-kalitenizi-artirin',
    '/blog/reformer-pilates-baslangic-rehberi',
    '/blog/klinik-pilates-ve-rehabilitasyon',
    '/blog/evde-mat-pilates-10-etkili-hareket',
    '/blog/pilates-ve-zihinsel-saglik',
    '/blog/hamilelikte-pilates-guvenli-egzersizler',
  ];

  const allPages = [...staticPages, ...dynamicPages, ...blogPages];

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : page.startsWith('/blog/') ? 0.7 : 0.8,
  }));
}