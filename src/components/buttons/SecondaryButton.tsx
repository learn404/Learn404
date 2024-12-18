"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  redirectTo?: string;
  onClick?: () => void;
  className?: string;
}

export default function SecondaryButton({
  children,
  type = "submit",
  redirectTo,
  onClick,
  className,
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
      type={type}
      onClick={handleClick}
      className={cn(`
        z-50 flex items-center gap-4 border border-white/10 rounded-md px-3.5 py-2.5 text-xs
        md:text-sm font-semibold text-white shadow-sm hover:bg-white/10 focus-visible:outline
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
        whitespace-nowrap`,
        className
      )}
    >
      {children}
    </button>
  );
}
