import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/current-user";
import { ReceiptText } from "lucide-react";
import AccountLayout from "../account-layout";
import { redirect } from "next/navigation";

export default async function Invoice() {
    const user = await currentUser();

    if (!user?.isMember) {
        redirect("/dashboard/subscriptions");
    }

    return (
        <AccountLayout title="Facture" user={user!}>
            <div>
                <h2 className="text-xl font-semibold text-gray-50">
                    Facture de payement
                </h2>
                <div className="text-gray-300 mt-5">
                    <p>
                        Votre facture est disponible ci-dessous en français.
                    </p>
                </div>
                <Button className="mt-5">
                   <ReceiptText className="w-5 h-5" /> Facture (FR)
                </Button>
            </div>
        </AccountLayout>
    )
}
