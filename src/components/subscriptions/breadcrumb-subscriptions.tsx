import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface BreadcrumbSubscriptionsProps {
  isPayment: boolean;
  handleStep: (step: "back" | "next") => void;
}

export function BreadcrumbSubscriptions({ isPayment, handleStep} : BreadcrumbSubscriptionsProps) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {isPayment 
            ? <BreadcrumbLink className="cursor-pointer" onClick={() => handleStep("back")}>Code Promo</BreadcrumbLink>
            : <BreadcrumbPage>Code Promo</BreadcrumbPage> 
          }
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {isPayment 
            ? <BreadcrumbPage>Paiement</BreadcrumbPage>
            : <BreadcrumbLink className="cursor-pointer" onClick={() => handleStep("next")}>Paiement</BreadcrumbLink>
          }
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
