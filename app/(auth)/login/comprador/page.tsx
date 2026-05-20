"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ShoppingBag } from "lucide-react";
import { loginUser } from "@/lib/services/auth.service";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

function LoginCompradorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";
  const { setUserDirectly } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email) e.email = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Correo inválido";
    if (!form.password) e.password = "La contraseña es requerida";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await loginUser(form.email.trim().toLowerCase(), form.password);
      if (user.rol !== "comprador") {
        toast.error("Esta cuenta es de vendedor. Usa el login de vendedor.");
        return;
      }
      setUserDirectly(user);
      toast.success(`¡Bienvenido, ${user.nombre.split(" ")[0]}!`);
      router.push(redirectTo);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("user-not-found") || msg.includes("wrong-password") || msg.includes("invalid-credential")) {
        toast.error("Correo o contraseña incorrectos");
      } else {
        toast.error("Error al iniciar sesión. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Ingresar como Comprador</h1>
          <p className="text-gray-500 mt-1 text-sm">Accede a tu cuenta para comprar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="tu@correo.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            icon={<Mail className="w-4 h-4" />}
            error={errors.email}
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
            error={errors.password}
          />

          <Button type="submit" variant="secondary" size="lg" loading={loading} className="w-full">
            Ingresar
          </Button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link href="/registro/comprador" className="text-secondary font-semibold hover:underline">
              Regístrate gratis
            </Link>
          </p>
          <div className="border-t pt-3">
            <p className="text-sm text-gray-500">
              ¿Eres vendedor?{" "}
              <Link href="/login/vendedor" className="text-gray-700 font-semibold hover:underline">
                Ingresa aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LoginCompradorPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    }>
      <LoginCompradorForm />
    </Suspense>
  );
}
