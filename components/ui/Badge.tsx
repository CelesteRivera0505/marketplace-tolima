import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline" | "green";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-green-100 text-green-800",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger:  "bg-red-100 text-red-700",
    info:    "bg-teal-100 text-teal-700",
    outline: "border border-green-300 text-green-700",
    green:   "bg-primary text-white",
  };
  return (
    <span className={cn("badge", variants[variant], className)}>
      {children}
    </span>
  );
}
