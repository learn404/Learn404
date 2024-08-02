import ChaptersSection from "@/components/layout/chapters";
import CoursesInfos from "@/components/layout/course-info";
import FaqSection from "@/components/layout/faq";
import FonctionnalitySection from "@/components/layout/fonctionnality";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import HeroSection from "@/components/layout/hero";
import PresentationSection from "@/components/layout/presentation";
import PricesSection from "@/components/layout/prices";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <PresentationSection />
        <FonctionnalitySection />
        <CoursesInfos />
        <ChaptersSection />
        <PricesSection />
        {/* <Avis /> */}
        <FaqSection />
        {/* <Skills /> */}
      </main>
      <Footer />
    </div>
  );
}
