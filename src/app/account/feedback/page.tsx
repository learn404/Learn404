import { TextareaForm } from "@/components/account/textarea-form";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import AccountLayout from "../account-layout";

export default async function Feedback() {
  const user = await currentUser();

  if (!user?.isMember) {
    redirect("/dashboard/subscriptions");
  }
  
  return (
    <AccountLayout title="Feedback" user={user!}>
      <div>
        <h2 className="text-xl font-semibold text-gray-50">
          Feedback
        </h2>
        <TextareaForm />
      </div>
    </AccountLayout>
  )
}

