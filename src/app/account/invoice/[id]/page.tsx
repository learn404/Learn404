import { InvoiceTemplate } from "@/components/layout/invoiceTemplate";
import { currentUser } from "@/lib/current-user";
import { getBillInformation, getCouponInformation } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Invoice({ params }: { params: { id: string } }) {
  const { user, error } = await currentUser();

  if (error) {
    console.error(error);
  }

  if (!user) {
    redirect("/join");
  }
  const Bill = await getBillInformation(params.id);
  const Coupon = await getCouponInformation(params.id);

  const basePrise = 19.99;
  let finalPrice = basePrise;
  if (Coupon?.code) {
   finalPrice = Math.round((basePrise - (basePrise * (Coupon?.discount! / 100))) * 100) / 100;
  }

  if (!Bill) {
    redirect("/account/invoice");
  }

  const invoiceNumberBill = `LN404-${params.id.slice(0, 10).toUpperCase()}`;

  return (
    <div>
      <div className="absolute top-5 right-5 h-fit w-96 rounded-md bg-indigo-800 text-white no-print">
        <div className="flex flex-col items-start justify-center gap-y-2 p-4 ">
          <h4 className="text-2xl font-bold">Imprimer</h4>
          <p>
            {" "}
            Cette page est destinée à être imprimée. Appuyez sur{" "}
            <span className="font-mono p-1 bg-gray-400 rounded-md mx-2">
              ⌘ + P
            </span>{" "}
            ou{" "}
            <span className="font-mono p-1 bg-gray-400 rounded-md mx-2">
              Ctrl + P
            </span>{" "}
            pour imprimer.
          </p>
          <p>
            Choisis le bouton Enregistrer sous PDF pour enregistrer un fichier
            .pdf.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <InvoiceTemplate
          id={user?.id!}
          invoiceNumber={invoiceNumberBill}
          firstName={Bill.firstName}
          lastName={Bill.lastName}
          address={Bill.address}
          city={Bill.city}
          country={Bill.country}
          zip={Bill.zip}
          email={user?.email!}
          code={Coupon?.code}
          finalPrice={finalPrice}
          discount={Coupon?.discount!}
        />
      </div>
    </div>
  );
}
