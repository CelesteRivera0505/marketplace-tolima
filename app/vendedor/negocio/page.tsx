"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Store, MapPin, Phone, Clock, Save, Camera, CreditCard, Smartphone, Building2, Star } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CATEGORIAS } from "@/lib/types";
import toast from "react-hot-toast";

const BANCOS = ["Bancolombia","Davivienda","Banco de Bogotá","BBVA","Banco Popular","Otro"]
  .map(b => ({ value:b, label:b }));
const TIPOS = [{ value:"Ahorros", label:"Cuenta de Ahorros" },{ value:"Corriente", label:"Cuenta Corriente" }];

export default function NegocioPage() {
  const [tab, setTab] = useState<"info"|"pago">("info");
  const [info, setInfo] = useState({
    nombre:"Mi Tienda Tolimense", categoria:"Tienda de barrio",
    descripcion:"Tienda de barrio con productos de primera necesidad.",
    ciudad:"Ibagué", direccion:"Cra 5 #12-34", telefono:"3001234567",
    horario:"Lun-Sáb 7am-8pm", whatsapp:"3001234567",
  });
  const [pago, setPago] = useState({
    titular:"", banco:"", tipoCuenta:"", numeroCuenta:"", nequi:"", daviplata:"",
  });

  const setI = (k: keyof typeof info, v: string) => setInfo(p => ({ ...p, [k]:v }));
  const setP = (k: keyof typeof pago, v: string) => setPago(p => ({ ...p, [k]:v }));

  return (
    <div className="space-y-5 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Perfil del negocio</h1>
        <p className="text-gray-500 text-sm mt-0.5">Información que ven tus clientes en el marketplace</p>
      </div>

      {/* Preview card */}
      <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
        className="bg-white rounded-xl shadow-card border border-gray-50 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary to-[#40916C]" />
        <div className="px-5 pb-5 -mt-8 flex items-end gap-4">
          <div className="w-16 h-16 bg-white rounded-xl border-4 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-primary bg-green-100">
            {info.nombre[0]}
          </div>
          <div className="pb-1">
            <p className="font-bold text-gray-900">{info.nombre}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{info.categoria}</span>
              <span>·</span>
              <span>{info.ciudad}</span>
              <span>·</span>
              <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> 4.8</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(["info","pago"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === t ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}>
            {t === "info" ? "Información" : "Datos de pago"}
          </button>
        ))}
      </div>

      {tab === "info" && (
        <div className="bg-white rounded-xl shadow-card border border-gray-50 p-6 space-y-4">
          <Input label="Nombre del negocio" value={info.nombre} onChange={e => setI("nombre",e.target.value)}
            icon={<Store className="w-4 h-4" />} />
          <Select label="Categoría" value={info.categoria} onChange={e => setI("categoria",e.target.value)}
            options={CATEGORIAS.map(c => ({ value:c, label:c }))} />
          <Textarea label="Descripción" value={info.descripcion} onChange={e => setI("descripcion",e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Ciudad" value={info.ciudad} onChange={e => setI("ciudad",e.target.value)}
              icon={<MapPin className="w-4 h-4" />} />
            <Input label="Teléfono" value={info.telefono} onChange={e => setI("telefono",e.target.value)}
              icon={<Phone className="w-4 h-4" />} />
          </div>
          <Input label="Dirección" value={info.direccion} onChange={e => setI("direccion",e.target.value)}
            icon={<MapPin className="w-4 h-4" />} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Horario" value={info.horario} onChange={e => setI("horario",e.target.value)}
              icon={<Clock className="w-4 h-4" />} />
            <Input label="WhatsApp" value={info.whatsapp} onChange={e => setI("whatsapp",e.target.value)}
              icon={<Phone className="w-4 h-4" />} />
          </div>
          <Button variant="primary" size="lg" icon={<Save className="w-4 h-4" />}
            onClick={() => toast.success("Información actualizada ✓")}>
            Guardar cambios
          </Button>
        </div>
      )}

      {tab === "pago" && (
        <div className="bg-white rounded-xl shadow-card border border-gray-50 p-6 space-y-4">
          <Input label="Nombre del titular" placeholder="Como aparece en la cuenta" value={pago.titular}
            onChange={e => setP("titular",e.target.value)} icon={<CreditCard className="w-4 h-4" />} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Banco" value={pago.banco} onChange={e => setP("banco",e.target.value)} options={BANCOS} />
            <Select label="Tipo de cuenta" value={pago.tipoCuenta} onChange={e => setP("tipoCuenta",e.target.value)} options={TIPOS} />
          </div>
          <Input label="Número de cuenta" placeholder="Ej: 1234567890" value={pago.numeroCuenta}
            onChange={e => setP("numeroCuenta",e.target.value)} icon={<Building2 className="w-4 h-4" />} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Número Nequi" placeholder="300 000 0000" value={pago.nequi}
              onChange={e => setP("nequi",e.target.value)} icon={<Smartphone className="w-4 h-4" />} />
            <Input label="Número Daviplata" placeholder="310 000 0000" value={pago.daviplata}
              onChange={e => setP("daviplata",e.target.value)} icon={<Smartphone className="w-4 h-4" />} />
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-xs text-gray-600 border border-border">
            🔒 Tus datos bancarios solo se muestran a compradores al momento del pago.
          </div>
          <Button variant="primary" size="lg" icon={<Save className="w-4 h-4" />}
            onClick={() => toast.success("Datos de pago actualizados ✓")}>
            Guardar datos de pago
          </Button>
        </div>
      )}
    </div>
  );
}
