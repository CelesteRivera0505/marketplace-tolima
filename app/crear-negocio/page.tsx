"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Lock, Phone, CreditCard, Store, MapPin,
  Clock, Eye, EyeOff, ChevronRight, CheckCircle,
  Smartphone, Building2, FileText, Camera, Sparkles
} from "lucide-react";
import { registerUser } from "@/lib/services/auth.service";
import { createStore } from "@/lib/services/store.service";
import { useAuth } from "@/lib/context/AuthContext";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CATEGORIAS, DatosPago } from "@/lib/types";
import toast from "react-hot-toast";

type Step = 1 | 2 | 3;

const BANCOS = [
  "Bancolombia", "Davivienda", "Banco de Bogotá", "BBVA", "Banco Popular",
  "Colpatria", "Itaú", "Nequi", "Daviplata", "Otro",
].map((b) => ({ value: b, label: b }));

const TIPOS_CUENTA = [
  { value: "Ahorros",   label: "Cuenta de Ahorros" },
  { value: "Corriente", label: "Cuenta Corriente" },
];

const METODOS_PAGO = [
  { value: "nequi",         label: "Nequi" },
  { value: "daviplata",     label: "Daviplata" },
  { value: "transferencia", label: "Transferencia bancaria" },
  { value: "contraentrega", label: "Pago contra entrega" },
];

const CIUDADES = [
  "Ibagué", "Espinal", "Melgar", "Honda", "Líbano", "Chaparral", "Neiva", "Otro",
].map((c) => ({ value: c, label: c }));

const STEP_INFO = [
  { n: 1, label: "Datos personales",  icon: User },
  { n: 2, label: "Tu negocio",        icon: Store },
  { n: 3, label: "Datos financieros", icon: CreditCard },
];

export default function CrearNegocioPage() {
  const router = useRouter();
  const { setUserDirectly } = useAuth();

  const [step, setStep]       = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [userId, setUserId]   = useState("");

  const [personal, setPersonal] = useState({
    nombre: "", email: "", password: "", confirm: "",
    telefono: "", documento: "",
  });
  const [negocio, setNegocio] = useState({
    nombre: "", categoria: "", descripcion: "",
    direccion: "", ciudad: "", horario: "",
    logo: "", banner: "",
  });
  const [financiero, setFinanciero] = useState<DatosPago>({
    titular: "", banco: "", tipoCuenta: "", numeroCuenta: "",
    nequi: "", daviplata: "", metodoPreferido: "",
  });

  const setP = (k: keyof typeof personal, v: string) =>
    setPersonal((prev) => ({ ...prev, [k]: v }));
  const setN = (k: keyof typeof negocio, v: string) =>
    setNegocio((prev) => ({ ...prev, [k]: v }));
  const setF = (k: keyof DatosPago, v: string) =>
    setFinanciero((prev) => ({ ...prev, [k]: v }));

  /* ── PASO 1: Crear cuenta ── */
  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!personal.nombre.trim()) { toast.error("El nombre es obligatorio"); return; }
    if (!personal.email.trim())  { toast.error("El correo es obligatorio"); return; }
    if (!/\S+@\S+\.\S+/.test(personal.email)) { toast.error("Correo inválido"); return; }
    if (!personal.telefono.trim()) { toast.error("El teléfono es obligatorio"); return; }
    if (!personal.password)      { toast.error("La contraseña es obligatoria"); return; }
    if (personal.password.length < 6) { toast.error("La contraseña debe tener mínimo 6 caracteres"); return; }
    if (personal.password !== personal.confirm) { toast.error("Las contraseñas no coinciden"); return; }

    setLoading(true);
    try {
      const user = await registerUser(
        personal.email.trim().toLowerCase(),
        personal.password,
        personal.nombre.trim(),
        "vendedor",
        personal.telefono.trim()
      );
      setUserId(user.id);
      // Inyectar usuario en el contexto inmediatamente
      setUserDirectly(user);
      setStep(2);
      toast.success("Cuenta creada ✓ Ahora configura tu negocio");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("email-already-in-use") || msg.includes("already-in-use")) {
        toast.error("Este correo ya está registrado. ¿Quieres iniciar sesión?");
      } else if (msg.includes("invalid-email")) {
        toast.error("El correo no es válido");
      } else if (msg.includes("weak-password")) {
        toast.error("La contraseña es muy débil");
      } else {
        toast.error("Error al crear la cuenta. Intenta de nuevo.");
        console.error("Register error:", msg);
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── PASO 2: Datos del negocio ── */
  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!negocio.nombre.trim())    { toast.error("El nombre del negocio es obligatorio"); return; }
    if (!negocio.categoria)        { toast.error("Selecciona una categoría"); return; }
    if (!negocio.ciudad)           { toast.error("Selecciona una ciudad"); return; }
    setStep(3);
  };

  /* ── PASO 3: Datos financieros + guardar todo ── */
  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!financiero.metodoPreferido) {
      toast.error("Selecciona un método de pago preferido"); return;
    }

    setLoading(true);
    try {
      const logoUrl = negocio.logo.trim() ||
        `https://placehold.co/200x200/2D6A4F/ffffff?text=${encodeURIComponent(negocio.nombre[0]?.toUpperCase() ?? "T")}`;

      await createStore({
        ownerId: userId,
        nombre: negocio.nombre.trim(),
        categoria: negocio.categoria,
        descripcion: negocio.descripcion.trim(),
        ciudad: negocio.ciudad,
        direccion: negocio.direccion.trim(),
        telefono: personal.telefono.trim(),
        logo: logoUrl,
        banner: negocio.banner.trim() || undefined,
        horario: negocio.horario.trim() || undefined,
        activo: true,
        tags: [],
        datosPago: financiero,
      });

      toast.success("¡Negocio creado exitosamente! Bienvenido a Marketplace Tolima 🎉", {
        duration: 4000,
      });

      // Pequeña pausa para que el toast sea visible
      await new Promise((r) => setTimeout(r, 500));

      router.push("/vendedor/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Create store error:", msg);
      toast.error("Error al registrar el negocio. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Top bar */}
      <header className="bg-primary px-6 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div className="leading-none">
              <span className="font-bold text-white text-sm block">Marketplace</span>
              <span className="text-accent text-xs">Tolima</span>
            </div>
          </Link>
          <Link href="/login/vendedor" className="text-green-200 hover:text-white text-sm transition-colors">
            ¿Ya tienes cuenta? Ingresar
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" /> Gratis · Sin comisiones · Fácil
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Crea tu negocio en Marketplace Tolima
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Llega a miles de compradores en Ibagué, Espinal y Melgar. Configura tu tienda en minutos.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {STEP_INFO.map((s, i) => (
            <React.Fragment key={s.n}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step > s.n   ? "bg-primary text-white" :
                  step === s.n ? "bg-primary text-white ring-4 ring-primary/20" :
                                 "bg-gray-100 text-gray-400"
                }`}>
                  {step > s.n ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step >= s.n ? "text-primary" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEP_INFO.length - 1 && (
                <div className={`h-0.5 w-16 md:w-28 mx-1 mb-5 transition-all duration-300 ${step > s.n ? "bg-primary" : "bg-gray-200"}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Formularios */}
        <AnimatePresence mode="wait">

          {/* ── PASO 1 ── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="bg-white rounded-2xl shadow-card p-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Datos personales</h2>
                    <p className="text-sm text-gray-500">Información del propietario del negocio</p>
                  </div>
                </div>
                <form onSubmit={handleStep1} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nombre completo *"
                      placeholder="Tu nombre completo"
                      value={personal.nombre}
                      onChange={(e) => setP("nombre", e.target.value)}
                      icon={<User className="w-4 h-4" />}
                    />
                    <Input
                      label="Documento de identidad"
                      placeholder="CC / NIT"
                      value={personal.documento}
                      onChange={(e) => setP("documento", e.target.value)}
                      icon={<FileText className="w-4 h-4" />}
                    />
                  </div>
                  <Input
                    label="Correo electrónico *"
                    type="email"
                    placeholder="tu@negocio.com"
                    value={personal.email}
                    onChange={(e) => setP("email", e.target.value)}
                    icon={<Mail className="w-4 h-4" />}
                  />
                  <Input
                    label="Teléfono / WhatsApp *"
                    placeholder="300 123 4567"
                    value={personal.telefono}
                    onChange={(e) => setP("telefono", e.target.value)}
                    icon={<Phone className="w-4 h-4" />}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Contraseña *"
                      type={showPass ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={personal.password}
                      onChange={(e) => setP("password", e.target.value)}
                      icon={<Lock className="w-4 h-4" />}
                      iconRight={
                        <button type="button" onClick={() => setShowPass(!showPass)}>
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                    />
                    <Input
                      label="Confirmar contraseña *"
                      type="password"
                      placeholder="Repite tu contraseña"
                      value={personal.confirm}
                      onChange={(e) => setP("confirm", e.target.value)}
                      icon={<Lock className="w-4 h-4" />}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full mt-2"
                    icon={<ChevronRight className="w-5 h-5" />}
                  >
                    Continuar al paso 2
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ── PASO 2 ── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="bg-white rounded-2xl shadow-card p-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Store className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Tu negocio</h2>
                    <p className="text-sm text-gray-500">Información que verán tus clientes</p>
                  </div>
                </div>
                <form onSubmit={handleStep2} className="space-y-4">
                  <Input
                    label="Nombre del negocio *"
                    placeholder="Ej: Tienda Don Carlos"
                    value={negocio.nombre}
                    onChange={(e) => setN("nombre", e.target.value)}
                    icon={<Store className="w-4 h-4" />}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Categoría *"
                      value={negocio.categoria}
                      onChange={(e) => setN("categoria", e.target.value)}
                      options={CATEGORIAS.map((c) => ({ value: c, label: c }))}
                    />
                    <Select
                      label="Ciudad *"
                      value={negocio.ciudad}
                      onChange={(e) => setN("ciudad", e.target.value)}
                      options={CIUDADES}
                    />
                  </div>
                  <Input
                    label="Dirección"
                    placeholder="Cra 5 #12-34, Barrio..."
                    value={negocio.direccion}
                    onChange={(e) => setN("direccion", e.target.value)}
                    icon={<MapPin className="w-4 h-4" />}
                  />
                  <Input
                    label="Horario de atención"
                    placeholder="Lun-Sáb 8am-6pm"
                    value={negocio.horario}
                    onChange={(e) => setN("horario", e.target.value)}
                    icon={<Clock className="w-4 h-4" />}
                  />
                  <Textarea
                    label="Descripción del negocio"
                    placeholder="Cuéntales a tus clientes qué vendes..."
                    value={negocio.descripcion}
                    onChange={(e) => setN("descripcion", e.target.value)}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="URL del logo"
                      placeholder="https://..."
                      value={negocio.logo}
                      onChange={(e) => setN("logo", e.target.value)}
                      icon={<Camera className="w-4 h-4" />}
                    />
                    <Input
                      label="URL del banner"
                      placeholder="https://..."
                      value={negocio.banner}
                      onChange={(e) => setN("banner", e.target.value)}
                      icon={<Camera className="w-4 h-4" />}
                    />
                  </div>
                  <div className="flex gap-3 pt-1">
                    <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">
                      ← Atrás
                    </Button>
                    <Button type="submit" variant="primary" size="lg" className="flex-1"
                      icon={<ChevronRight className="w-5 h-5" />}>
                      Continuar al paso 3
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* ── PASO 3 ── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="bg-white rounded-2xl shadow-card p-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Datos financieros</h2>
                    <p className="text-sm text-gray-500">Tus compradores usarán estos datos para pagarte</p>
                  </div>
                </div>
                <form onSubmit={handleStep3} className="space-y-4">
                  <Input
                    label="Nombre del titular *"
                    placeholder="Como aparece en la cuenta"
                    value={financiero.titular}
                    onChange={(e) => setF("titular", e.target.value)}
                    icon={<User className="w-4 h-4" />}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Banco"
                      value={financiero.banco}
                      onChange={(e) => setF("banco", e.target.value)}
                      options={BANCOS}
                    />
                    <Select
                      label="Tipo de cuenta"
                      value={financiero.tipoCuenta}
                      onChange={(e) => setF("tipoCuenta", e.target.value)}
                      options={TIPOS_CUENTA}
                    />
                  </div>
                  <Input
                    label="Número de cuenta"
                    placeholder="Ej: 1234567890"
                    value={financiero.numeroCuenta}
                    onChange={(e) => setF("numeroCuenta", e.target.value)}
                    icon={<Building2 className="w-4 h-4" />}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Número Nequi"
                      placeholder="300 000 0000"
                      value={financiero.nequi}
                      onChange={(e) => setF("nequi", e.target.value)}
                      icon={<Smartphone className="w-4 h-4" />}
                    />
                    <Input
                      label="Número Daviplata"
                      placeholder="310 000 0000"
                      value={financiero.daviplata}
                      onChange={(e) => setF("daviplata", e.target.value)}
                      icon={<Smartphone className="w-4 h-4" />}
                    />
                  </div>
                  <Select
                    label="Método preferido de pago *"
                    value={financiero.metodoPreferido}
                    onChange={(e) => setF("metodoPreferido", e.target.value)}
                    options={METODOS_PAGO}
                  />

                  <div className="bg-green-50 rounded-xl p-4 border border-border text-sm text-gray-600">
                    🔒 Tus datos financieros están protegidos y solo se comparten con compradores al momento del pago.
                  </div>

                  <div className="flex gap-3 pt-1">
                    <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">
                      ← Atrás
                    </Button>
                    <Button type="submit" variant="primary" size="lg" loading={loading} className="flex-1">
                      {loading ? "Creando negocio..." : "Crear negocio 🎉"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-2xl mx-auto">
          {[
            { icon: "🚀", title: "Gratis para siempre", desc: "Sin costos de registro ni mensualidades" },
            { icon: "📦", title: "CRUD de productos",   desc: "Agrega, edita y elimina productos fácilmente" },
            { icon: "💳", title: "Pagos directos",      desc: "Recibe pagos por Nequi, Daviplata o transferencia" },
          ].map((b) => (
            <div key={b.title} className="bg-white rounded-xl p-4 border border-border text-center">
              <div className="text-2xl mb-2">{b.icon}</div>
              <p className="font-semibold text-gray-900 text-sm">{b.title}</p>
              <p className="text-xs text-gray-500 mt-1">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
