import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/current-user";
import { ReceiptText } from "lucide-react";
import { redirect } from "next/navigation";
import AccountLayout from "../account-layout";
import Link from "next/link";

export default async function Invoice() {
  const { user, error } = await currentUser();
  const iduser = user?.id;

  if (error) {
    console.error(error);
  }

  if (!user) {
    redirect("/join");
  }

  return (
    <AccountLayout title="Facture" user={user!}>
      <div>
        <h2 className="text-xl font-semibold text-gray-50">
          Facture de payement
        </h2>
        <div className="text-gray-300 mt-5">
          <p>Ta facture est disponible ci-dessous en français.</p>
        </div>
        <Button className="mt-5">
          <Link href={`/account/invoice/${user.id}`} className="flex items-center gap-2">
            <ReceiptText className="w-5 h-5" /> Facture (FR)
          </Link>
        </Button>

        <p className="mt-5 text-gray-300">
          Remplis tes infomations de paiement dans détails
        </p>
      </div>
    </AccountLayout>
  );
}
