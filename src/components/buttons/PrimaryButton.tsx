import React from "react";

interface Props {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  redirectTo?: string; // Ajout de la prop redirectTo
  onClick?: () => void;
}

export default function PrimaryButton({
  children,
  type = "submit",
  redirectTo,
  onClick,
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
      className="flex-none rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      {children}
    </button>
  );
}