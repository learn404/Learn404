// components/buttons/auth/loginButton.js
"use client";

import { Button } from "@/components/ui/button";
import { Github, LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

export const LoginGithubButton = () => {
  return (
    <Button variant="secondary" onClick={() => signIn("github")}>
      <Github size={20} />
      avec Github
    </Button>
  );
};

export const LoginGoogleButton = () => {
  return (
    <Button variant="secondary" onClick={() => signIn("google")}>
      <img src="/img/google.svg" alt="google icon" />
      avec Google
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
