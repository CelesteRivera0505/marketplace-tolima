"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { StoreCard } from "@/components/marketplace/StoreCard";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { DEMO_PRODUCTS, DEMO_STORES, slugify } from "@/lib/utils";
import { Product, Store } from "@/lib/types";
import { Search, AlertCircle, SlidersHorizontal } from "lucide-react";
import { CATEGORIAS } from "@/lib/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("categoria") ?? "";

  const filteredProducts = useMemo(() => {
    let results = DEMO_PRODUCTS as Product[];
    if (category) results = results.filter((p) => p.categoria.toLowerCase() === category.toLowerCase());
    if (query) results = results.filter((p) =>
      p.nombre.toLowerCase().includes(query.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(query.toLowerCase()) ||
      (p.storeName?.toLowerCase() || "").includes(query.toLowerCase())
    );
    return results;
  }, [category, query]);

  const filteredStores = useMemo(() => {
    let results = DEMO_STORES as Store[];
    if (category) results = results.filter((s) => s.categoria.toLowerCase() === category.toLowerCase());
    if (query) results = results.filter((s) =>
      s.nombre.toLowerCase().includes(query.toLowerCase()) ||
      s.descripcion.toLowerCase().includes(query.toLowerCase()) ||
      s.ciudad.toLowerCase().includes(query.toLowerCase())
    );
    return results;
  }, [category, query]);

  const title = category
    ? `Categoría: ${category}`
    : query
    ? `Resultados para "${query}"`
    : "Explorar todo el marketplace";

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">
            {filteredStores.length} tiendas · {filteredProducts.length} productos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filtros */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-secondary" />
                <h3 className="font-semibold text-gray-900">Categorías</h3>
              </div>
              <div className="space-y-1">
                <Link
                  href="/buscar"
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${!category ? "bg-primary text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  Todas las categorías
                </Link>
                {CATEGORIAS.slice(0, 10).map((cat) => (
                  <Link
                    key={cat}
                    href={`/buscar?categoria=${encodeURIComponent(cat)}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${category === cat ? "bg-primary text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Ciudades</h3>
              <div className="space-y-1">
                {["Ibagué", "Espinal", "Melgar", "Honda", "Líbano"].map((ciudad) => (
                  <Link
                    key={ciudad}
                    href={`/buscar?q=${ciudad}`}
                    className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {ciudad}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Resultados */}
          <div className="lg:col-span-3 space-y-8">
            {/* Tiendas */}
            {filteredStores.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Tiendas ({filteredStores.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredStores.map((store, i) => (
                    <StoreCard key={store.id} store={store} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Productos */}
            {filteredProducts.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Productos ({filteredProducts.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              </section>
            )}

            {filteredStores.length === 0 && filteredProducts.length === 0 && (
              <div className="text-center py-20 card">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin resultados</h3>
                <p className="text-gray-500 mb-6">Intenta con otra búsqueda o explora las categorías</p>
                <Link href="/buscar" className="text-secondary font-semibold hover:underline">
                  Ver todo el marketplace
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
