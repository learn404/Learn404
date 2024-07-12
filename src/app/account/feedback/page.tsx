import { currentUser } from "@/lib/current-user";
import AccountLayout from "../account-layout";

export default async function Feedback() {
  const user = await currentUser();
  
  return (
    <AccountLayout title="Feedback" user={user}>
      <div>
        <h2 className="text-xl font-semibold text-gray-50">
          Feedback
        </h2>
      </div>
    </AccountLayout>
  )
}
