import Link from "next/link";
import { Store } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col">
      <header className="bg-primary py-4 px-6 shadow-sm">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <Store className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="font-bold text-white text-base block leading-none">Marketplace</span>
            <span className="text-accent text-xs font-medium">Tolima</span>
          </div>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-gray-400">
        © 2024 Marketplace Tolima
      </footer>
    </div>
  );
}
