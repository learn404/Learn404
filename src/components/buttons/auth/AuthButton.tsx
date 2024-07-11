// components/buttons/auth/loginButton.js
"use client";

import { Github, LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const LoginGithubButton = () => {
  return (
    <Button variant="secondary" onClick={() => signIn("github")}>
      <Github size={20} />
      with Github
    </Button>
  );
};

export const LoginGoogleButton = () => {
  return (
    <Button variant="secondary" onClick={() => signIn("google")}>
      <img src="/img/google.svg" alt="google icon" />
      with Google
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button variant="secondary" onClick={() => signOut()}>
      <LogOut size={20} />
      <span className="hidden lg:block font-medium">Se déconnecter</span>
    </Button>
  );
};
