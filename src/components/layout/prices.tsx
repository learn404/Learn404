import { Check } from 'lucide-react'
import PrimaryButton from '../buttons/PrimaryButton'

export default function PricesSection() {

  return (
    <div className="w-full flex items-center justify-center py-[6.25rem] px-4 text-torea-50" id="prices">
      <div className="mx-auto p-10 md:p-14 rounded-3xl shadow-pricing-shadow">
        <div className="max-w-md flex flex-col gap-6">
          <h2 className=" text-3xl md:text-5xl font-bold ">Deviens développeur web</h2>
          <div className="flex flex-col gap-6">
            <p>Unlock the power of data with our cutting-edge analytics product. Get instant insights with our </p>
            <div>
              <span className="text-5xl font-semibold mr-2">5€</span>
              <span className=" text-gray-400 ">paiement unique</span>
            </div>
            <div className="w-full h-[1px] bg-red-500 lineLinear my-4"></div>
            <div className="flex flex-col gap-4">
              <span className='inline-flex gap-2'>
                <Check /> Accès à l'ensemble des challenges
              </span>
              <span className='inline-flex gap-2'>
                <Check /> Accès aux maquettes Figma
              </span>
              <span className='inline-flex gap-2'>
                <Check /> Accès aux corrections
              </span>
              <span className='inline-flex gap-2'>
                <Check /> Accès au discord privé
              </span>
              <span className='inline-flex gap-2'>
                <Check /> Accès à toutes les nouveautés
              </span>
              <span className='inline-flex gap-2'>
                <Check /> Soutenir le projet
              </span>
            </div>
            <PrimaryButton redirectTo='/waitlist'>
              Acheter la formation
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}