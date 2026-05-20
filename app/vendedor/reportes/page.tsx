"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Download, Calendar, TrendingUp,
  Package, ShoppingBag, DollarSign, CheckCircle
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

/* ── datos mock ── */
const WEEKLY_SUMMARY = {
  periodo: "6 – 12 Ene 2025",
  ventas: 863000,
  pedidos: 41,
  productosVendidos: 87,
  clientesNuevos: 12,
  topProducto: "Samsung Galaxy A53",
  topCategoria: "Tecnología",
};

const MONTHLY_SUMMARY = {
  periodo: "Enero 2025",
  ventas: 4850000,
  pedidos: 97,
  productosVendidos: 312,
  clientesNuevos: 48,
  topProducto: "Mouse Logitech MX Master",
  topCategoria: "Tecnología",
};

const HISTORIAL = [
  { id:"v1", fecha:"12 Ene 2025", cliente:"María García",   producto:"Pan Artesanal ×2",    total:5000,  metodo:"Nequi" },
  { id:"v2", fecha:"12 Ene 2025", cliente:"Carlos López",   producto:"Mango Tommy ×1",      total:5000,  metodo:"Daviplata" },
  { id:"v3", fecha:"11 Ene 2025", cliente:"Ana Martínez",   producto:"Tamal Tolimense ×3",  total:24000, metodo:"Transferencia" },
  { id:"v4", fecha:"11 Ene 2025", cliente:"Pedro Ruiz",     producto:"Mochila Wayuu ×1",    total:85000, metodo:"Nequi" },
  { id:"v5", fecha:"10 Ene 2025", cliente:"Lucía Torres",   producto:"Arroz Diana ×4",      total:14000, metodo:"Contra entrega" },
  { id:"v6", fecha:"10 Ene 2025", cliente:"Jorge Pérez",    producto:"Samsung Galaxy A53",  total:899000,metodo:"Transferencia" },
  { id:"v7", fecha:"9 Ene 2025",  cliente:"Sandra Gómez",   producto:"Mouse Logitech ×2",   total:370000,metodo:"Nequi" },
];

function SummaryCard({ data, tipo }: { data: typeof WEEKLY_SUMMARY; tipo: "semanal" | "mensual" }) {
  const handleDownload = () => {
    // Genera un "PDF" simulado como texto
    const content = `
INFORME ${tipo.toUpperCase()} — MARKETPLACE TOLIMA
================================================
Período: ${data.periodo}

RESUMEN FINANCIERO
------------------
Total ventas:          ${formatPrice(data.ventas)}
Total pedidos:         ${data.pedidos}
Productos vendidos:    ${data.productosVendidos}
Clientes nuevos:       ${data.clientesNuevos}

TOP RENDIMIENTO
---------------
Producto más vendido:  ${data.topProducto}
Categoría líder:       ${data.topCategoria}

Generado por Marketplace Tolima
${new Date().toLocaleDateString("es-CO")}
    `.trim();

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `informe-${tipo}-marketplace-tolima.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Informe ${tipo} descargado`);
  };

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-50 overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-[#40916C] px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-white/70 text-xs font-medium uppercase tracking-wide">Informe {tipo}</p>
          <p className="text-white font-bold text-sm mt-0.5">{data.periodo}</p>
        </div>
        <FileText className="w-8 h-8 text-white/40" />
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label:"Ventas",            value: formatPrice(data.ventas),          icon:DollarSign },
            { label:"Pedidos",           value: String(data.pedidos),              icon:ShoppingBag },
            { label:"Productos vendidos",value: String(data.productosVendidos),    icon:Package },
            { label:"Clientes nuevos",   value: String(data.clientesNuevos),       icon:TrendingUp },
          ].map(m => (
            <div key={m.label} className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">{m.label}</p>
              <p className="text-base font-bold text-gray-900 mt-0.5">{m.value}</p>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 mb-4 space-y-1">
          <p>🏆 Top producto: <span className="font-semibold text-gray-700">{data.topProducto}</span></p>
          <p>📦 Categoría líder: <span className="font-semibold text-gray-700">{data.topCategoria}</span></p>
        </div>
        <button onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-[#1B4332] transition-colors text-sm">
          <Download className="w-4 h-4" />
          Descargar informe {tipo}
        </button>
      </div>
    </div>
  );
}

export default function ReportesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
        <p className="text-gray-500 text-sm mt-0.5">Descarga informes de tu actividad comercial</p>
      </div>

      {/* Tarjetas de descarga */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
          <SummaryCard data={WEEKLY_SUMMARY}  tipo="semanal" />
        </motion.div>
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <SummaryCard data={MONTHLY_SUMMARY} tipo="mensual" />
        </motion.div>
      </div>

      {/* Historial de ventas */}
      <div className="bg-white rounded-xl shadow-card border border-gray-50 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">Historial de ventas</h2>
          <button
            onClick={() => {
              const rows = HISTORIAL.map(v =>
                `${v.fecha}\t${v.cliente}\t${v.producto}\t${formatPrice(v.total)}\t${v.metodo}`
              ).join("\n");
              const content = `Fecha\tCliente\tProducto\tTotal\tMétodo\n${rows}`;
              const blob = new Blob([content], { type:"text/plain;charset=utf-8" });
              const url  = URL.createObjectURL(blob);
              const a    = document.createElement("a");
              a.href = url; a.download = "historial-ventas.txt"; a.click();
              URL.revokeObjectURL(url);
              toast.success("Historial descargado");
            }}
            className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:underline">
            <Download className="w-3.5 h-3.5" /> Exportar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80">
              <tr>
                {["Fecha","Cliente","Producto","Total","Método","Estado"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {HISTORIAL.map((v, i) => (
                <motion.tr key={v.id} initial={{ opacity:0 }} animate={{ opacity:1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-xs text-gray-500">{v.fecha}</td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{v.cliente}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 max-w-[180px] truncate">{v.producto}</td>
                  <td className="px-5 py-3 text-sm font-bold text-gray-900">{formatPrice(v.total)}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{v.metodo}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                      <CheckCircle className="w-3 h-3" /> Completado
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
