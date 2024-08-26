"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import PrimaryButton from "./PrimaryButton";

const JoinButton = () => {

  const pathname = usePathname();
  
  if (pathname === "/wishlist") {
    return null;
  }

  return (  
    <PrimaryButton redirectTo="/join" type="button">
      <Image src="/img/Logo_icon_blanc.svg" alt="logo icon" width={20} height={20} sizes="10vw" />
      <span className="md:block font-medium">Rejoindre Learn404</span>
    </PrimaryButton>
  );
}
 
export default JoinButton;