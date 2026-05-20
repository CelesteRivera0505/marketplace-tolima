"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, MessageCircle, ArrowLeft, Package } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useAuth } from "@/lib/context/AuthContext";
import { formatPrice, generateWhatsAppMessage } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();
  const { user } = useAuth();
  const [checkoutMode, setCheckoutMode] = useState(false);

  // Agrupar items por tienda
  const byStore = items.reduce((acc, item) => {
    const storeId = item.product.storeId;
    if (!acc[storeId]) acc[storeId] = { storeName: item.product.storeName || "Tienda", items: [] };
    acc[storeId].items.push(item);
    return acc;
  }, {} as Record<string, { storeName: string; items: typeof items }>);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/" className="p-2 hover:bg-white rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mi Carrito</h1>
              <p className="text-sm text-gray-500">{itemCount} {itemCount === 1 ? "producto" : "productos"}</p>
            </div>
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
              <p className="text-gray-500 mb-8">Explora los comercios locales y agrega productos</p>
              <Link href="/">
                <Button variant="secondary" size="lg" icon={<Package className="w-5 h-5" />}>
                  Explorar productos
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista de productos */}
              <div className="lg:col-span-2 space-y-6">
                {Object.entries(byStore).map(([storeId, storeData]) => (
                  <div key={storeId} className="card p-6">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-gray-900" />
                      </div>
                      <Link href={`/tienda/${storeId}`} className="font-semibold text-gray-900 hover:text-secondary">
                        {storeData.storeName}
                      </Link>
                    </div>

                    <div className="space-y-4">
                      <AnimatePresence>
                        {storeData.items.map((item) => (
                          <motion.div
                            key={item.product.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex gap-4 items-center"
                          >
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                              <Image
                                src={item.product.imagen || "https://placehold.co/80x80/f3f4f6/9ca3af?text=P"}
                                alt={item.product.nombre}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-sm truncate">{item.product.nombre}</p>
                              <p className="text-secondary font-bold mt-1">{formatPrice(item.product.precio)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.cantidad - 1)}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-semibold text-sm">{item.cantidad}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.cantidad + 1)}
                                disabled={item.cantidad >= item.product.stock}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="font-bold text-gray-900 text-sm w-24 text-right">
                              {formatPrice(item.product.precio * item.cantidad)}
                            </p>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-gray-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Botón WhatsApp por tienda */}
                    <div className="mt-4 pt-4 border-t">
                      <a
                        href={generateWhatsAppMessage(
                          storeData.storeName,
                          "3001234567",
                          storeData.items.map(i => ({ nombre: i.product.nombre, cantidad: i.cantidad, precio: i.product.precio })),
                          storeData.items.reduce((s, i) => s + i.product.precio * i.cantidad, 0)
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-whatsapp text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Pedir por WhatsApp a {storeData.storeName}
                      </a>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Vaciar carrito
                </button>
              </div>

              {/* Resumen */}
              <div className="lg:col-span-1">
                <div className="card p-6 sticky top-24">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen del pedido</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal ({itemCount} productos)</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Envío</span>
                      <span className="text-green-600 font-medium">A coordinar</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-xl">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/checkout" className="block">
                      <Button variant="primary" size="lg" className="w-full" icon={<MessageCircle className="w-5 h-5" />}>
                        Ir al checkout
                      </Button>
                    </Link>
                    <Link href="/" className="block">
                      <Button variant="outline" size="md" className="w-full">
                        Seguir comprando
                      </Button>
                    </Link>
                  </div>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    Los pedidos se confirman directamente con cada tienda por WhatsApp
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
