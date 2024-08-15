
  import Footer from "@/components/layout/footer";
  import Header from "@/components/layout/header";
  import { auth } from "@/lib/auth";
  import Image from "next/image";
  import { redirect } from "next/navigation";
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
  
          <div className="flex flex-col items-start max-w-full lg:max-w-md">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            Rejoins la{" "}
              <span className="text-torea-300">wishlist</span> pour être informé de la sortie de notre{" "}
              <span className="text-torea-300">application</span> 
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5 lg:mt-8">
              <FormWishlist />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  