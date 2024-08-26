import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Image from "next/image";
import FormWishlist from "./Form";
  
  export default async function Wishlist() {
    
    return (
      <div>
        <Header />
        <div className="relative">
          <img
            className="absolute left-0 top-[5rem] select-none w-96 h-auto"
            src="/img/LightsLeft 2.webp"
            alt="background"
          />
          <img
            className="absolute right-0 top-[5rem] select-none w-96 h-auto"
            src="/img/LightsRight 2.webp"
            alt="background"
          />
        </div>
        <main className="flex flex-col-reverse justify-center items-start lg:flex-row lg:items-center px-12 lg:px-20 py-16 relative z-50">
          <div className="my-10 mx-5 lg:my-0 lg:mx-0 lg:px-10">
            <Image
              src="/img/hero.png"
              alt="card"
              width={750}
              height={750}
              className="-ml-6 min-w-80 lg:ml-0 rounded-lg lg:rounded-xl lg:max-w"
            />
          </div>
  
          <div className="flex flex-col items-start w-full md:max-w-md">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
              Rejoins la{" "} <span className="text-torea-300">wishlist</span>.
            </h2>
            <p className="text-gray-400 mt-3">
              Sois informé lors de l'ouverture de la plateforme et de ses nouveautés ! 
            </p>
            <FormWishlist />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  