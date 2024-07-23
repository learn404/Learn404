import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "flex items-center w-fit justify-center gap-2 rounded-md  px-3.5 py-2.5 text-xs md:text-sm shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  transition-all duration-300 ease-in-out cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-indigo-800 text-white font-semibold hover:bg-indigo-900 focus-visible:outline-indigo-500",
        destructive:
          "bg-red-800 text-white font-semibold hover:bg-red-900 focus-visible:outline-red-500",
        outline:
          "border border-input bg-white text-black hover:bg-neutral-300 focus-visible:outline-indigo-500",
        secondary:
          "border-white/10 border font-semibold text-white hover:bg-white/10 focus-visible:outline-indigo-500",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 py-0",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export  { Button, buttonVariants }
