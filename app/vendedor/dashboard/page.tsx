"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package, ShoppingBag, TrendingUp, Eye, ArrowRight,
  CheckCircle, Clock, XCircle, DollarSign, Users,
  ArrowUpRight, ArrowDownRight, Star
} from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { DEMO_PRODUCTS, formatPrice } from "@/lib/utils";
import { getStatusColor, getStatusLabel } from "@/lib/utils";

const ORDERS = [
  { id:"o1", buyer:"María García",    items:"Pan Artesanal ×2",  total:5000,  status:"pendiente",  date:"Hoy 9:14am" },
  { id:"o2", buyer:"Carlos López",    items:"Mango Tommy ×1",    total:5000,  status:"confirmado", date:"Hoy 8:30am" },
  { id:"o3", buyer:"Ana Martínez",    items:"Tamal Tolimense ×3",total:24000, status:"entregado",  date:"Ayer 6:00pm" },
  { id:"o4", buyer:"Pedro Ruiz",      items:"Mochila Wayuu ×1",  total:85000, status:"cancelado",  date:"Ayer 2:15pm" },
  { id:"o5", buyer:"Lucía Torres",    items:"Arroz Diana ×4",    total:14000, status:"pendiente",  date:"Hoy 7:50am" },
];

const STATS = [
  { label:"Productos activos", value:"8",       sub:"+2 este mes",   icon:Package,     up:true,  color:"bg-blue-50 text-blue-600" },
  { label:"Pedidos totales",   value:"24",      sub:"+5 esta semana",icon:ShoppingBag, up:true,  color:"bg-amber-50 text-amber-600" },
  { label:"Ventas del mes",    value:"$485K",   sub:"+12% vs anterior",icon:TrendingUp,up:true,  color:"bg-emerald-50 text-emerald-600" },
  { label:"Visitas a tu tienda",value:"312",    sub:"+28 hoy",       icon:Eye,         up:true,  color:"bg-purple-50 text-purple-600" },
  { label:"Ingresos del día",  value:"$48.5K",  sub:"-3% vs ayer",   icon:DollarSign,  up:false, color:"bg-rose-50 text-rose-600" },
  { label:"Clientes atendidos",value:"18",      sub:"+4 hoy",        icon:Users,       up:true,  color:"bg-teal-50 text-teal-600" },
];

const ORDER_STATUS = [
  { label:"Pendientes",  count:5,  icon:Clock,        color:"bg-amber-50 text-amber-600 border-amber-200" },
  { label:"Confirmados", count:8,  icon:CheckCircle,  color:"bg-blue-50 text-blue-600 border-blue-200" },
  { label:"Entregados",  count:11, icon:CheckCircle,  color:"bg-emerald-50 text-emerald-600 border-emerald-200" },
  { label:"Cancelados",  count:2,  icon:XCircle,      color:"bg-red-50 text-red-600 border-red-200" },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Bienvenida ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">Panel de vendedor</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            ¡Hola, {user?.nombre.split(" ")[0]}! 👋
          </h1>
        </div>
        <Link href="/vendedor/productos">
          <button className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1B4332] transition-colors shadow-sm text-sm">
            + Nuevo producto
          </button>
        </Link>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {STATS.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-xl p-4 shadow-card border border-gray-50 hover:shadow-card-hover transition-shadow">
            <div className={`w-9 h-9 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
              <s.icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-xl font-bold text-gray-900 leading-none">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1 leading-tight">{s.label}</p>
            <div className={`flex items-center gap-0.5 mt-1.5 text-xs font-medium ${s.up ? "text-emerald-600" : "text-red-500"}`}>
              {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {s.sub}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Fila media ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pedidos recientes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card border border-gray-50 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Pedidos recientes</h2>
            <Link href="/vendedor/pedidos" className="text-primary text-xs font-semibold hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {ORDERS.map(o => (
              <div key={o.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/50 transition-colors">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold text-xs">
                  {o.buyer[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{o.buyer}</p>
                  <p className="text-xs text-gray-400 truncate">{o.items}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">{formatPrice(o.total)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(o.status)}`}>
                    {getStatusLabel(o.status)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 hidden md:block flex-shrink-0 w-20 text-right">{o.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Estado de pedidos */}
        <div className="bg-white rounded-xl shadow-card border border-gray-50 p-5">
          <h2 className="font-bold text-gray-900 mb-4">Estado de pedidos</h2>
          <div className="space-y-3">
            {ORDER_STATUS.map(s => (
              <div key={s.label} className={`flex items-center justify-between p-3 rounded-xl border ${s.color}`}>
                <div className="flex items-center gap-2">
                  <s.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                <span className="text-lg font-bold">{s.count}</span>
              </div>
            ))}
          </div>
          <Link href="/vendedor/pedidos">
            <button className="w-full mt-4 py-2.5 border-2 border-primary text-primary text-sm font-semibold rounded-xl hover:bg-primary hover:text-white transition-all">
              Gestionar pedidos
            </button>
          </Link>
        </div>
      </div>

      {/* ── Productos top ── */}
      <div className="bg-white rounded-xl shadow-card border border-gray-50 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">Mis productos</h2>
          <Link href="/vendedor/productos" className="text-primary text-xs font-semibold hover:underline flex items-center gap-1">
            Gestionar <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80">
              <tr>
                {["Producto","Categoría","Precio","Stock","Estado"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DEMO_PRODUCTS.slice(0, 5).map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.imagen} alt={p.nombre} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-900 truncate max-w-[160px]">{p.nombre}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs bg-green-100 text-primary px-2 py-0.5 rounded-full font-medium">{p.categoria}</span>
                  </td>
                  <td className="px-5 py-3 text-sm font-bold text-gray-900">{formatPrice(p.precio)}</td>
                  <td className="px-5 py-3">
                    <span className={`text-sm font-semibold ${p.stock <= 5 ? "text-orange-500" : "text-gray-700"}`}>{p.stock}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.activo ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {p.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
