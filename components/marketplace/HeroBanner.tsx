"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Store, ShoppingBag, MapPin } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Descubre los mejores comercios del Tolima",
    subtitle: "Más de 100 negocios locales esperan por ti",
    cta: "Explorar tiendas",
    href: "/buscar",
    bg: "from-[#2D6A4F] to-[#40916C]",
    ctaBg: "bg-white text-primary hover:bg-accent hover:text-white",
    icon: <Store className="w-28 h-28 text-white/20" />,
  },
  {
    id: 2,
    title: "Apoya la economía local del Tolima",
    subtitle: "Compra en tiendas de barrio, panaderías, fruterías y más",
    cta: "Ver productos",
    href: "/buscar",
    bg: "from-[#1B4332] to-[#2D6A4F]",
    ctaBg: "bg-accent text-primary-dark hover:bg-white hover:text-primary",
    icon: <ShoppingBag className="w-28 h-28 text-white/20" />,
  },
  {
    id: 3,
    title: "¿Tienes un negocio en el Tolima?",
    subtitle: "Regístralo gratis y llega a más clientes en tu ciudad",
    cta: "Vender aquí",
    href: "/registro/vendedor",
    bg: "from-[#52B788] to-[#74C69D]",
    ctaBg: "bg-primary text-white hover:bg-[#1B4332]",
    icon: <MapPin className="w-28 h-28 text-white/20" />,
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative overflow-hidden rounded-2xl h-52 md:h-64">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bg} flex items-center px-8 md:px-12`}
        >
          <div className="flex-1 z-10">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-bold text-white mb-2 max-w-lg leading-tight"
            >
              {slide.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 mb-5 text-sm md:text-base max-w-md"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Link
                href={slide.href}
                className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg ${slide.ctaBg}`}
              >
                {slide.cta}
              </Link>
            </motion.div>
          </div>
          <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2">
            {slide.icon}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controles */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-all z-20"
      >
        <ChevronLeft className="w-4 h-4 text-gray-700" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-all z-20"
      >
        <ChevronRight className="w-4 h-4 text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/50 w-1.5"}`}
          />
        ))}
      </div>
    </div>
  );
}
