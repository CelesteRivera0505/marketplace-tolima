"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CompradorPedidosPage() {
  return (
    <div className="bg-background min-h-screen py-10 px-4">
      <div className="mx-auto max-w-4xl rounded-[1.5rem] border border-slate-200 bg-white p-10 shadow-card text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Tus pedidos</h1>
        <p className="mt-3 text-sm text-slate-500">Aún no tienes pedidos registrados. Empieza a comprar productos y aparecerán aquí tus compras recientes.</p>
        <Link href="/" className="mt-8 inline-flex items-center justify-center rounded-3xl bg-secondary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition">
          Explorar productos
        </Link>
      </div>
    </div>
  );
}
