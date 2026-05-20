import Link from "next/link";
import { ArrowRight, Store, ShoppingCart } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-white flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl rounded-[2rem] border border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="grid gap-6 md:grid-cols-2 p-8">
          <div className="rounded-[1.5rem] bg-blue-700 p-8 text-white shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 mb-6">
              <ShoppingCart className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold">Ingresar como Comprador</h1>
            <p className="mt-4 text-sm leading-6 text-blue-100">
              Accede a tu cuenta para explorar productos, seguir tiendas y comprar con seguridad en Tolima.
            </p>
            <Link href="/login/comprador" className="mt-8 inline-flex items-center gap-2 rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100">
              Iniciar sesión <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-[1.5rem] bg-slate-950 p-8 text-white shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary mb-6">
              <Store className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold">Ingresar como Vendedor</h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Gestiona tu tienda, productos y pedidos desde un panel especializado para comercios locales.
            </p>
            <Link href="/login/vendedor" className="mt-8 inline-flex items-center gap-2 rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-800">
              Acceder al panel <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
