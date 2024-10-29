import Header from "@/components/common/Header";
import HeroSection from "@/components/common/HeroSection";
import ServicesSection from "@/components/common/ServicesSection";
import PortfolioSection from "@/components/common/PortfolioSection";
import ContactSection from "@/components/common/ContactSection";
import Footer from "@/components/common/Footer";
import LocationSection from "@/components/common/LocationSection";
import { MarqueeDemo } from "@/components/common/MarqueeDemo";

export default function HomePage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--paragraph)] transition-colors duration-300">
      <Header />

      <HeroSection />

      <MarqueeDemo />

      <main className="container">
        <ServicesSection />
        <PortfolioSection fadeIn={fadeIn} />

        <LocationSection />

        <ContactSection fadeIn={fadeIn} />
      </main>
      <Footer />
    </div>
  );
}
