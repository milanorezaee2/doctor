import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Process from '@/components/Process';
import About from '@/components/About';
import Services from '@/components/Services';
import Conditions from '@/components/Conditions';
import Results from '@/components/Results';
import Videos from '@/components/Videos';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import AnimatedBackground from '@/components/AnimatedBackground';
import Seo from '@/components/Seo';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-sand-50">
      <Seo />
      {/* پرش به محتوا — برای کاربرهای صفحه‌کلید و تکنولوژی کمکی */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[80] focus:rounded-lg focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        پرش به محتوای اصلی
      </a>

      {/* نوار پیشرفت اسکرول — خالص CSS، بدون re-render در React */}
      <div className="scroll-progress" aria-hidden="true" />

      <AnimatedBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Process />
        <About />
        <Services />
        <Conditions />
        <Results />
        <Videos />
        <Stats />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <MobileActionBar />
    </div>
  );
}
