"use client";

import React, { useState } from "react";
import { Bell, Lock, Smartphone, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function ConfiguracionPage() {
  const [notif, setNotif] = useState({ pedidos: true, mensajes: true, promociones: false });

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-500 mt-1">Ajusta las preferencias de tu cuenta</p>
      </div>

      {/* Notificaciones */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-5 h-5 text-secondary" />
          <h2 className="text-lg font-semibold text-gray-900">Notificaciones</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: "pedidos", label: "Nuevos pedidos", desc: "Recibe alertas cuando llegue un pedido" },
            { key: "mensajes", label: "Mensajes de clientes", desc: "Notificaciones de WhatsApp" },
            { key: "promociones", label: "Promociones de la plataforma", desc: "Ofertas y novedades" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotif((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                className={`w-12 h-6 rounded-full transition-colors ${notif[item.key as keyof typeof notif] ? "bg-secondary" : "bg-gray-300"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${notif[item.key as keyof typeof notif] ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Seguridad */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Lock className="w-5 h-5 text-secondary" />
          <h2 className="text-lg font-semibold text-gray-900">Seguridad</h2>
        </div>
        <div className="space-y-4">
          <Input label="Contraseña actual" type="password" placeholder="••••••••" />
          <Input label="Nueva contraseña" type="password" placeholder="••••••••" />
          <Input label="Confirmar nueva contraseña" type="password" placeholder="••••••••" />
          <Button variant="secondary" icon={<Save className="w-4 h-4" />} onClick={() => toast.success("Contraseña actualizada")}>
            Cambiar contraseña
          </Button>
        </div>
      </div>
    </div>
  );
}
