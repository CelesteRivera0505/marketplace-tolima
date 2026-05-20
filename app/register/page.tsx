import Link from "next/link";
import { ArrowRight, UserPlus, Briefcase } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-white flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl rounded-[2rem] border border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="grid gap-6 md:grid-cols-2 p-8">
          <div className="rounded-[1.5rem] bg-slate-950 p-8 text-white shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary mb-6">
              <UserPlus className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold">Registrar comprador</h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Crea tu cuenta gratuita para descubrir productos y apoyar a los negocios locales del Tolima.
            </p>
            <Link href="/registro/comprador" className="mt-8 inline-flex items-center gap-2 rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-800">
              Registrarme <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-[1.5rem] bg-blue-700 p-8 text-white shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 mb-6">
              <Briefcase className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold">Registrar vendedor</h1>
            <p className="mt-4 text-sm leading-6 text-blue-100">
              Registra tu negocio, sube productos y llega a más clientes con una tienda profesional.
            </p>
            <Link href="/registro/vendedor" className="mt-8 inline-flex items-center gap-2 rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100">
              Comenzar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
