import React from "react";
import Link from "next/link";
import { Store, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1B4332] text-green-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg block leading-none">Marketplace</span>
                <span className="text-accent text-sm font-medium">Tolima</span>
              </div>
            </div>
            <p className="text-sm text-green-300 leading-relaxed">
              Conectamos los pequeños comercios del Tolima con compradores cercanos. Apoyamos la economía local.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Compradores */}
          <div>
            <h3 className="text-white font-semibold mb-4">Compradores</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["/registro/comprador", "Crear cuenta"],
                ["/login/comprador", "Iniciar sesión"],
                ["/buscar", "Buscar productos"],
                ["/comprador/pedidos", "Mis pedidos"],
                ["/carrito", "Mi carrito"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-accent transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vendedores */}
          <div>
            <h3 className="text-white font-semibold mb-4">Vendedores</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["/registro/vendedor", "Vender aquí"],
                ["/login/vendedor", "Acceder al panel"],
                ["/vendedor/dashboard", "Mi dashboard"],
                ["/vendedor/productos", "Mis productos"],
                ["/vendedor/pedidos", "Mis pedidos"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-accent transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Ibagué, Tolima, Colombia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span>hola@marketplacetolima.co</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-green-400">
          <p>© 2024 Marketplace Tolima. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors">Términos</a>
            <a href="#" className="hover:text-accent transition-colors">Privacidad</a>
            <a href="#" className="hover:text-accent transition-colors">Ayuda</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
