"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Store } from "lucide-react";
import { loginUser } from "@/lib/services/auth.service";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function LoginVendedorPage() {
  const router = useRouter();
  const { setUserDirectly } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      toast.error("Completa todos los campos");
      return;
    }
    setLoading(true);
    try {
      const user = await loginUser(form.email.trim().toLowerCase(), form.password);
      if (user.rol !== "vendedor") {
        toast.error("Esta cuenta es de comprador. Usa el login de comprador.");
        return;
      }
      // Inyectar sesión inmediatamente en el contexto
      setUserDirectly(user);
      toast.success(`¡Bienvenido, ${user.nombre.split(" ")[0]}!`);
      router.push("/vendedor/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("invalid-credential") || msg.includes("wrong-password") || msg.includes("user-not-found")) {
        toast.error("Correo o contraseña incorrectos");
      } else {
        toast.error("Error al iniciar sesión. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Vendedor</h1>
          <p className="text-gray-500 mt-1 text-sm">Accede a tu tienda y gestiona tus ventas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="tu@negocio.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            icon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Contraseña"
            type={showPass ? "text" : "password"}
            placeholder="Tu contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            icon={<Lock className="w-4 h-4" />}
            iconRight={
              <button type="button" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            Acceder al Panel
          </Button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta de vendedor?{" "}
            <Link href="/crear-negocio" className="text-primary font-semibold hover:underline">
              Crear tu negocio
            </Link>
          </p>
          <div className="border-t pt-3">
            <p className="text-sm text-gray-500">
              ¿Eres comprador?{" "}
              <Link href="/login/comprador" className="text-gray-700 font-semibold hover:underline">
                Ingresa aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
