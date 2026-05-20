"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Cpu, Shirt, Home, UtensilsCrossed, Sparkles, PawPrint,
  BookOpen, Heart, Palette, MoreHorizontal, Store
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Todos",        icon: Store,           slug: "" },
  { name: "Tecnología",   icon: Cpu,             slug: "Tecnología" },
  { name: "Ropa",         icon: Shirt,           slug: "Ropa" },
  { name: "Hogar",        icon: Home,            slug: "Hogar" },
  { name: "Comida",       icon: UtensilsCrossed, slug: "Comida" },
  { name: "Belleza",      icon: Sparkles,        slug: "Belleza" },
  { name: "Mascotas",     icon: PawPrint,        slug: "Mascotas" },
  { name: "Papelería",    icon: BookOpen,        slug: "Papelería" },
  { name: "Salud",        icon: Heart,           slug: "Salud" },
  { name: "Artesanías",   icon: Palette,         slug: "Artesanías" },
  { name: "Otros",        icon: MoreHorizontal,  slug: "Otro" },
];

export function CategorySidebar() {
  const searchParams = useSearchParams();
  const current = searchParams.get("categoria") ?? "";

  return (
    <aside className="w-52 flex-shrink-0 hidden lg:block">
      <div className="card-flat sticky top-24 overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-4 py-3">
          <p className="text-white font-bold text-sm uppercase tracking-wide">Categorías</p>
        </div>

        {/* Lista */}
        <nav className="py-2 max-h-[calc(100vh-160px)] overflow-y-auto">
          {categories.map((cat, i) => {
            const isActive = current === cat.slug || (cat.slug === "" && current === "");
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={cat.slug ? `/buscar?categoria=${encodeURIComponent(cat.slug)}` : "/buscar"}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-150 group",
                    isActive
                      ? "bg-primary/10 text-primary border-r-2 border-primary"
                      : "text-gray-600 hover:bg-green-50 hover:text-primary"
                  )}
                >
                  <cat.icon
                    className={cn(
                      "w-4 h-4 flex-shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"
                    )}
                  />
                  <span className="truncate">{cat.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
