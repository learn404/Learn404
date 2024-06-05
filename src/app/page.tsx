import FonctionnalitySection from "@/components/layout/fonctionnality";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import HeroSection from "@/components/layout/hero";
import PricesSection from "@/components/layout/prices";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <FonctionnalitySection />
        <PricesSection />
      </main>
      <Footer />
    </div>
  );
}
