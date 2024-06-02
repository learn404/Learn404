import { Check } from 'lucide-react'
import PrimaryButton from '../buttons/PrimaryButton'

export default function PricesSection() {

  return (
    <div className="w-full flex items-center justify-center py-[6.25rem] text-torea-50">
      <div className="mx-auto p-14 rounded-3xl shadow-pricing-shadow">
        <div className="max-w-md flex flex-col gap-6">
          <h2 className=" text-5xl font-bold ">Deviens développeur web</h2>
          <div className="flex flex-col gap-6">
            <p>Unlock the power of data with our cutting-edge analytics product. Get instant insights with our </p>
            <div>
              <span className="text-5xl font-semibold mr-2">5€</span>
              <span className="text-torea-100/75">paiement unique</span>
            </div>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="327"
            height="3"
            viewBox="0 0 327 3"
            fill="none"
            className="my-4"
          >
            <path
              d="M1.49689 0.5C0.944611 0.5 0.496887 0.947715 0.496887 1.5C0.496887 2.05228 0.944611 2.5 1.49689 2.5V0.5ZM326.503 0.5L1.49689 0.5V2.5L326.503 2.5V0.5Z"
              fill="url(#paint0_linear_3232_81)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3232_81"
                x1="337.481"
                y1="79.1317"
                x2="345.557"
                y2="18.0362"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ECECEC" />
                <stop offset="1" stopColor="#ECECEC" stopOpacity="0" />
              </linearGradient>
            </defs>
            </svg>
            <div className="flex flex-col gap-4">
              <span className='inline-flex'>
                <Check /> Accès à l'ensemble des challenges
              </span>
              <span className='inline-flex'>
                <Check /> Accès aux maquettes Figma
              </span>
              <span className='inline-flex'>
                <Check /> Accès aux corrections
              </span>
              <span className='inline-flex'>
                <Check /> Accès au discord privé
              </span>
              <span className='inline-flex'>
                <Check /> Accès à toutes les nouveautés
              </span>
              <span className='inline-flex'>
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