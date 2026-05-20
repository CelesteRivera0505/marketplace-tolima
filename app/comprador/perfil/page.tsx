"use client";

import React from "react";
import { UserCircle2, Mail, MapPin } from "lucide-react";

export default function CompradorPerfilPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-card">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-secondary">Mi perfil</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Bienvenido/a de nuevo</h1>
            <p className="mt-2 text-sm text-slate-500">Aquí puedes revisar tus datos de cuenta y tu actividad como comprador.</p>
          </div>
          <button className="inline-flex items-center justify-center rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition">
            Editar perfil
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.35em] text-secondary">Cuenta</p>
          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <UserCircle2 className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-slate-500">Nombre</p>
                <p className="font-semibold text-slate-900">Ana Martínez</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-slate-500">Correo</p>
                <p className="font-semibold text-slate-900">ana.martinez@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-slate-500">Ciudad</p>
                <p className="font-semibold text-slate-900">Pereira, Tolima</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.35em] text-secondary">Actividad</p>
          <div className="mt-5 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Compras recientes</p>
              <p className="mt-2 font-semibold text-slate-900">3 compras en los últimos 30 días</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Búsquedas guardadas</p>
              <p className="mt-2 font-semibold text-slate-900">Tus productos favoritos están disponibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
