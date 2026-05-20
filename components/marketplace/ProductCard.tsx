"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Store, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
    >
      {/* Imagen */}
      <Link href={`/producto/${product.id}`} className="relative block h-52 bg-gray-50 overflow-hidden">
        <Image
          src={product.imagen || "/images/placeholder-product.jpg"}
          alt={product.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 250px"
        />
        {/* Badge categoría */}
        <div className="absolute top-2 left-2">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {product.categoria}
          </span>
        </div>
        {/* Badge stock */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow">
            ¡Últimas {product.stock}!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-sm font-bold px-4 py-1.5 rounded-full">Agotado</span>
          </div>
        )}
        {/* Overlay hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow">
            <Eye className="w-3.5 h-3.5" /> Ver detalle
          </span>
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/producto/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.nombre}
          </h3>
        </Link>

        {product.storeName && (
          <Link href={`/tienda/${product.storeId}`} className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary mb-2 transition-colors">
            <Store className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{product.storeName}</span>
          </Link>
        )}

        <p className="text-xs text-gray-400 line-clamp-2 mb-3 flex-1">{product.descripcion}</p>

        {/* Precio + stock */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-gray-900">{formatPrice(product.precio)}</span>
          {product.stock > 5 && (
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
              {product.stock} disponibles
            </span>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {product.stock === 0 ? "Agotado" : "Agregar"}
          </button>
          <Link
            href={`/producto/${product.id}`}
            className="px-3 py-2.5 border border-gray-200 hover:border-primary hover:text-primary text-gray-500 rounded-xl transition-all duration-200 flex items-center justify-center"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
