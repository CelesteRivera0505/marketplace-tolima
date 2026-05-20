"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Search, CheckCircle, XCircle, Package, Clock } from "lucide-react";
import { formatPrice, getStatusColor, getStatusLabel } from "@/lib/utils";
import { OrderStatus } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

const INIT_ORDERS = [
  { id:"o1", buyer:"María García",   phone:"3001234567", items:[{ n:"Pan Artesanal",    q:2, p:2500  }], total:5000,  status:"pendiente"  as OrderStatus, date:"Hoy 9:14am",   metodo:"Nequi" },
  { id:"o2", buyer:"Carlos López",   phone:"3109876543", items:[{ n:"Mango Tommy x3",   q:1, p:5000  }], total:5000,  status:"confirmado" as OrderStatus, date:"Hoy 8:30am",   metodo:"Daviplata" },
  { id:"o3", buyer:"Ana Martínez",   phone:"3157654321", items:[{ n:"Tamal Tolimense",  q:3, p:8000  }], total:24000, status:"entregado"  as OrderStatus, date:"Ayer 6:00pm",  metodo:"Transferencia" },
  { id:"o4", buyer:"Pedro Ruiz",     phone:"3204567890", items:[{ n:"Mochila Wayuu",    q:1, p:85000 }], total:85000, status:"cancelado"  as OrderStatus, date:"Ayer 2:15pm",  metodo:"Nequi" },
  { id:"o5", buyer:"Lucía Torres",   phone:"3112345678", items:[{ n:"Arroz Diana ×4",   q:4, p:3500  },{ n:"Aceite ×1", q:1, p:12000 }], total:26000, status:"pendiente" as OrderStatus, date:"Hoy 7:50am", metodo:"Contra entrega" },
  { id:"o6", buyer:"Jorge Pérez",    phone:"3187654321", items:[{ n:"Samsung Galaxy",   q:1, p:899000}], total:899000,status:"confirmado" as OrderStatus, date:"Ayer 10:00am", metodo:"Transferencia" },
];

const FILTERS: { value: OrderStatus|"todos"; label:string; icon: React.ElementType }[] = [
  { value:"todos",      label:"Todos",      icon:Package },
  { value:"pendiente",  label:"Pendientes", icon:Clock },
  { value:"confirmado", label:"Confirmados",icon:CheckCircle },
  { value:"entregado",  label:"Entregados", icon:CheckCircle },
  { value:"cancelado",  label:"Cancelados", icon:XCircle },
];

export default function PedidosPage() {
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [filter, setFilter] = useState<OrderStatus|"todos">("todos");
  const [search, setSearch] = useState("");

  const counts = {
    todos:      orders.length,
    pendiente:  orders.filter(o => o.status === "pendiente").length,
    confirmado: orders.filter(o => o.status === "confirmado").length,
    entregado:  orders.filter(o => o.status === "entregado").length,
    cancelado:  orders.filter(o => o.status === "cancelado").length,
  };

  const filtered = orders.filter(o => {
    const matchF = filter === "todos" || o.status === filter;
    const matchS = o.buyer.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  const update = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast.success(`Pedido ${getStatusLabel(status).toLowerCase()}`);
  };

  const whatsapp = (o: typeof INIT_ORDERS[0]) => {
    const msg = `Hola ${o.buyer}, tu pedido en Marketplace Tolima está ${getStatusLabel(o.status).toLowerCase()}. Total: ${formatPrice(o.total)}`;
    window.open(`https://wa.me/${o.phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
        <p className="text-gray-500 text-sm mt-0.5">{orders.length} pedidos en total</p>
      </div>

      {/* Tabs de estado */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === f.value
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-100 hover:border-primary/30 hover:text-primary"
            }`}>
            <f.icon className="w-3.5 h-3.5" />
            {f.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              filter === f.value ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {counts[f.value]}
            </span>
          </button>
        ))}
      </div>

      {/* Búsqueda */}
      <div className="bg-white rounded-xl shadow-card border border-gray-50 p-4">
        <Input placeholder="Buscar por nombre de cliente..." value={search}
          onChange={e => setSearch(e.target.value)} icon={<Search className="w-4 h-4" />} />
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-card border border-gray-50 text-center py-16">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No hay pedidos con este filtro</p>
          </div>
        ) : filtered.map((o, i) => (
          <motion.div key={o.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl shadow-card border border-gray-50 p-5 hover:shadow-card-hover transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              {/* Info cliente */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                    {o.buyer[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{o.buyer}</p>
                    <p className="text-xs text-gray-400">{o.date} · {o.metodo}</p>
                  </div>
                  <span className={`ml-auto md:ml-2 text-xs px-2.5 py-1 rounded-full font-semibold ${getStatusColor(o.status)}`}>
                    {getStatusLabel(o.status)}
                  </span>
                </div>
                <div className="ml-10 space-y-0.5">
                  {o.items.map((item, j) => (
                    <p key={j} className="text-sm text-gray-600">
                      {item.n} × {item.q} — <span className="font-medium">{formatPrice(item.p * item.q)}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Total + acciones */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <p className="text-xl font-bold text-gray-900">{formatPrice(o.total)}</p>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {o.status === "pendiente" && <>
                    <button onClick={() => update(o.id, "confirmado")}
                      className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-colors font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Confirmar
                    </button>
                    <button onClick={() => update(o.id, "cancelado")}
                      className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors font-semibold">
                      <XCircle className="w-3.5 h-3.5" /> Cancelar
                    </button>
                  </>}
                  {o.status === "confirmado" && (
                    <button onClick={() => update(o.id, "entregado")}
                      className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-200 transition-colors font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Marcar entregado
                    </button>
                  )}
                  <button onClick={() => whatsapp(o)}
                    className="flex items-center gap-1 text-xs bg-whatsapp text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors font-semibold">
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
