import HeroSlider from '@/components/ui/hero-slider';
import ServiceCards from '@/components/ui/service-cards';
import BlogSection from '@/components/ui/blog-section';

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <ServiceCards />
      <BlogSection />
    </main>
  );
}