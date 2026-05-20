"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Store, Package, ArrowRight } from "lucide-react";
import { HeroBanner } from "@/components/marketplace/HeroBanner";
import { CategorySidebar } from "@/components/marketplace/CategorySidebar";
import { StoreCard } from "@/components/marketplace/StoreCard";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { StoreCardSkeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";
import { DEMO_STORES, DEMO_PRODUCTS } from "@/lib/utils";
import { Store as StoreType, Product } from "@/lib/types";

function HomeContent() {
  const [stores, setStores] = useState<StoreType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setStores(DEMO_STORES as StoreType[]);
      setProducts(DEMO_PRODUCTS as Product[]);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar categorías vertical */}
          <Suspense fallback={null}>
            <CategorySidebar />
          </Suspense>

          {/* Contenido principal */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Hero */}
            <HeroBanner />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Comercios activos", value: "120+", icon: Store, color: "text-primary bg-green-50" },
                { label: "Productos disponibles", value: "1,500+", icon: Package, color: "text-secondary bg-emerald-50" },
                { label: "Ciudades del Tolima", value: "15+", icon: TrendingUp, color: "text-[#40916C] bg-teal-50" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-4 text-center"
                >
                  <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Comercios destacados */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Comercios destacados</h2>
                <Link href="/buscar" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
                  Ver todos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading
                  ? Array(3).fill(0).map((_, i) => <StoreCardSkeleton key={i} />)
                  : stores.slice(0, 3).map((s, i) => <StoreCard key={s.id} store={s} index={i} />)
                }
              </div>
            </section>

            {/* Banner CTA */}
            <div className="bg-gradient-to-r from-primary to-[#40916C] rounded-2xl p-7 text-white flex flex-col md:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="text-xl font-bold mb-1">¿Tienes un negocio en el Tolima?</h3>
                <p className="text-green-100 text-sm">Regístralo gratis y empieza a vender hoy mismo.</p>
              </div>
              <Link
                href="/registro/vendedor"
                className="flex-shrink-0 bg-white text-primary font-bold px-7 py-3 rounded-xl hover:bg-accent hover:text-white transition-colors shadow-lg"
              >
                Registrar mi negocio
              </Link>
            </div>

            {/* Productos destacados */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Productos destacados</h2>
                <Link href="/buscar" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
                  Ver todos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading
                  ? Array(4).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
                  : products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
                }
              </div>
            </section>

            {/* Todos los comercios */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Todos los negocios locales</h2>
                <span className="text-sm text-gray-400">{stores.length} negocios</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading
                  ? Array(6).fill(0).map((_, i) => <StoreCardSkeleton key={i} />)
                  : stores.map((s, i) => <StoreCard key={s.id} store={s} index={i} />)
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
