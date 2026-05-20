"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Cpu, Shirt, Home, Coffee, Sparkles, BookOpen, Wrench, PawPrint, HeartPulse, Dumbbell } from "lucide-react";
import { slugify } from "@/lib/utils";

const categories = [
  { name: "Tecnología", icon: Cpu, color: "bg-sky-100 text-sky-700" },
  { name: "Ropa", icon: Shirt, color: "bg-violet-100 text-violet-700" },
  { name: "Hogar", icon: Home, color: "bg-cyan-100 text-cyan-700" },
  { name: "Comida", icon: Coffee, color: "bg-orange-100 text-orange-700" },
  { name: "Belleza", icon: Sparkles, color: "bg-pink-100 text-pink-700" },
  { name: "Papelería", icon: BookOpen, color: "bg-indigo-100 text-indigo-700" },
  { name: "Ferretería", icon: Wrench, color: "bg-stone-100 text-stone-700" },
  { name: "Mascotas", icon: PawPrint, color: "bg-amber-100 text-amber-700" },
  { name: "Salud", icon: HeartPulse, color: "bg-emerald-100 text-emerald-700" },
  { name: "Deportes", icon: Dumbbell, color: "bg-lime-100 text-lime-700" },
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04 }}
        >
          <Link
            href={`/categorias/${slugify(cat.name)}`}
            className="flex flex-col items-center gap-2 rounded-3xl border border-slate-200 bg-white p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${cat.color}`}>
              <cat.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-slate-700">{cat.name}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
