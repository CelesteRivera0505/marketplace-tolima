export type UserRole = "comprador" | "vendedor";

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  telefono?: string;
  avatar?: string;
  storeName?: string;
  createdAt: Date;
}

export interface DatosPago {
  titular: string;
  banco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  nequi: string;
  daviplata: string;
  metodoPreferido: string;
}

export interface Store {
  id: string;
  ownerId: string;
  nombre: string;
  categoria: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  descripcion: string;
  logo: string;
  banner?: string;
  horario?: string;
  calificacion: number;
  totalReviews: number;
  activo: boolean;
  createdAt: Date;
  tags?: string[];
  datosPago?: DatosPago;
}

export interface Product {
  id: string;
  storeId: string;
  storeName?: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  categoria: string;
  activo: boolean;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

export type OrderStatus = "pendiente" | "confirmado" | "entregado" | "cancelado";

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerPhone?: string;
  sellerId: string;
  storeId: string;
  storeName: string;
  products: OrderItem[];
  total: number;
  status: OrderStatus;
  direccionEntrega?: string;
  notas?: string;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  cantidad: number;
}

export const CATEGORIAS = [
  "Tecnología",
  "Ropa",
  "Hogar",
  "Comida",
  "Belleza",
  "Papelería",
  "Ferretería",
  "Mascotas",
  "Salud",
  "Deportes",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];
