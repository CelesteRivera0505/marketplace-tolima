"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, ShoppingBag, Eye, Star, ArrowUp, ArrowDown } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const monthlyData = [
  { mes: "Ago", ventas: 180000, pedidos: 8 },
  { mes: "Sep", ventas: 240000, pedidos: 12 },
  { mes: "Oct", ventas: 195000, pedidos: 9 },
  { mes: "Nov", ventas: 380000, pedidos: 18 },
  { mes: "Dic", ventas: 520000, pedidos: 24 },
  { mes: "Ene", ventas: 485000, pedidos: 22 },
];

const maxVentas = Math.max(...monthlyData.map((d) => d.ventas));

export default function EstadisticasPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Estadísticas</h1>
        <p className="text-gray-500 mt-1">Rendimiento de tu negocio en los últimos 6 meses</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Ventas totales", value: "$2.0M", change: "+18%", up: true, icon: TrendingUp, color: "bg-green-50 text-green-600" },
          { label: "Total pedidos", value: "93", change: "+12%", up: true, icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
          { label: "Visitas al perfil", value: "1,847", change: "+34%", up: true, icon: Eye, color: "bg-purple-50 text-purple-600" },
          { label: "Calificación", value: "4.8 ★", change: "+0.2", up: true, icon: Star, color: "bg-yellow-50 text-yellow-600" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-5"
          >
            <div className={`w-10 h-10 ${kpi.color} rounded-xl flex items-center justify-center mb-3`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{kpi.label}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${kpi.up ? "text-green-600" : "text-red-500"}`}>
              {kpi.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {kpi.change} vs mes anterior
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gráfico de barras */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Ventas mensuales</h2>
        <div className="flex items-end gap-4 h-48">
          {monthlyData.map((d, i) => (
            <motion.div
              key={d.mes}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <p className="text-xs font-bold text-gray-700">{formatPrice(d.ventas).replace("$", "$")}</p>
              <div
                className="w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-yellow-400"
                style={{ height: `${(d.ventas / maxVentas) * 160}px` }}
              />
              <p className="text-xs text-gray-500 font-medium">{d.mes}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tabla resumen */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-gray-900">Detalle mensual</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Mes</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Ventas</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Pedidos</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Promedio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {monthlyData.map((d) => (
              <tr key={d.mes} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{d.mes}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{formatPrice(d.ventas)}</td>
                <td className="px-6 py-4 text-gray-600">{d.pedidos}</td>
                <td className="px-6 py-4 text-gray-600">{formatPrice(Math.round(d.ventas / d.pedidos))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
