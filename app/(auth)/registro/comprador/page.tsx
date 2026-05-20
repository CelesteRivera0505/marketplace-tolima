"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Phone, ShoppingBag } from "lucide-react";
import { registerUser } from "@/lib/services/auth.service";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function RegistroCompradorPage() {
  const router = useRouter();
  const { setUserDirectly } = useAuth();
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es requerido";
    if (!form.email) e.email = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Correo inválido";
    if (!form.password) e.password = "La contraseña es requerida";
    else if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    if (form.password !== form.confirm) e.confirm = "Las contraseñas no coinciden";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await registerUser(form.email, form.password, form.nombre, "comprador");
      setUserDirectly(user);
      toast.success("¡Cuenta creada! Bienvenido a Marketplace Tolima");
      router.push("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("email-already-in-use")) toast.error("Este correo ya está registrado");
      else toast.error("Error al crear la cuenta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Crear cuenta de Comprador</h1>
          <p className="text-gray-500 mt-1 text-sm">Gratis y sin complicaciones</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nombre completo" placeholder="Tu nombre" value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            icon={<User className="w-4 h-4" />} error={errors.nombre} />
          <Input label="Correo electrónico" type="email" placeholder="tu@correo.com" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            icon={<Mail className="w-4 h-4" />} error={errors.email} />
          <Input label="Teléfono (opcional)" type="tel" placeholder="300 123 4567" value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            icon={<Phone className="w-4 h-4" />} />
          <Input label="Contraseña" type={showPass ? "text" : "password"} placeholder="Mínimo 6 caracteres"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            icon={<Lock className="w-4 h-4" />}
            iconRight={<button type="button" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>}
            error={errors.password} />
          <Input label="Confirmar contraseña" type="password" placeholder="Repite tu contraseña"
            value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            icon={<Lock className="w-4 h-4" />} error={errors.confirm} />

          <Button type="submit" variant="secondary" size="lg" loading={loading} className="w-full mt-2">
            Crear mi cuenta
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login/comprador" className="text-secondary font-semibold hover:underline">Ingresar</Link>
        </p>
      </div>
    </motion.div>
  );
}
