import Link from "next/link";

export default function CompradorIndexPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-[1.5rem] border border-slate-200 bg-white p-10 shadow-card text-center">
        <h1 className="text-4xl font-bold text-slate-900">Bienvenido comprador</h1>
        <p className="mt-4 text-sm text-slate-500">Accede a tu perfil, revisa tus pedidos o vuelve a la tienda para explorar productos destacados.</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/buscar" className="inline-flex items-center justify-center rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition">
            Explorar productos
          </Link>
          <Link href="/comprador/perfil" className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition">
            Mi perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
