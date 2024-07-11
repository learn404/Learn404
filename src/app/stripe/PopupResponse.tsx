import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, CircleX } from "lucide-react";

interface PopupResponseProps {
  type?: string;
  success?: string;
  error?: string;
}

export default function PopupResponse(response: PopupResponseProps) {
  

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-center bg-gray-950 border-[1px] border-gray-700 flex flex-col justify-center items-center z-50 py-16 px-20 rounded-xl animate-popup">      {response.success ? (
        <Check width={100} height={100} color="#22c55e"/>
      ) : (
        <CircleX width={100} height={100} color="#ef4444"/>
      )}
      
      <div className="text-center max-w-96 mt-5 flex flex-col justify-center items-center gap-5">
        <h3 className="text-4xl font-semibold">{response.type}</h3>
        <p>{response.success || response.error}</p>
        {response.success ? (
          <Link href="/dashboard">
            <Button>Go to dashboard</Button>
          </Link>
        ) : (
          <Button onClick={() => window.location.reload()}>Reload</Button>
        )}
      </div>
    </div>
  )
}