import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-glow hover:scale-[1.02]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/30 hover:shadow-destructive/50",
        outline: "border-2 border-border bg-transparent hover:bg-secondary/50 hover:border-primary/50 text-foreground backdrop-blur-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/50",
        ghost: "hover:bg-secondary/50 hover:text-foreground text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-lg shadow-success/30",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-lg shadow-warning/30",
        glow: "bg-gradient-to-r from-primary via-purple-500 to-accent text-primary-foreground hover:opacity-90 shadow-glow hover:shadow-[0_0_80px_hsl(270_100%_65%/0.4)] animate-gradient-x bg-[length:200%_auto]",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 hover:shadow-glow-accent",
        glass: "bg-card/40 backdrop-blur-xl border-2 border-primary/20 text-foreground hover:bg-card/60 hover:border-primary/40 hover:shadow-glow-soft",
        premium: "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow hover:shadow-[0_0_80px_hsl(270_100%_65%/0.5)] hover:scale-[1.02]",
        neon: "bg-transparent border-2 border-accent text-accent hover:bg-accent/10 hover:shadow-glow-accent",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-13 w-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
