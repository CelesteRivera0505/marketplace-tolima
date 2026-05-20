"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, CreditCard, Smartphone, Banknote, Truck,
  CheckCircle, Copy, MessageCircle, ShieldCheck
} from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useAuth } from "@/lib/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import toast from "react-hot-toast";

type PayMethod = "transferencia" | "nequi" | "daviplata" | "contraentrega";

// Datos bancarios demo del vendedor (en producción vienen de Firestore)
const VENDOR_PAYMENT = {
  nombre: "Carlos Andrés Pérez",
  banco: "Bancolombia",
  tipoCuenta: "Ahorros",
  numeroCuenta: "•••• •••• 4521",
  nequi: "300 123 4567",
  daviplata: "310 987 6543",
  metodoPreferido: "nequi" as PayMethod,
};

const METHODS = [
  { id: "nequi" as PayMethod,         label: "Nequi",                icon: Smartphone, color: "border-purple-400 bg-purple-50",  active: "border-purple-600 bg-purple-100" },
  { id: "daviplata" as PayMethod,     label: "Daviplata",            icon: Smartphone, color: "border-red-300 bg-red-50",         active: "border-red-500 bg-red-100" },
  { id: "transferencia" as PayMethod, label: "Transferencia bancaria",icon: CreditCard, color: "border-blue-300 bg-blue-50",      active: "border-blue-500 bg-blue-100" },
  { id: "contraentrega" as PayMethod, label: "Pago contra entrega",  icon: Truck,      color: "border-green-300 bg-green-50",     active: "border-green-500 bg-green-100" },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [method, setMethod] = useState<PayMethod>("nequi");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [comprobante, setComprobante] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (method !== "contraentrega" && !comprobante.trim()) {
      toast.error("Ingresa el número de comprobante o referencia");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep(3);
    clearCart();
    toast.success("¡Pedido confirmado!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado al portapapeles");
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
            <Link href="/"><Button variant="primary">Ir al marketplace</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/carrito" className="flex items-center gap-1 text-gray-500 hover:text-primary text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> Carrito
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-semibold text-primary">Checkout</span>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-2 mb-8">
            {[
              { n: 1, label: "Método de pago" },
              { n: 2, label: "Confirmar pago" },
              { n: 3, label: "Pedido listo" },
            ].map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= s.n ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {step > s.n ? <CheckCircle className="w-4 h-4" /> : s.n}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${step >= s.n ? "text-primary" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 ${step > s.n ? "bg-primary" : "bg-gray-200"}`} />}
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* PASO 1 — Elegir método */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Métodos */}
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-5">Elige cómo pagar</h2>
                  <div className="space-y-3">
                    {METHODS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          method === m.id ? m.active : m.color
                        }`}
                      >
                        <m.icon className="w-5 h-5 flex-shrink-0 text-gray-700" />
                        <span className="font-medium text-gray-800 text-sm">{m.label}</span>
                        {method === m.id && (
                          <CheckCircle className="w-4 h-4 text-primary ml-auto" />
                        )}
                        {m.id === VENDOR_PAYMENT.metodoPreferido && (
                          <span className="ml-auto text-xs bg-primary text-white px-2 py-0.5 rounded-full font-medium">
                            Preferido
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mt-6"
                    onClick={() => setStep(2)}
                  >
                    Continuar →
                  </Button>
                </div>

                {/* Resumen */}
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen del pedido</h2>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-2">
                          {item.product.nombre} × {item.cantidad}
                        </span>
                        <span className="font-semibold text-gray-900 flex-shrink-0">
                          {formatPrice(item.product.precio * item.cantidad)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-gray-900">
                    <span>Total a pagar</span>
                    <span className="text-xl text-primary">{formatPrice(total)}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 bg-green-50 rounded-lg p-3">
                    <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    Pago directo al vendedor. Sin intermediarios.
                  </div>
                </div>
              </motion.div>
            )}

            {/* PASO 2 — Datos de pago */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Datos del vendedor */}
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Datos de pago</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Realiza el pago a los datos del vendedor
                  </p>

                  <div className="bg-green-50 rounded-xl p-4 mb-5 border border-border">
                    <p className="text-xs text-gray-500 mb-1">Titular</p>
                    <p className="font-bold text-gray-900">{VENDOR_PAYMENT.nombre}</p>
                  </div>

                  {method === "nequi" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-purple-50 rounded-xl p-4 border border-purple-200">
                        <div>
                          <p className="text-xs text-gray-500">Número Nequi</p>
                          <p className="font-bold text-gray-900 text-lg">{VENDOR_PAYMENT.nequi}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(VENDOR_PAYMENT.nequi)}
                          className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4 text-purple-600" />
                        </button>
                      </div>
                      {/* QR simulado */}
                      <div className="flex flex-col items-center bg-white border border-border rounded-xl p-4">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                          <div className="grid grid-cols-5 gap-0.5">
                            {Array(25).fill(0).map((_, i) => (
                              <div key={i} className={`w-5 h-5 rounded-sm ${Math.random() > 0.5 ? "bg-gray-800" : "bg-white"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">Escanea con Nequi</p>
                      </div>
                    </div>
                  )}

                  {method === "daviplata" && (
                    <div className="flex items-center justify-between bg-red-50 rounded-xl p-4 border border-red-200">
                      <div>
                        <p className="text-xs text-gray-500">Número Daviplata</p>
                        <p className="font-bold text-gray-900 text-lg">{VENDOR_PAYMENT.daviplata}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(VENDOR_PAYMENT.daviplata)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  )}

                  {method === "transferencia" && (
                    <div className="space-y-3">
                      {[
                        { label: "Banco", value: VENDOR_PAYMENT.banco },
                        { label: "Tipo de cuenta", value: VENDOR_PAYMENT.tipoCuenta },
                        { label: "Número de cuenta", value: VENDOR_PAYMENT.numeroCuenta },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between items-center bg-blue-50 rounded-xl p-3 border border-blue-200">
                          <div>
                            <p className="text-xs text-gray-500">{row.label}</p>
                            <p className="font-semibold text-gray-900">{row.value}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(row.value)}
                            className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5 text-blue-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {method === "contraentrega" && (
                    <div className="bg-green-50 rounded-xl p-4 border border-border text-center">
                      <Truck className="w-10 h-10 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">Pago al recibir</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Pagas en efectivo cuando el vendedor entregue tu pedido.
                      </p>
                    </div>
                  )}
                </div>

                {/* Comprobante */}
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Confirmar pago</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Total: <span className="font-bold text-primary text-base">{formatPrice(total)}</span>
                  </p>

                  {method !== "contraentrega" ? (
                    <div className="space-y-4">
                      <Input
                        label="Número de comprobante / referencia"
                        placeholder="Ej: 123456789"
                        value={comprobante}
                        onChange={(e) => setComprobante(e.target.value)}
                      />
                      <p className="text-xs text-gray-400">
                        Ingresa el número de referencia que aparece en tu app de pagos después de transferir.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-50 rounded-xl p-4 border border-border mb-4">
                      <p className="text-sm text-gray-600">
                        Al confirmar, el vendedor recibirá tu pedido y coordinará la entrega contigo.
                      </p>
                    </div>
                  )}

                  <div className="mt-6 space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      loading={loading}
                      onClick={handleConfirm}
                      icon={<CheckCircle className="w-5 h-5" />}
                    >
                      Confirmar pedido
                    </Button>
                    <Button
                      variant="ghost"
                      size="md"
                      className="w-full"
                      onClick={() => setStep(1)}
                    >
                      ← Cambiar método
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PASO 3 — Confirmación */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg mx-auto"
              >
                <div className="card p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </motion.div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido confirmado!</h2>
                  <p className="text-gray-500 mb-6">
                    Tu pedido ha sido registrado. El vendedor lo revisará y se pondrá en contacto contigo.
                  </p>

                  {/* Comprobante */}
                  <div className="bg-green-50 rounded-xl p-5 border border-border mb-6 text-left">
                    <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wide">Comprobante</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Número de pedido</span>
                        <span className="font-bold text-gray-900">#MT{Date.now().toString().slice(-6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Método de pago</span>
                        <span className="font-semibold text-gray-900 capitalize">{method}</span>
                      </div>
                      {comprobante && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Referencia</span>
                          <span className="font-semibold text-gray-900">{comprobante}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-border pt-2 mt-2">
                        <span className="font-bold text-gray-900">Total pagado</span>
                        <span className="font-bold text-primary text-base">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/573001234567?text=Hola, acabo de hacer un pedido en Marketplace Tolima. Referencia: ${comprobante || "contra entrega"}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="whatsapp" size="lg" className="w-full" icon={<MessageCircle className="w-5 h-5" />}>
                        Contactar vendedor
                      </Button>
                    </a>
                    <Link href="/" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full">
                        Seguir comprando
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
