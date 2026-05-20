import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} />;
}

export function StoreCardSkeleton() {
  return (
    <div className="card p-4 space-y-3">
      <Skeleton className="w-full h-40 rounded-lg" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card p-3 space-y-3">
      <Skeleton className="w-full h-48 rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}
