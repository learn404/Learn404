// components/buttons/auth/loginButton.js
"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return <button onClick={() => signIn("github")}>Login with GitHub</button>;
};

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>Logout</button>;
};
