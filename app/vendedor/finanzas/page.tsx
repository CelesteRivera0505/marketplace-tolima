"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign, TrendingUp, TrendingDown, Clock,
  CheckCircle, ArrowUpRight, ArrowDownRight, Calendar
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

/* ── datos mock ── */
const WEEKLY = [
  { day:"Lun", ventas:85000,  pedidos:4 },
  { day:"Mar", ventas:120000, pedidos:6 },
  { day:"Mié", ventas:65000,  pedidos:3 },
  { day:"Jue", ventas:145000, pedidos:7 },
  { day:"Vie", ventas:190000, pedidos:9 },
  { day:"Sáb", ventas:210000, pedidos:10 },
  { day:"Dom", ventas:48000,  pedidos:2 },
];
const maxW = Math.max(...WEEKLY.map(d => d.ventas));

const MONTHLY = [
  { mes:"Ago", ventas:1800000, pedidos:38 },
  { mes:"Sep", ventas:2400000, pedidos:52 },
  { mes:"Oct", ventas:1950000, pedidos:41 },
  { mes:"Nov", ventas:3800000, pedidos:78 },
  { mes:"Dic", ventas:5200000, pedidos:104 },
  { mes:"Ene", ventas:4850000, pedidos:97 },
];
const maxM = Math.max(...MONTHLY.map(d => d.ventas));

const PAGOS = [
  { id:"pg1", cliente:"María García",   monto:5000,  metodo:"Nequi",         estado:"recibido",  fecha:"Hoy 9:14am" },
  { id:"pg2", cliente:"Carlos López",   monto:5000,  metodo:"Daviplata",     estado:"recibido",  fecha:"Hoy 8:30am" },
  { id:"pg3", cliente:"Ana Martínez",   monto:24000, metodo:"Transferencia", estado:"recibido",  fecha:"Ayer 6:00pm" },
  { id:"pg4", cliente:"Pedro Ruiz",     monto:85000, metodo:"Nequi",         estado:"pendiente", fecha:"Ayer 2:15pm" },
  { id:"pg5", cliente:"Lucía Torres",   monto:14000, metodo:"Contra entrega",estado:"pendiente", fecha:"Hoy 7:50am" },
];

const KPIS = [
  { label:"Ingresos del día",    value:"$48.5K",  change:"+12%", up:true,  icon:DollarSign,  color:"bg-emerald-50 text-emerald-600" },
  { label:"Ingresos semanales",  value:"$863K",   change:"+8%",  up:true,  icon:TrendingUp,  color:"bg-blue-50 text-blue-600" },
  { label:"Ingresos mensuales",  value:"$4.85M",  change:"+18%", up:true,  icon:TrendingUp,  color:"bg-purple-50 text-purple-600" },
  { label:"Total ventas",        value:"$20.0M",  change:"+24%", up:true,  icon:DollarSign,  color:"bg-amber-50 text-amber-600" },
  { label:"Pagos pendientes",    value:"$99K",    change:"+2",   up:false, icon:Clock,       color:"bg-orange-50 text-orange-600" },
  { label:"Pagos recibidos",     value:"$34K",    change:"hoy",  up:true,  icon:CheckCircle, color:"bg-teal-50 text-teal-600" },
];

type Tab = "semana" | "mes";

export default function FinanzasPage() {
  const [tab, setTab] = useState<Tab>("semana");
  const data  = tab === "semana" ? WEEKLY  : MONTHLY;
  const maxV  = tab === "semana" ? maxW    : maxM;
  const dayKey = tab === "semana" ? "day"  : "mes";

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Finanzas</h1>
        <p className="text-gray-500 text-sm mt-0.5">Resumen financiero de tu negocio</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {KPIS.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-xl p-4 shadow-card border border-gray-50">
            <div className={`w-9 h-9 ${k.color} rounded-lg flex items-center justify-center mb-3`}>
              <k.icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-xl font-bold text-gray-900 leading-none">{k.value}</p>
            <p className="text-xs text-gray-500 mt-1 leading-tight">{k.label}</p>
            <div className={`flex items-center gap-0.5 mt-1.5 text-xs font-medium ${k.up ? "text-emerald-600" : "text-orange-500"}`}>
              {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {k.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gráfico de ventas */}
      <div className="bg-white rounded-xl shadow-card border border-gray-50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-gray-900">Ventas por período</h2>
            <p className="text-xs text-gray-400 mt-0.5">Ingresos acumulados</p>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(["semana","mes"] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${tab === t ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {t === "semana" ? "Esta semana" : "Últimos 6 meses"}
              </button>
            ))}
          </div>
        </div>

        {/* Barras */}
        <div className="flex items-end gap-2 h-44">
          {(data as any[]).map((d, i) => (
            <motion.div key={i} initial={{ height:0 }} animate={{ height:"auto" }}
              transition={{ delay: i * 0.06 }} className="flex-1 flex flex-col items-center gap-1.5">
              <p className="text-xs font-semibold text-gray-600 text-center leading-none">
                {formatPrice(d.ventas).replace("$","").replace(",00","")}
              </p>
              <div
                className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer min-h-[4px]"
                style={{ height: `${Math.max((d.ventas / maxV) * 140, 4)}px` }}
                title={`${d.pedidos} pedidos`}
              />
              <p className="text-xs text-gray-400 font-medium">{(d as any)[dayKey]}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tabla de pagos */}
      <div className="bg-white rounded-xl shadow-card border border-gray-50 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">Historial de pagos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80">
              <tr>
                {["Cliente","Monto","Método","Estado","Fecha"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {PAGOS.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{p.cliente}</td>
                  <td className="px-5 py-3 text-sm font-bold text-gray-900">{formatPrice(p.monto)}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{p.metodo}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      p.estado === "recibido" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {p.estado === "recibido" ? "Recibido" : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400">{p.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
