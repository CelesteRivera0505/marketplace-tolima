"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/context/AuthContext";
import {
  LayoutDashboard, Package, ClipboardList, Store, Settings,
  BarChart3, LogOut, Menu, X, ChevronRight, TrendingUp,
  FileText, User
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/vendedor/dashboard",      label: "Inicio",         icon: LayoutDashboard },
  { href: "/vendedor/productos",      label: "Mis Productos",  icon: Package },
  { href: "/vendedor/pedidos",        label: "Pedidos",        icon: ClipboardList },
  { href: "/vendedor/finanzas",       label: "Ventas",         icon: TrendingUp },
  { href: "/vendedor/reportes",       label: "Reportes",       icon: FileText },
  { href: "/vendedor/negocio",        label: "Perfil",         icon: Store },
  { href: "/vendedor/configuracion",  label: "Configuración",  icon: Settings },
];

export default function VendedorLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.rol !== "vendedor")) router.push("/login/vendedor");
  }, [user, loading, router]);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm font-medium">Cargando panel...</p>
      </div>
    </div>
  );
  if (!user) return null;

  const handleLogout = async () => { await logout(); router.push("/"); };

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex">
      {/* Overlay móvil */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setOpen(false)} />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-[#1B4332] z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center shadow-sm">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none">
              <p className="font-bold text-white text-sm">Marketplace</p>
              <p className="text-[#95D5B2] text-xs font-medium">Tolima · Vendedor</p>
            </div>
          </Link>
        </div>

        {/* Avatar */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
            <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">
              {user.nombre[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user.nombre}</p>
              <p className="text-green-300 text-xs truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-secondary/25 text-[#95D5B2] font-semibold"
                    : "text-green-200/80 hover:bg-white/8 hover:text-white"
                )}>
                <item.icon className={cn("w-4.5 h-4.5 flex-shrink-0", active ? "text-[#95D5B2]" : "text-green-300/70")} />
                {item.label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#95D5B2]" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-300/80 hover:bg-red-900/30 hover:text-red-300 transition-all">
            <LogOut className="w-4 h-4" /> Cerrar sesión
          </button>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-green-400/60 hover:text-green-300 transition-colors">
            ← Volver al marketplace
          </Link>
        </div>
      </aside>

      {/* ── Contenido ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar móvil */}
        <header className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-20 shadow-sm">
          <button onClick={() => setOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Store className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">Panel Vendedor</span>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
