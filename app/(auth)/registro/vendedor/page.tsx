"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail, Lock, User, Eye, EyeOff, Phone, Store,
  MapPin, CreditCard, Smartphone, ChevronRight
} from "lucide-react";
import { registerUser } from "@/lib/services/auth.service";
import { createStore } from "@/lib/services/store.service";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { CATEGORIAS } from "@/lib/types";
import toast from "react-hot-toast";

type Step = 1 | 2 | 3;

const BANCOS = [
  "Bancolombia", "Davivienda", "Banco de Bogotá", "BBVA", "Nequi",
  "Daviplata", "Banco Popular", "Colpatria", "Itaú", "Otro",
].map((b) => ({ value: b, label: b }));

const TIPOS_CUENTA = [
  { value: "Ahorros", label: "Cuenta de Ahorros" },
  { value: "Corriente", label: "Cuenta Corriente" },
];

const METODOS_PAGO = [
  { value: "nequi", label: "Nequi" },
  { value: "daviplata", label: "Daviplata" },
  { value: "transferencia", label: "Transferencia bancaria" },
  { value: "contraentrega", label: "Pago contra entrega" },
];

export default function RegistroVendedorPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [userId, setUserId] = useState("");

  const [account, setAccount] = useState({
    nombre: "", email: "", password: "", confirm: "",
  });
  const [negocio, setNegocio] = useState({
    nombre: "", categoria: "", descripcion: "",
    ciudad: "", direccion: "", telefono: "",
  });
  const [pago, setPago] = useState({
    titular: "", banco: "", tipoCuenta: "", numeroCuenta: "",
    nequi: "", daviplata: "", metodoPreferido: "",
  });

  /* ── PASO 1: Crear cuenta ── */
  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account.nombre || !account.email || !account.password) {
      toast.error("Completa todos los campos"); return;
    }
    if (account.password.length < 6) {
      toast.error("La contraseña debe tener mínimo 6 caracteres"); return;
    }
    if (account.password !== account.confirm) {
      toast.error("Las contraseñas no coinciden"); return;
    }
    setLoading(true);
    try {
      const user = await registerUser(account.email, account.password, account.nombre, "vendedor");
      setUserId(user.id);
      setStep(2);
      toast.success("Cuenta creada. Ahora registra tu negocio");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("email-already-in-use")) toast.error("Este correo ya está registrado");
      else toast.error("Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  /* ── PASO 2: Datos del negocio ── */
  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!negocio.nombre || !negocio.categoria || !negocio.ciudad || !negocio.telefono) {
      toast.error("Completa los campos obligatorios"); return;
    }
    setStep(3);
  };

  /* ── PASO 3: Datos de pago + guardar ── */
  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pago.metodoPreferido) {
      toast.error("Selecciona un método de pago preferido"); return;
    }
    setLoading(true);
    try {
      await createStore({
        ownerId: userId,
        nombre: negocio.nombre,
        categoria: negocio.categoria,
        descripcion: negocio.descripcion,
        ciudad: negocio.ciudad,
        direccion: negocio.direccion,
        telefono: negocio.telefono,
        logo: `https://placehold.co/200x200/2D6A4F/ffffff?text=${encodeURIComponent(negocio.nombre[0])}`,
        activo: true,
        tags: [],
        // datos de pago guardados en el store
        // @ts-ignore — campo extendido
        datosPago: pago,
      });
      toast.success("¡Negocio registrado! Bienvenido a Marketplace Tolima 🎉");
      // Redirección automática al dashboard
      router.push("/vendedor/dashboard");
    } catch {
      toast.error("Error al registrar el negocio. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = ["Tu cuenta", "Tu negocio", "Datos de pago"];

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header con progreso */}
        <div className="bg-primary p-6 text-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Registrar mi negocio</h1>
              <p className="text-green-200 text-sm">Paso {step} de 3 — {stepLabels[step - 1]}</p>
            </div>
          </div>
          {/* Barra de progreso */}
          <div className="flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= n ? "bg-accent" : "bg-white/20"}`}
              />
            ))}
          </div>
        </div>

        <div className="p-7">
          {/* ── PASO 1 ── */}
          {step === 1 && (
            <>
              <h2 className="text-base font-bold text-gray-900 mb-5">Crea tu cuenta de vendedor</h2>
              <form onSubmit={handleStep1} className="space-y-4">
                <Input label="Nombre completo" placeholder="Tu nombre" value={account.nombre}
                  onChange={(e) => setAccount({ ...account, nombre: e.target.value })}
                  icon={<User className="w-4 h-4" />} />
                <Input label="Correo electrónico" type="email" placeholder="tu@negocio.com" value={account.email}
                  onChange={(e) => setAccount({ ...account, email: e.target.value })}
                  icon={<Mail className="w-4 h-4" />} />
                <Input label="Contraseña" type={showPass ? "text" : "password"} placeholder="Mínimo 6 caracteres"
                  value={account.password} onChange={(e) => setAccount({ ...account, password: e.target.value })}
                  icon={<Lock className="w-4 h-4" />}
                  iconRight={
                    <button type="button" onClick={() => setShowPass(!showPass)}>
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  } />
                <Input label="Confirmar contraseña" type="password" placeholder="Repite tu contraseña"
                  value={account.confirm} onChange={(e) => setAccount({ ...account, confirm: e.target.value })}
                  icon={<Lock className="w-4 h-4" />} />
                <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2"
                  icon={<ChevronRight className="w-4 h-4" />}>
                  Continuar
                </Button>
              </form>
            </>
          )}

          {/* ── PASO 2 ── */}
          {step === 2 && (
            <>
              <h2 className="text-base font-bold text-gray-900 mb-5">Datos de tu negocio</h2>
              <form onSubmit={handleStep2} className="space-y-4">
                <Input label="Nombre del negocio *" placeholder="Ej: Tienda Don Carlos" value={negocio.nombre}
                  onChange={(e) => setNegocio({ ...negocio, nombre: e.target.value })}
                  icon={<Store className="w-4 h-4" />} />
                <Select label="Categoría *" value={negocio.categoria}
                  onChange={(e) => setNegocio({ ...negocio, categoria: e.target.value })}
                  options={CATEGORIAS.map((c) => ({ value: c, label: c }))} />
                <Input label="Ciudad *" placeholder="Ibagué, Espinal, Melgar..." value={negocio.ciudad}
                  onChange={(e) => setNegocio({ ...negocio, ciudad: e.target.value })}
                  icon={<MapPin className="w-4 h-4" />} />
                <Input label="Dirección" placeholder="Cra 5 #12-34" value={negocio.direccion}
                  onChange={(e) => setNegocio({ ...negocio, direccion: e.target.value })}
                  icon={<MapPin className="w-4 h-4" />} />
                <Input label="Teléfono / WhatsApp *" placeholder="300 123 4567" value={negocio.telefono}
                  onChange={(e) => setNegocio({ ...negocio, telefono: e.target.value })}
                  icon={<Phone className="w-4 h-4" />} />
                <Textarea label="Descripción" placeholder="Cuéntanos sobre tu negocio..."
                  value={negocio.descripcion} onChange={(e) => setNegocio({ ...negocio, descripcion: e.target.value })} />
                <div className="flex gap-3">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">
                    ← Atrás
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1"
                    icon={<ChevronRight className="w-4 h-4" />}>
                    Continuar
                  </Button>
                </div>
              </form>
            </>
          )}

          {/* ── PASO 3 ── */}
          {step === 3 && (
            <>
              <h2 className="text-base font-bold text-gray-900 mb-1">Datos de pago</h2>
              <p className="text-sm text-gray-500 mb-5">
                Tus compradores usarán estos datos para pagarte directamente.
              </p>
              <form onSubmit={handleStep3} className="space-y-4">
                <Input label="Nombre del titular *" placeholder="Como aparece en la cuenta" value={pago.titular}
                  onChange={(e) => setPago({ ...pago, titular: e.target.value })}
                  icon={<User className="w-4 h-4" />} />

                <div className="grid grid-cols-2 gap-3">
                  <Select label="Banco" value={pago.banco}
                    onChange={(e) => setPago({ ...pago, banco: e.target.value })}
                    options={BANCOS} />
                  <Select label="Tipo de cuenta" value={pago.tipoCuenta}
                    onChange={(e) => setPago({ ...pago, tipoCuenta: e.target.value })}
                    options={TIPOS_CUENTA} />
                </div>

                <Input label="Número de cuenta" placeholder="Ej: 1234567890" value={pago.numeroCuenta}
                  onChange={(e) => setPago({ ...pago, numeroCuenta: e.target.value })}
                  icon={<CreditCard className="w-4 h-4" />} />

                <div className="grid grid-cols-2 gap-3">
                  <Input label="Número Nequi" placeholder="300 000 0000" value={pago.nequi}
                    onChange={(e) => setPago({ ...pago, nequi: e.target.value })}
                    icon={<Smartphone className="w-4 h-4" />} />
                  <Input label="Número Daviplata" placeholder="310 000 0000" value={pago.daviplata}
                    onChange={(e) => setPago({ ...pago, daviplata: e.target.value })}
                    icon={<Smartphone className="w-4 h-4" />} />
                </div>

                <Select label="Método preferido de pago *" value={pago.metodoPreferido}
                  onChange={(e) => setPago({ ...pago, metodoPreferido: e.target.value })}
                  options={METODOS_PAGO} />

                <div className="flex gap-3 pt-1">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">
                    ← Atrás
                  </Button>
                  <Button type="submit" variant="primary" size="lg" loading={loading} className="flex-1">
                    Registrar negocio 🎉
                  </Button>
                </div>
              </form>
            </>
          )}

          <p className="mt-5 text-center text-sm text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login/vendedor" className="text-primary font-semibold hover:underline">
              Ingresar
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
