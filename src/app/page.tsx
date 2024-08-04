import ChaptersSection from "@/components/layout/chapters";
import CoursesInfos from "@/components/layout/course-info";
import FaqSection from "@/components/layout/faq";
import FonctionnalitySection from "@/components/layout/fonctionnality";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import HeroSection from "@/components/layout/hero";
import PresentationSection from "@/components/layout/presentation";
import PricesSection from "@/components/layout/prices";
import prisma from "@/lib/prisma";

export default async function Home() {

  const categories = await prisma.categories.findMany({
    where: {
      Lessons: {
        some: {
          draft: false,
        },
      },
    },
    select:{
      id: true,
      name: true,
      description: true,
      level: true,
      
      },
    
    orderBy: {
      sort_number: "asc",
    },
  });

  const lessons = await prisma.lessons.findMany({
    where: {
      draft: false,
    },
    select:{
      id: true,
      title: true,
      slug: true,
      categoryId: true,
    },
    orderBy: {
      sort_number: "asc",
    }
  });



  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <PresentationSection />
        <FonctionnalitySection />
        <CoursesInfos />
        <ChaptersSection categories={categories} lessons={lessons} />
        <PricesSection />
        {/* <Avis /> */}
        <FaqSection />
        {/* <Skills /> */}
      </main>
      <Footer />
    </div>
  );
}
