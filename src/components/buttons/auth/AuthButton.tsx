// components/buttons/auth/loginButton.js
"use client";

import { signIn, signOut } from "next-auth/react";
import { Github, LogOut } from "lucide-react";
import SecondaryButton from "../SecondaryButton";

export const LoginButton = () => {
  return (
    <SecondaryButton onClick={() => signIn("github")}>
      <Github size={20} />
      Connexion avec Github
    </SecondaryButton>
  );
};

export const LogoutButton = () => {
  return (
    <SecondaryButton onClick={() => signOut()}>
      <LogOut size={20} />
      <span className="hidden lg:block font-medium">Se déconnecter</span>
    </SecondaryButton>
  );
};
