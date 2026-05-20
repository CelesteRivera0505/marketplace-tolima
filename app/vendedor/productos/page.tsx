"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Search, Package,
  AlertTriangle, ToggleLeft, ToggleRight, Eye
} from "lucide-react";
import { DEMO_PRODUCTS, formatPrice } from "@/lib/utils";
import { Product } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { CATEGORIAS } from "@/lib/types";
import toast from "react-hot-toast";

const INITIAL: Product[] = DEMO_PRODUCTS as Product[];

const EMPTY_FORM = { nombre:"", precio:"", descripcion:"", imagen:"", stock:"", categoria:"" };

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL);
  const [search,   setSearch]   = useState("");
  const [catFilter,setCatFilter]= useState("");
  const [modal,    setModal]    = useState(false);
  const [delId,    setDelId]    = useState<string|null>(null);
  const [editing,  setEditing]  = useState<Product|null>(null);
  const [form,     setForm]     = useState(EMPTY_FORM);

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    const matchQ = p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q);
    const matchC = catFilter ? p.categoria === catFilter : true;
    return matchQ && matchC;
  });

  const openNew = () => {
    setEditing(null); setForm(EMPTY_FORM); setModal(true);
  };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ nombre:p.nombre, precio:String(p.precio), descripcion:p.descripcion,
              imagen:p.imagen, stock:String(p.stock), categoria:p.categoria });
    setModal(true);
  };

  const handleSave = () => {
    if (!form.nombre || !form.precio || !form.categoria) {
      toast.error("Nombre, precio y categoría son obligatorios"); return;
    }
    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing.id
        ? { ...p, ...form, precio:Number(form.precio), stock:Number(form.stock) } : p));
      toast.success("Producto actualizado ✓");
    } else {
      const np: Product = {
        id: `p${Date.now()}`, storeId:"my-store", storeName:"Mi Tienda",
        nombre:form.nombre, precio:Number(form.precio), descripcion:form.descripcion,
        imagen:form.imagen || "https://placehold.co/300x300/2D6A4F/ffffff?text=Producto",
        stock:Number(form.stock)||0, categoria:form.categoria, activo:true, createdAt:new Date(),
      };
      setProducts(prev => [np, ...prev]);
      toast.success("Producto creado ✓");
    }
    setModal(false);
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDelId(null); toast.success("Producto eliminado");
  };

  const toggleActive = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, activo:!p.activo } : p));
  };

  const cats = Array.from(new Set(products.map(p => p.categoria)));

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Productos</h1>
          <p className="text-gray-500 text-sm mt-0.5">{products.length} productos en tu catálogo</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={openNew}>
          Nuevo producto
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-card border border-gray-50 p-4 flex flex-col sm:flex-row gap-3">
        <Input placeholder="Buscar por nombre o categoría..." value={search}
          onChange={e => setSearch(e.target.value)} icon={<Search className="w-4 h-4" />} className="flex-1" />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          className="input-field sm:w-48">
          <option value="">Todas las categorías</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-card border border-gray-50 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No hay productos</p>
            <p className="text-gray-400 text-sm mt-1">Crea tu primer producto para empezar a vender</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  {["Producto","Categoría","Precio","Stock","Estado","Acciones"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {filtered.map(p => (
                    <motion.tr key={p.id} layout initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.imagen} alt={p.nombre}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-100" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 truncate max-w-[160px]">{p.nombre}</p>
                            <p className="text-xs text-gray-400 truncate max-w-[160px]">{p.descripcion}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs bg-green-100 text-primary px-2 py-0.5 rounded-full font-medium">{p.categoria}</span>
                      </td>
                      <td className="px-5 py-3 text-sm font-bold text-gray-900">{formatPrice(p.precio)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-sm font-semibold ${p.stock <= 5 ? "text-orange-500" : "text-gray-700"}`}>
                          {p.stock} {p.stock <= 5 && p.stock > 0 && <span className="text-xs text-orange-400">¡Bajo!</span>}
                          {p.stock === 0 && <span className="text-xs text-red-500">Agotado</span>}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button onClick={() => toggleActive(p.id)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                            p.activo ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                     : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}>
                          {p.activo ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                          {p.activo ? "Activo" : "Inactivo"}
                        </button>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(p)}
                            className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors text-gray-400"
                            title="Editar">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDelId(p.id)}
                            className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-gray-400"
                            title="Eliminar">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal crear/editar */}
      <Modal open={modal} onClose={() => setModal(false)}
        title={editing ? "Editar producto" : "Nuevo producto"} size="lg">
        <div className="space-y-4">
          <Input label="Nombre del producto *" placeholder="Ej: Arroz Diana 500g" value={form.nombre}
            onChange={e => setForm({...form, nombre:e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Precio (COP) *" type="number" placeholder="15000" value={form.precio}
              onChange={e => setForm({...form, precio:e.target.value})} />
            <Input label="Stock disponible" type="number" placeholder="50" value={form.stock}
              onChange={e => setForm({...form, stock:e.target.value})} />
          </div>
          <Select label="Categoría *" value={form.categoria}
            onChange={e => setForm({...form, categoria:e.target.value})}
            options={CATEGORIAS.map(c => ({ value:c, label:c }))} />
          <Input label="URL de imagen" placeholder="https://..." value={form.imagen}
            onChange={e => setForm({...form, imagen:e.target.value})} />
          <Textarea label="Descripción" placeholder="Describe tu producto..." value={form.descripcion}
            onChange={e => setForm({...form, descripcion:e.target.value})} />
          <div className="flex gap-3 pt-1">
            <Button variant="ghost" onClick={() => setModal(false)} className="flex-1">Cancelar</Button>
            <Button variant="primary" onClick={handleSave} className="flex-1">
              {editing ? "Guardar cambios" : "Crear producto"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal eliminar */}
      <Modal open={!!delId} onClose={() => setDelId(null)} title="Eliminar producto" size="sm">
        <div className="text-center">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <p className="text-gray-700 mb-6 text-sm">
            ¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setDelId(null)} className="flex-1">Cancelar</Button>
            <Button variant="danger" onClick={() => delId && handleDelete(delId)} className="flex-1">
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
