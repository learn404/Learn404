import FonctionnalitySection from "@/components/layout/fonctionnality";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import HeroSection from "@/components/layout/hero";
import PricesSection from "@/components/layout/prices";
import Avis from "@/components/layout/avis";
import Skills from "@/components/layout/skills";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <FonctionnalitySection />
        <PricesSection />
        <Avis />
        {/* <Skills /> */}
      </main>
      <Footer />
    </div>
  );
}
