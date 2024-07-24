import { Check } from "lucide-react";
import Image from "next/image";

const ProductCard = () => {
  return ( 
    <div className="relative flex items-center justify-center bg-gray-900/40 h-[700px] min-w-72 max-w-[450px] w-full rounded-2xl overflow-clip border border-gray-800">
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-center justify-center gap-6 bg-gray-950 px-8 py-4 z-10 border border-gray-800 rounded-2xl">
          <Image src="/img/logo.png" width={48} height={48} sizes="100vw" alt="Subscription" />
          <div>
            <h3 className="text-gray-300 text-sm md:text-base">Formation Learn404</h3>
            <p className="text-gray-50 font-bold md:text-lg lg:text-xl">20€ à vie</p>
          </div>
        </div>
        <ul className="flex flex-col space-y-4 text-sm md:text-base">
          <li className="flex items-center gap-2">
            <Check color="hsl(var(--chart-2))" />
            <span>Cours vidéos et écrits</span>
          </li>
          <li className="flex items-center gap-2">
            <Check color="hsl(var(--chart-2))" />
            <span>Maquettes Figma et exercices</span>
          </li>
          <li className="flex items-center gap-2">
            <Check color="hsl(var(--chart-2))" />
            <span>Discord member only</span>
          </li>
          <li className="flex items-center gap-2">
            <Check color="hsl(var(--chart-2))" />
            <span>Suivi de progression</span>
          </li>
          <li className="flex items-center gap-2">
            <Check color="hsl(var(--chart-2))" />
            <span>Supporter le projet</span>
          </li>
        </ul>
      </div>

      <div className="absolute top-0 left-0 w-full h-60 bg-blue-900 rounded-lg overflow-clip">
        <Image src="/img/hero.png" fill={true} sizes="20vw" className="object-cover" alt="Subscription" />
      </div>
    </div>
   );
}
 
export default ProductCard;