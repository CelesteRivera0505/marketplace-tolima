"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";
import { DEMO_PRODUCTS, DEMO_STORES, formatPrice, generateWhatsAppMessage } from "@/lib/utils";
import { ArrowLeft, Star, Store, ShoppingCart, MessageCircle, Package, CheckCircle, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProductPage() {
  const params = useParams();
  const productId = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = useMemo(() => DEMO_PRODUCTS.find((item) => item.id === productId), [productId]);
  const store = useMemo(() => DEMO_STORES.find((item) => item.id === product?.storeId), [product]);
  const related = useMemo(() => DEMO_PRODUCTS.filter((p) => p.storeId === product?.storeId && p.id !== productId).slice(0, 4), [product, productId]);

  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen py-20 px-4">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-12 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900">Producto no encontrado</h2>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition">
            Ir al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappUrl = store
    ? generateWhatsAppMessage(store.nombre, store.telefono ?? "", [{ nombre: product.nombre, cantidad: quantity, precio: product.precio }], product.precio * quantity)
    : "#";

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          {store && <Link href={`/tienda/${store.id}`} className="hover:text-primary transition-colors">{store.nombre}</Link>}
          <span>/</span>
          <span className="text-gray-900 font-medium line-clamp-1">{product.nombre}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-6">

          {/* Imagen */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="relative aspect-square md:aspect-[4/3]">
              <Image
                src={product.imagen || "/images/placeholder-product.jpg"}
                alt={product.nombre}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                  {product.categoria}
                </span>
              </div>
            </div>
            {/* Info tienda debajo de imagen */}
            {store && (
              <Link href={`/tienda/${store.id}`} className="flex items-center gap-3 p-4 border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={store.logo || "/images/placeholder-store.jpg"} alt={store.nombre} fill className="object-cover" sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">Vendido por</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{store.nombre}</p>
                </div>
                <Store className="w-4 h-4 text-gray-400" />
              </Link>
            )}
          </div>

          {/* Panel compra */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                ))}
                <span className="text-xs text-gray-400 ml-1">(4.8)</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.nombre}</h1>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{product.descripcion}</p>

              {/* Precio */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(product.precio)}</span>
              </div>

              {/* Disponibilidad */}
              <div className="flex items-center gap-2 mb-5">
                {product.stock > 0 ? (
                  <><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-sm text-green-600 font-medium">En stock — {product.stock} unidades</span></>
                ) : (
                  <><Package className="w-4 h-4 text-red-400" /><span className="text-sm text-red-500 font-medium">Agotado</span></>
                )}
              </div>

              {/* Cantidad */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm text-gray-600 font-medium">Cantidad:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-gray-900 min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-400">= {formatPrice(product.precio * quantity)}</span>
              </div>

              {/* Botones */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
                    added ? "bg-green-500 text-white" : "bg-primary hover:bg-primary/90 text-white disabled:bg-gray-200 disabled:text-gray-400"
                  }`}
                >
                  {added ? <><CheckCircle className="w-4 h-4" /> ¡Agregado!</> : <><ShoppingCart className="w-4 h-4" /> Agregar al carrito</>}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm bg-green-500 hover:bg-green-600 text-white transition-all duration-200 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" /> Comprar por WhatsApp
                </a>
              </div>
            </div>

            {/* Detalles */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Detalles del producto</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Categoría</span>
                  <span className="font-medium text-gray-900">{product.categoria}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Disponibilidad</span>
                  <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                    {product.stock > 0 ? "En stock" : "Agotado"}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Código</span>
                  <span className="font-medium text-gray-900 uppercase">{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Más productos de {store?.nombre}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <Link key={p.id} href={`/producto/${p.id}`} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all group">
                  <div className="relative h-36 bg-gray-50">
                    <Image src={p.imagen || "/images/placeholder-product.jpg"} alt={p.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="200px" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-gray-900 line-clamp-2 mb-1">{p.nombre}</p>
                    <p className="text-sm font-bold text-primary">{formatPrice(p.precio)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
