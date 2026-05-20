"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { StoreCard } from "@/components/marketplace/StoreCard";
import { DEMO_PRODUCTS, DEMO_STORES, formatPrice } from "@/lib/utils";
import { getCategoryFromSlug } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slugParam = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "");
  const category = getCategoryFromSlug(slugParam);

  const products = useMemo(() => {
    if (!category) return [];
    return DEMO_PRODUCTS.filter((product) => product.categoria.toLowerCase() === category.toLowerCase());
  }, [category]);

  const stores = useMemo(() => {
    if (!category) return [];
    return DEMO_STORES.filter((store) => store.categoria.toLowerCase() === category.toLowerCase());
  }, [category]);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-secondary">Categoría</p>
              <h1 className="mt-2 text-4xl font-bold text-slate-900">{category ?? "Categoría no encontrada"}</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-500">
                {category ? `Explora productos y comercios en la categoría ${category}.` : "Lo sentimos, no se encontró esta categoría."}
              </p>
            </div>
            <button onClick={() => router.back()} className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
              Volver
            </button>
          </div>
        </div>

        {category ? (
          <div className="grid gap-8">
            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-card">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-slate-900">Tiendas en {category}</h2>
                <span className="text-sm text-slate-500">{stores.length} comercios</span>
              </div>
              {stores.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
                  No hay comercios registrados en esta categoría todavía.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {stores.map((store, i) => (
                    <StoreCard key={store.id} store={store as any} index={i} />
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-card">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-slate-900">Productos populares</h2>
                <span className="text-sm text-slate-500">{products.length} productos</span>
              </div>
              {products.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
                  Aún no hay productos en esta categoría.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-12 text-center shadow-card">
            <AlertCircle className="mx-auto mb-4 h-10 w-10 text-slate-400" />
            <h2 className="text-2xl font-semibold text-slate-900">Categoría inválida</h2>
            <p className="mt-2 text-sm text-slate-500">Revisa la URL o explora las categorías disponibles desde la página principal.</p>
            <Link href="/" className="mt-6 inline-flex items-center justify-center rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition">
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
