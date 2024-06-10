// components/buttons/auth/loginButton.js
"use client";

import { Github, LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import SecondaryButton from "../SecondaryButton";

export const LoginGithubButton = () => {
  return (
    <SecondaryButton onClick={() => signIn("github")}>
      <Github size={20} />
      with Github
    </SecondaryButton>
  );
};

export const LoginGoogleButton = () => {
  return (
    <SecondaryButton onClick={() => signIn("github")}>
      <img src="/img/google.svg" alt="google icon" />
      with Google
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
