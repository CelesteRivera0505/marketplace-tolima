"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DEMO_PRODUCTS, DEMO_STORES, formatPrice, generateWhatsAppMessage } from "@/lib/utils";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { MapPin, Star, Clock, Phone, MessageCircle, ArrowLeft, Package } from "lucide-react";

export default function StorePage() {
  const params = useParams();
  const storeId = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "");

  const store = useMemo(() => DEMO_STORES.find((item) => item.id === storeId), [storeId]);
  const products = useMemo(() => DEMO_PRODUCTS.filter((p) => p.storeId === storeId), [storeId]);

  if (!store) {
    return (
      <div className="bg-background min-h-screen py-20 px-4">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900">Tienda no encontrada</h2>
          <p className="mt-3 text-sm text-gray-500">Revisa el enlace o vuelve al inicio.</p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const whatsappUrl = generateWhatsAppMessage(store.nombre, store.telefono ?? "", [], 0).split("?")[0] + "?text=" + encodeURIComponent(`Hola! Vi tu tienda ${store.nombre} en Marketplace Tolima y quiero más información.`);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* BANNER */}
      <div className="relative h-56 md:h-72 w-full overflow-hidden bg-gradient-to-br from-primary/80 to-secondary/80">
        {store.banner && (
          <Image src={store.banner} alt={store.nombre} fill className="object-cover opacity-60" sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full hover:bg-white/30 transition">
            <ArrowLeft className="w-4 h-4" /> Inicio
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER TIENDA */}
        <div className="relative -mt-16 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">

              {/* Logo */}
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0 bg-gray-100">
                <Image
                  src={store.logo || "/images/placeholder-store.jpg"}
                  alt={store.nombre}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Info principal */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">{store.categoria}</span>
                  <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">● Abierto</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{store.nombre}</h1>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{store.descripcion}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary flex-shrink-0" />{store.direccion}, {store.ciudad}</span>
                  {store.horario && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary flex-shrink-0" />{store.horario}</span>}
                  <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-primary flex-shrink-0" />{store.telefono}</span>
                </div>
              </div>

              {/* Rating + botones */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                {(store.calificacion ?? 0) > 0 && (
                  <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-xl">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">{(store.calificacion ?? 0).toFixed(1)}</span>
                    <span className="text-xs text-gray-400">({store.totalReviews})</span>
                  </div>
                )}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CATÁLOGO */}
        <section id="productos" className="pb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Catálogo de productos</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <Package className="w-4 h-4" /> {products.length} productos disponibles
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-400">
              No hay productos activos en este momento.
            </div>
          ) : (
            <motion.div
              className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } }, hidden: {} }}
            >
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
