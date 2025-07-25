'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Image, Settings, BarChart } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    pages: 0,
    blogs: 0,
    slides: 0,
    users: 0,
  });

  useEffect(() => {
    // In a real app, you would verify authentication here
    // and fetch dashboard statistics
  }, []);

  const dashboardCards = [
    {
      title: 'Toplam Sayfalar',
      value: stats.pages,
      icon: FileText,
      description: 'Yayınlanmış sayfa sayısı',
      href: '/admin/pages',
    },
    {
      title: 'Blog Yazıları',
      value: stats.blogs,
      icon: FileText,
      description: 'Yayınlanmış blog sayısı',
      href: '/admin/blogs',
    },
    {
      title: 'Hero Slaytları',
      value: stats.slides,
      icon: Image,
      description: 'Aktif slayt sayısı',
      href: '/admin/hero-slides',
    },
    {
      title: 'Kullanıcılar',
      value: stats.users,
      icon: Users,
      description: 'Toplam kullanıcı sayısı',
      href: '/admin/users',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Yönetim Paneli</h1>
          <p className="text-gray-600">D-Balance Pilates Studio içerik yönetimi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card key={card.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4"
                  >
                    <a href={card.href}>Yönet</a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
              <CardDescription>Sık kullanılan yönetim işlemleri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <a href="/admin/pages/new">
                  <FileText className="h-4 w-4 mr-2" />
                  Yeni Sayfa Oluştur
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <a href="/admin/blogs/new">
                  <FileText className="h-4 w-4 mr-2" />
                  Yeni Blog Yazısı
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <a href="/admin/hero-slides/new">
                  <Image className="h-4 w-4 mr-2" />
                  Yeni Hero Slaytı
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <a href="/admin/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Site Ayarları
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
              <CardDescription>Site üzerindeki son değişiklikler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Yeni blog yazısı yayınlandı</p>
                    <p className="text-xs text-gray-500">2 saat önce</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Hero slaytı güncellendi</p>
                    <p className="text-xs text-gray-500">5 saat önce</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Yeni sayfa oluşturuldu</p>
                    <p className="text-xs text-gray-500">1 gün önce</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}