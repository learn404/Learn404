import { TextareaForm } from "@/components/account/textarea-form";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import AccountLayout from "../account-layout";

export default async function Feedback() {
  const { user, error } = await currentUser();

  if (error) {
    console.error(error);
  }

  if (!user) {
    redirect("/join");
  }

  if (!user?.isMember) {
    redirect("/account/settings");
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

