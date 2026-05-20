"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingCart, MapPin, User, Store, ChevronDown,
  Menu, X, LogOut, Package, Bell
} from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { useCart } from "@/lib/context/CartContext";
import toast from "react-hot-toast";

export function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/buscar?q=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    toast.success("Sesión cerrada");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 shadow-header">
      {/* Barra principal verde */}
      <div className="bg-primary px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-bold text-white text-base block">Marketplace</span>
              <span className="text-accent text-xs font-medium">Tolima</span>
            </div>
          </Link>

          {/* Ubicación */}
          <button className="hidden md:flex items-center gap-1 text-green-100 hover:text-white text-sm flex-shrink-0 transition-colors">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">Ibagué, Tolima</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Buscador */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos, tiendas, categorías..."
                className="w-full px-4 py-2.5 text-gray-900 bg-white rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-[#40a070] text-white px-4 py-2.5 rounded-r-lg transition-colors flex-shrink-0"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Acciones */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Carrito */}
            <Link
              href="/carrito"
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-warning text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Usuario */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.nombre[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-white max-w-[90px] truncate">
                    {user.nombre.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-green-200" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50"
                    >
                      <div className="p-3 border-b bg-green-50">
                        <p className="font-semibold text-gray-900 text-sm">{user.nombre}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <span className="badge bg-primary text-white mt-1">{user.rol}</span>
                      </div>
                      <div className="p-2">
                        {user.rol === "vendedor" ? (
                          <Link
                            href="/vendedor/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-green-50 rounded-lg text-sm text-gray-700 transition-colors"
                          >
                            <Store className="w-4 h-4 text-primary" /> Mi Dashboard
                          </Link>
                        ) : (
                          <>
                            <Link
                              href="/comprador/pedidos"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-green-50 rounded-lg text-sm text-gray-700 transition-colors"
                            >
                              <Package className="w-4 h-4 text-primary" /> Mis Pedidos
                            </Link>
                            <Link
                              href="/comprador/perfil"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-green-50 rounded-lg text-sm text-gray-700 transition-colors"
                            >
                              <User className="w-4 h-4 text-primary" /> Mi Perfil
                            </Link>
                          </>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 rounded-lg text-sm text-red-600 mt-1 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Cerrar sesión
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login/comprador"
                  className="hidden sm:block text-sm font-semibold text-white hover:text-accent transition-colors px-2 py-1"
                >
                  Ingresar
                </Link>
                <Link
                  href="/crear-negocio"
                  className="hidden sm:block bg-white text-primary text-sm font-bold px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition-colors whitespace-nowrap"
                >
                  Crear tu negocio
                </Link>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="sm:hidden p-2 text-white"
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-b border-border sm:hidden"
          >
            <div className="p-4 space-y-2">
              <Link href="/login/comprador" className="block py-2 text-gray-700 font-medium hover:text-primary">
                Ingresar como Comprador
              </Link>
              <Link href="/login/vendedor" className="block py-2 text-gray-700 font-medium hover:text-primary">
                Ingresar como Vendedor
              </Link>
              <Link href="/registro/comprador" className="block py-2 text-gray-700 font-medium hover:text-primary">
                Registrarse
              </Link>
              <Link href="/crear-negocio" className="block py-2 text-primary font-bold">
                Crear tu negocio en Marketplace Tolima
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
