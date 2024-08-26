"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  redirectTo?: string; // Ajout de la prop redirectTo
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function PrimaryButton({
  children,
  type = "submit",
  redirectTo,
  onClick,
  className,
  disabled = false,
}: Props) {
  const handleClick = () => {
    if (redirectTo) {
      window.location.href = redirectTo;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={handleClick}
      className={cn(`
        z-50 flex items-center justify-center gap-3 rounded-md bg-indigo-800 
        px-3.5 py-2.5 text-xs md:text-sm font-semibold text-white 
        shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-indigo-500 min-w-fit
        whitespace-nowrap`,
        className
      )}
    >
      {children}
    </button>
  );
}
