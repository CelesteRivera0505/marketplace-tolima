"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, ArrowRight } from "lucide-react";
import { Store } from "@/lib/types";

interface StoreCardProps {
  store: Store;
  index?: number;
}

export function StoreCard({ store, index = 0 }: StoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
    >
      <Link href={`/tienda/${store.id}`}>
        {/* Banner */}
        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
          <Image
            src={store.banner || store.logo || "https://picsum.photos/seed/store/800/300"}
            alt={store.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 350px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* Badge categoría */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {store.categoria}
            </span>
          </div>
          {/* Rating sobre banner */}
          {store.calificacion > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-gray-800">{store.calificacion.toFixed(1)}</span>
            </div>
          )}
          {/* Logo superpuesto */}
          <div className="absolute -bottom-5 left-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white">
              <Image
                src={store.logo || "https://picsum.photos/seed/logo/100/100"}
                alt={store.nombre}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pt-7 px-4 pb-4">
          <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {store.nombre}
          </h3>

          <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{store.ciudad}</span>
          </div>

          {store.horario && (
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{store.horario}</span>
            </div>
          )}

          <p className="text-xs text-gray-500 line-clamp-2 mb-3">{store.descripcion}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{store.totalReviews} reseñas</span>
            <span className="text-primary text-xs font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
              Ver tienda <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
