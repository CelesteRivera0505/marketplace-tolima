import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CATEGORIAS } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Normaliza un texto para búsqueda: minúsculas + sin tildes/acentos.
 * Permite que "cafe" encuentre "Café", "PAN" encuentre "panadería", etc.
 */
export function normalizeSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // elimina diacríticos (tildes, diéresis, etc.)
}

export function getCategoryFromSlug(slug: string): string | null {
  const match = CATEGORIAS.find((category) => slugify(category) === slug);
  return match ?? null;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function generateWhatsAppMessage(
  storeName: string,
  storePhone: string,
  items: { nombre: string; cantidad: number; precio: number }[],
  total: number
): string {
  const itemsList = items
    .map((i) => `- ${i.nombre} x${i.cantidad}: ${formatPrice(i.precio * i.cantidad)}`)
    .join("\n");
  const message = `Hola! Quiero hacer un pedido desde Marketplace Tolima\n\nTienda: ${storeName}\n\nProductos:\n${itemsList}\n\nTotal: ${formatPrice(total)}\n\nEsta disponible?`;
  return `https://wa.me/${storePhone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pendiente: "bg-yellow-100 text-yellow-800",
    confirmado: "bg-blue-100 text-blue-800",
    entregado: "bg-green-100 text-green-800",
    cancelado: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pendiente: "Pendiente",
    confirmado: "Confirmado",
    entregado: "Entregado",
    cancelado: "Cancelado",
  };
  return labels[status] || status;
}

// -------------------------------------------------------------
// GALERÍA POR TIENDA
// Imágenes de picsum.photos con seeds únicos por negocio
// -------------------------------------------------------------
export const STORE_GALLERIES: Record<string, string[]> = {
  "minimercado-1": [
    "https://picsum.photos/seed/mini-g1/800/600",
    "https://picsum.photos/seed/mini-g2/800/600",
    "https://picsum.photos/seed/mini-g3/800/600",
    "https://picsum.photos/seed/mini-g4/800/600",
  ],
  "panaderia-1": [
    "https://picsum.photos/seed/pan-g1/800/600",
    "https://picsum.photos/seed/pan-g2/800/600",
    "https://picsum.photos/seed/pan-g3/800/600",
    "https://picsum.photos/seed/pan-g4/800/600",
  ],
  "ropa-1": [
    "https://picsum.photos/seed/ropa-g1/800/600",
    "https://picsum.photos/seed/ropa-g2/800/600",
    "https://picsum.photos/seed/ropa-g3/800/600",
    "https://picsum.photos/seed/ropa-g4/800/600",
  ],
  "ferreteria-1": [
    "https://picsum.photos/seed/ferr-g1/800/600",
    "https://picsum.photos/seed/ferr-g2/800/600",
    "https://picsum.photos/seed/ferr-g3/800/600",
    "https://picsum.photos/seed/ferr-g4/800/600",
  ],
  "farmacia-1": [
    "https://picsum.photos/seed/farm-g1/800/600",
    "https://picsum.photos/seed/farm-g2/800/600",
    "https://picsum.photos/seed/farm-g3/800/600",
    "https://picsum.photos/seed/farm-g4/800/600",
  ],
  "papeleria-1": [
    "https://picsum.photos/seed/papel-g1/800/600",
    "https://picsum.photos/seed/papel-g2/800/600",
    "https://picsum.photos/seed/papel-g3/800/600",
    "https://picsum.photos/seed/papel-g4/800/600",
  ],
  "tecnologia-1": [
    "https://picsum.photos/seed/tech-g1/800/600",
    "https://picsum.photos/seed/tech-g2/800/600",
    "https://picsum.photos/seed/tech-g3/800/600",
    "https://picsum.photos/seed/tech-g4/800/600",
  ],
  "belleza-1": [
    "https://picsum.photos/seed/bell-g1/800/600",
    "https://picsum.photos/seed/bell-g2/800/600",
    "https://picsum.photos/seed/bell-g3/800/600",
    "https://picsum.photos/seed/bell-g4/800/600",
  ],
};

// -------------------------------------------------------------
// TIENDAS DEMO
// -------------------------------------------------------------
export const DEMO_STORES = [
  {
    id: "minimercado-1",
    ownerId: "owner-mini-1",
    nombre: "Minimercado La Esquina",
    categoria: "Tienda de barrio",
    direccion: "Cra 5 #12-34, Barrio El Centro",
    ciudad: "Ibagué",
    telefono: "3001234567",
    descripcion: "Tu tienda de barrio de confianza. Abarrotes, bebidas, snacks y productos de primera necesidad. Atendemos desde las 6am todos los días con los mejores precios del barrio.",
    logo: "/images/stores/minimercado-logo.jpg",
    banner: "/images/stores/minimercado-logo.jpg",
    calificacion: 4.8,
    totalReviews: 312,
    activo: true,
    createdAt: new Date(),
    tags: ["abarrotes", "bebidas", "snacks", "aseo"],
    horario: "Lun-Dom 6:00am - 10:00pm",
  },
  {
    id: "panaderia-1",
    ownerId: "owner-pan-1",
    nombre: "Panadería La Espiga Dorada",
    categoria: "Panadería",
    direccion: "Cll 15 #8-20, Barrio Belén",
    ciudad: "Ibagué",
    telefono: "3109876543",
    descripcion: "Pan artesanal horneado cada mañana. Pasteles, tortas personalizadas, croissants y café de origen tolimense. Más de 20 años endulzando el barrio.",
    logo: "/images/stores/panaderia.jpg",
    banner: "/images/stores/panaderia.jpg",
    calificacion: 4.9,
    totalReviews: 489,
    activo: true,
    createdAt: new Date(),
    tags: ["pan", "pasteles", "tortas", "café"],
    horario: "Lun-Sáb 5:30am - 8:00pm - Dom 6:00am - 2:00pm",
  },
  {
    id: "ropa-1",
    ownerId: "owner-ropa-1",
    nombre: "Boutique Moda Tolima",
    categoria: "Ropa",
    direccion: "Centro Comercial Combeima Local 45",
    ciudad: "Ibagué",
    telefono: "3157654321",
    descripcion: "Ropa de moda para hombre, mujer y niños. Marcas nacionales e internacionales. Tallas completas y asesoría de imagen personalizada.",
    logo: "/images/stores/logoboutique.jpg",
    banner: "/images/stores/logoboutique.jpg",
    calificacion: 4.7,
    totalReviews: 267,
    activo: true,
    createdAt: new Date(),
    tags: ["ropa", "moda", "calzado", "accesorios"],
    horario: "Lun-Sáb 9:00am - 7:00pm - Dom 10:00am - 4:00pm",
  },
  {
    id: "ferreteria-1",
    ownerId: "owner-ferr-1",
    nombre: "Ferretería El Constructor",
    categoria: "Ferretería",
    direccion: "Av. Ambalá #22-15, Zona Industrial",
    ciudad: "Ibagué",
    telefono: "3204567890",
    descripcion: "Todo para construcción y reparaciones del hogar. Herramientas, materiales, pinturas y asesoría técnica gratuita. Precios de mayorista al detal.",
    logo: "/images/stores/ferreteria.jpg",
    banner: "/images/stores/ferreteria.jpg",
    calificacion: 4.6,
    totalReviews: 198,
    activo: true,
    createdAt: new Date(),
    tags: ["herramientas", "construcción", "pinturas", "plomería"],
    horario: "Lun-Sáb 7:00am - 6:00pm",
  },
  {
    id: "farmacia-1",
    ownerId: "owner-farm-1",
    nombre: "Farmacia Salud y Vida",
    categoria: "Salud",
    direccion: "Cra 3 #18-25, Barrio Jordán",
    ciudad: "Ibagué",
    telefono: "3112345678",
    descripcion: "Medicamentos, vitaminas, productos de cuidado personal y asesoría farmacéutica. Servicio a domicilio disponible. Regentada por químico farmacéutico.",
    logo: "/images/stores/farmacia.jpg",
    banner: "/images/stores/farmacia.jpg",
    calificacion: 4.9,
    totalReviews: 534,
    activo: true,
    createdAt: new Date(),
    tags: ["medicamentos", "vitaminas", "cuidado personal", "domicilio"],
    horario: "Lun-Dom 7:00am - 10:00pm",
  },
  {
    id: "papeleria-1",
    ownerId: "owner-papel-1",
    nombre: "Papelería El Estudiante",
    categoria: "Papelería",
    direccion: "Frente al Colegio San Simón",
    ciudad: "Ibagué",
    telefono: "3187654321",
    descripcion: "Útiles escolares, impresiones, fotocopias, Papelería y artículos de oficina. Servicio de impresión rápida y encuadernación profesional.",
    logo: "/images/stores/papeleriaEspinal.jpg",
    banner: "/images/stores/papeleriaEspinal.jpg",
    calificacion: 4.7,
    totalReviews: 156,
    activo: true,
    createdAt: new Date(),
    tags: ["Útiles", "impresiones", "fotocopias", "oficina"],
    horario: "Lun-Sáb 7:00am - 7:00pm",
  },
  {
    id: "tecnologia-1",
    ownerId: "owner-tech-1",
    nombre: "TecnoShop Ibagué",
    categoria: "Tecnología",
    direccion: "Cll 19 #8-15, Centro",
    ciudad: "Ibagué",
    telefono: "3223456789",
    descripcion: "Celulares, accesorios, computadores y servicio técnico especializado. Distribuidor autorizado de las principales marcas. Garantía en todos los productos.",
    logo: "/images/stores/tecnoshop.jpg",
    banner: "/images/stores/tecnoshop.jpg",
    calificacion: 4.8,
    totalReviews: 423,
    activo: true,
    createdAt: new Date(),
    tags: ["celulares", "computadores", "accesorios", "servicio técnico"],
    horario: "Lun-Sáb 8:00am - 7:00pm",
  },
  {
    id: "belleza-1",
    ownerId: "owner-bell-1",
    nombre: "Sal-n de Belleza Glamour",
    categoria: "Belleza",
    direccion: "Cra 6 #10-20, Barrio Chapetón",
    ciudad: "Espinal",
    telefono: "3234567890",
    descripcion: "Cortes, tintes, tratamientos capilares, manicure y pedicure. Productos profesionales de belleza disponibles para la venta. Agenda tu cita en línea.",
    logo: "/images/stores/belleza.jpg",
    banner: "/images/stores/belleza.jpg",
    calificacion: 4.9,
    totalReviews: 378,
    activo: true,
    createdAt: new Date(),
    tags: ["cabello", "manicure", "maquillaje", "tratamientos"],
    horario: "Mar-Sáb 8:00am - 7:00pm - Dom 9:00am - 3:00pm",
  },
  {
    id: "mascotas-1",
    ownerId: "owner-masc-1",
    nombre: "Mundo Mascotas Tolima",
    categoria: "Mascotas",
    direccion: "Cra 8 #15-30, Barrio Belén",
    ciudad: "Ibagué",
    telefono: "3145678901",
    descripcion: "Todo para el bienestar de tu mascota. Alimentos premium, accesorios, juguetes y productos de higiene para perros, gatos y Más. asesoría personalizada.",
    logo: "/images/stores/mundomascotas.jpg",
    banner: "/images/stores/mundomascotas.jpg",
    calificacion: 4.8,
    totalReviews: 245,
    activo: true,
    createdAt: new Date(),
    tags: ["perros", "gatos", "alimento", "accesorios"],
    horario: "Lun-Sáb 8:00am - 7:00pm - Dom 9:00am - 2:00pm",
  },
  {
    id: "mascotas-2",
    ownerId: "owner-masc-2",
    nombre: "PetShop AnimalCare",
    categoria: "Mascotas",
    direccion: "Cll 42 #5-18, Centro Comercial La Estación",
    ciudad: "Ibagué",
    telefono: "3167890123",
    descripcion: "Tienda especializada en mascotas exóticas y convencionales. Acuarios, aves, reptiles, roedores. Alimentos especializados y accesorios importados.",
    logo: "/images/stores/petshop.jpg",
    banner: "/images/stores/petshop.jpg",
    calificacion: 4.7,
    totalReviews: 189,
    activo: true,
    createdAt: new Date(),
    tags: ["acuarios", "aves", "reptiles", "alimento especial"],
    horario: "Lun-Dom 9:00am - 8:00pm",
  },
  {
    id: "mascotas-3",
    ownerId: "owner-masc-3",
    nombre: "Veterinaria Huellitas",
    categoria: "Mascotas",
    direccion: "Av. Ambala #30-12, Barrio El Salado",
    ciudad: "Ibagué",
    telefono: "3189012345",
    descripcion: "Clínica veterinaria con servicio de Consulta, vacunación, cirugía y peluquería canina. Venta de medicamentos veterinarios y alimentos terapéuticos.",
    logo: "/images/stores/veterinariahuellitas.jpg",
    banner: "/images/stores/veterinariahuellitas.jpg",
    calificacion: 4.9,
    totalReviews: 412,
    activo: true,
    createdAt: new Date(),
    tags: ["veterinaria", "vacunas", "peluqueria", "medicamentos"],
    horario: "Lun-Vie 7:00am - 6:00pm - Sáb 8:00am - 2:00pm",
  },
  // -- MELGAR Y ESPINAL --------------------------------------
  { id:"tec-mel-1", ownerId:"o-tm1", nombre:"DigiStore Melgar", categoria:"Tecnología", direccion:"Cra 5 #8-22, Centro", ciudad:"Melgar", telefono:"3201112233", descripcion:"Celulares, accesorios y servicio técnico en el corazón de Melgar.", logo:"/images/stores/digistore.jpg", banner:"/images/stores/digistore.jpg", calificacion:4.6, totalReviews:134, activo:true, createdAt:new Date(), tags:["celulares","accesorios"], horario:"Lun-Sáb 9am-7pm" },
  { id:"tec-esp-1", ownerId:"o-te1", nombre:"TechPoint Espinal", categoria:"Tecnología", direccion:"Cll 10 #6-15, Barrio Centro", ciudad:"Espinal", telefono:"3212223344", descripcion:"Computadores, impresoras y accesorios tecnológicos para el hogar y la oficina.", logo:"/images/stores/techpoint.jpg", banner:"/images/stores/techpoint.jpg", calificacion:4.5, totalReviews:98, activo:true, createdAt:new Date(), tags:["computadores","impresoras"], horario:"Lun-Sáb 8am-6pm" },
  { id:"tec-mel-2", ownerId:"o-tm2", nombre:"Electro Melgar", categoria:"Tecnología", direccion:"Av. Principal #12-40", ciudad:"Melgar", telefono:"3223334455", descripcion:"ElectrodoMásticos, televisores y equipos de sonido a los mejores precios.", logo:"/images/stores/electro.jpg", banner:"/images/stores/electro.jpg", calificacion:4.4, totalReviews:76, activo:true, createdAt:new Date(), tags:["electrodomesticos","tv"], horario:"Lun-Dom 9am-8pm" },
  { id:"mod-mel-1", ownerId:"o-mm1", nombre:"Moda Tropical Melgar", categoria:"Ropa", direccion:"Cra 6 #5-30, Centro Comercial", ciudad:"Melgar", telefono:"3234445566", descripcion:"Ropa fresca y moderna ideal para el clima cálido de Melgar. Moda playera y casual.", logo:"/images/stores/modatropicallogo.jpg", banner:"/images/stores/modatropicallogo.jpg", calificacion:4.7, totalReviews:201, activo:true, createdAt:new Date(), tags:["ropa","playera","casual"], horario:"Lun-Dom 9am-8pm" },
  { id:"mod-esp-1", ownerId:"o-me1", nombre:"Boutique Espinal Chic", categoria:"Ropa", direccion:"Cll 8 #4-18, Barrio El Progreso", ciudad:"Espinal", telefono:"3245556677", descripcion:"Moda femenina y masculina con las últimas tendencias. Tallas completas.", logo:"/images/stores/boutiqueespinal.jpg", banner:"/images/stores/boutiqueespinal.jpg", calificacion:4.6, totalReviews:167, activo:true, createdAt:new Date(), tags:["moda","femenina","masculina"], horario:"Lun-Sáb 9am-7pm" },
  { id:"bel-mel-1", ownerId:"o-bm1", nombre:"Spa & Belleza Melgar", categoria:"Belleza", direccion:"Cll 6 #3-25, Barrio Turístico", ciudad:"Melgar", telefono:"3267778899", descripcion:"Spa, masajes, tratamientos faciales y corporales. El mejor descanso en Melgar.", logo:"/images/stores/spaybelleza.jpg", banner:"/images/stores/spaybelleza.jpg", calificacion:4.9, totalReviews:289, activo:true, createdAt:new Date(), tags:["spa","masajes","facial"], horario:"Mar-Dom 9am-7pm" },
  { id:"sal-mel-1", ownerId:"o-sm1", nombre:"Droguería Melgar Salud", categoria:"Salud", direccion:"Cra 5 #7-14, Frente al Parque", ciudad:"Melgar", telefono:"3290001122", descripcion:"Medicamentos, vitaminas y productos de cuidado personal. Servicio a domicilio.", logo:"/images/stores/drogueriamelgar.jpg", banner:"/images/stores/drogueriamelgar.jpg", calificacion:4.8, totalReviews:445, activo:true, createdAt:new Date(), tags:["medicamentos","domicilio"], horario:"Lun-Dom 7am-10pm" },
  { id:"hog-mel-1", ownerId:"o-hm1", nombre:"Hogar & Deco Melgar", categoria:"Hogar", direccion:"Cll 7 #4-30, Centro", ciudad:"Melgar", telefono:"3256667799", descripcion:"Muebles, decoración y artículos para el hogar. Estilo moderno y tropical.", logo:"/images/stores/hogardeco.jpg", banner:"/images/stores/hogardeco.jpg", calificacion:4.5, totalReviews:134, activo:true, createdAt:new Date(), tags:["muebles","decoracion"], horario:"Lun-Sáb 9am-6pm" },
  { id:"hog-esp-1", ownerId:"o-he1", nombre:"Ferrehogar Espinal", categoria:"Hogar", direccion:"Av. Principal #20-15", ciudad:"Espinal", telefono:"3267778800", descripcion:"Ferretería y artículos para el hogar. Pinturas, herramientas y plomería.", logo:"/images/stores/ferrehogar.jpg", banner:"/images/stores/ferrehogar.jpg", calificacion:4.4, totalReviews:112, activo:true, createdAt:new Date(), tags:["ferreteria","pinturas","plomeria"], horario:"Lun-Sáb 7am-6pm" },
  { id:"ser-esp-1", ownerId:"o-sre1", nombre:"Papelería y Servicios Espinal", categoria:"Servicios", direccion:"Cra 7 #9-40, Frente al Colegio", ciudad:"Espinal", telefono:"3290001133", descripcion:"Impresiones, fotocopias, encuadernación y Útiles escolares.", logo:"/images/stores/papeleriaEspinal.jpg", banner:"/images/stores/papeleriaEspinal.jpg", calificacion:4.5, totalReviews:234, activo:true, createdAt:new Date(), tags:["impresiones","fotocopias","utiles"], horario:"Lun-Sáb 7am-7pm" },
];

export const DEMO_PRODUCTS = [
  // PRODUCTOS MELGAR Y ESPINAL
  {id:"tmel2-p1",storeId:"tec-mel-2",storeName:"Electro Melgar",nombre:"TV 43 pulgadas 4K",precio:980000,descripcion:"Smart TV 43 pulgadas 4K UHD.",imagen:"/images/products/tv.jpg",stock:6,categoria:"Television",activo:true,createdAt:new Date()},
  {id:"tmel2-p2",storeId:"tec-mel-2",storeName:"Electro Melgar",nombre:"Ventilador Torre",precio:145000,descripcion:"Ventilador torre 3 velocidades.",imagen:"/images/products/ventilador.jpg",stock:12,categoria:"Electrodomesticos",activo:true,createdAt:new Date()},
  {id:"tmel2-p3",storeId:"tec-mel-2",storeName:"Electro Melgar",nombre:"Licuadora 600W",precio:185000,descripcion:"Licuadora 600W 6 velocidades.",imagen:"/images/products/licuadora.jpg",stock:10,categoria:"Electrodomesticos",activo:true,createdAt:new Date()},
  {id:"tmel2-p4",storeId:"tec-mel-2",storeName:"Electro Melgar",nombre:"Plancha Ropa Vapor",precio:95000,descripcion:"Plancha a vapor 2200W.",imagen:"/images/products/planchavapor.jpg",stock:15,categoria:"Electrodomesticos",activo:true,createdAt:new Date()},

  {id:"mmel1-p1",storeId:"mod-mel-1",storeName:"Moda Tropical Melgar",nombre:"Vestido Playero",precio:55000,descripcion:"Vestido fresco ideal para clima calido.",imagen:"/images/products/vestidoplayero.jpg",stock:20,categoria:"Ropa Mujer",activo:true,createdAt:new Date()},
  {id:"mmel1-p2",storeId:"mod-mel-1",storeName:"Moda Tropical Melgar",nombre:"Short Deportivo",precio:38000,descripcion:"Short deportivo secado rapido.",imagen:"/images/products/shortdeportivo.jpg",stock:30,categoria:"Ropa Hombre",activo:true,createdAt:new Date()},
  {id:"mmel1-p3",storeId:"mod-mel-1",storeName:"Moda Tropical Melgar",nombre:"Camiseta Estampada",precio:28000,descripcion:"Camiseta algodon estampado tropical.",imagen:"/images/products/camisetaestampada.jpg",stock:40,categoria:"Ropa Hombre",activo:true,createdAt:new Date()},
  {id:"mmel1-p4",storeId:"mod-mel-1",storeName:"Moda Tropical Melgar",nombre:"Sandalias Playa",precio:45000,descripcion:"Sandalias comodas para playa.",imagen:"/images/products/sandaliasplaya.jpg",stock:25,categoria:"Calzado",activo:true,createdAt:new Date()},
  {id:"mmel1-p5",storeId:"mod-mel-1",storeName:"Moda Tropical Melgar",nombre:"Gorra Sol",precio:22000,descripcion:"Gorra con proteccion UV.",imagen:"/images/products/gorrasol.jpg",stock:35,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"mmel1-p6",storeId:"mod-mel-1",storeName:"Moda Tropical Melgar",nombre:"Pareo Playa",precio:35000,descripcion:"Pareo multiuso para playa.",imagen:"/images/products/pareoplaya.jpg",stock:22,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"mmel1-p7",storeId:"mod-mel-1",storeName:"Moda Tropical Melgar",nombre:"Pantaloneta Playa Hombre",precio:42000,descripcion:"Pantaloneta playa secado rapido.",imagen:"/images/products/pantaloneta.jpg",stock:28,categoria:"Ropa Hombre",activo:true,createdAt:new Date()},
  {id:"mmel1-p8",storeId:"mod-mel-1",storeName:"Moda Tropical Melgar",nombre:"Lentes Deportivos",precio:48000,descripcion:"Lentes sol deportivos polarizados.",imagen:"/images/products/lentesdeportivos.jpg",stock:20,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"mmel1-p9",storeId:"mod-mel-1",storeName:"Moda Tropical Melgar",nombre:"Bikini Dos Piezas",precio:58000,descripcion:"Bikini dos piezas estampado tropical.",imagen:"/images/products/bikini.jpg",stock:18,categoria:"Ropa Mujer",activo:true,createdAt:new Date()},
  {id:"mesp1-p1",storeId:"mod-esp-1",storeName:"Boutique Espinal Chic",nombre:"Blusa Elegante",precio:48000,descripcion:"Blusa gasa con detalles bordados.",imagen:"/images/products/blusaele.jpg",stock:18,categoria:"Ropa Mujer",activo:true,createdAt:new Date()},
  {id:"mesp1-p2",storeId:"mod-esp-1",storeName:"Boutique Espinal Chic",nombre:"Jean Skinny",precio:72000,descripcion:"Jean skinny tiro alto.",imagen:"/images/products/jeasns.jpg",stock:22,categoria:"Ropa Mujer",activo:true,createdAt:new Date()},
  {id:"mesp1-p3",storeId:"mod-esp-1",storeName:"Boutique Espinal Chic",nombre:"Camisa Formal",precio:65000,descripcion:"Camisa formal manga larga.",imagen:"/images/products/camisateformal.jpg",stock:15,categoria:"Ropa Hombre",activo:true,createdAt:new Date()},
  {id:"mesp1-p4",storeId:"mod-esp-1",storeName:"Boutique Espinal Chic",nombre:"Bolso Tote",precio:85000,descripcion:"Bolso tote cuero sintetico.",imagen:"/images/products/bolsotote.jpg",stock:10,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"mesp1-p5",storeId:"mod-esp-1",storeName:"Boutique Espinal Chic",nombre:"Cinturon Cuero",precio:35000,descripcion:"Cinturon cuero genuino.",imagen:"/images/products/cinturon.jpg",stock:20,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"mesp1-p6",storeId:"mod-esp-1",storeName:"Boutique Espinal Chic",nombre:"Vestido Coctel",precio:95000,descripcion:"Vestido coctel elegante tallas S-XL.",imagen:"/images/products/vestidocotel.jpg",stock:12,categoria:"Ropa Mujer",activo:true,createdAt:new Date()},
  {id:"mesp1-p7",storeId:"mod-esp-1",storeName:"Boutique Espinal Chic",nombre:"Pantalon Formal Hombre",precio:78000,descripcion:"Pantalon formal corte clasico.",imagen:"/images/products/pantalonformal.jpg",stock:16,categoria:"Ropa Hombre",activo:true,createdAt:new Date()},
  {id:"mesp1-p8",storeId:"mod-esp-1",storeName:"Boutique Espinal Chic",nombre:"Bufanda Elegante",precio:28000,descripcion:"Bufanda suave multicolor.",imagen:"/images/products/bufanda.jpg",stock:25,categoria:"Accesorios",activo:true,createdAt:new Date()},

  {id:"bmel1-p1",storeId:"bel-mel-1",storeName:"Spa & Belleza Melgar",nombre:"Masaje Relajante 60min",precio:80000,descripcion:"Masaje corporal relajante 60 minutos.",imagen:"/images/products/masaje.jpg",stock:10,categoria:"Servicios",activo:true,createdAt:new Date()},
  {id:"bmel1-p2",storeId:"bel-mel-1",storeName:"Spa & Belleza Melgar",nombre:"Facial Hidratante",precio:65000,descripcion:"Tratamiento facial hidratante profundo.",imagen:"/images/products/facial.jpg",stock:8,categoria:"Servicios",activo:true,createdAt:new Date()},
  {id:"bmel1-p3",storeId:"bel-mel-1",storeName:"Spa & Belleza Melgar",nombre:"Crema Corporal 300ml",precio:45000,descripcion:"Crema corporal hidratante premium.",imagen:"/images/products/cremacorporal.jpg",stock:20,categoria:"Cuidado Personal",activo:true,createdAt:new Date()},
  {id:"bmel1-p4",storeId:"bel-mel-1",storeName:"Spa & Belleza Melgar",nombre:"Aceite Esencial Lavanda",precio:28000,descripcion:"Aceite esencial lavanda 30ml.",imagen:"/images/products/aceitela.jpg",stock:25,categoria:"Aromaterapia",activo:true,createdAt:new Date()},
  {id:"bmel1-p5",storeId:"bel-mel-1",storeName:"Spa & Belleza Melgar",nombre:"Kit Spa en Casa",precio:95000,descripcion:"Kit completo spa en casa 5 productos.",imagen:"/images/products/kitspa.jpg",stock:12,categoria:"Kits",activo:true,createdAt:new Date()},

  {id:"smel1-p1",storeId:"sal-mel-1",storeName:"Drogueria Melgar Salud",nombre:"Acetaminofen 500mg x20",precio:7500,descripcion:"Analgesico antipiretico.",imagen:"/images/products/acetamino.jpg",stock:100,categoria:"Medicamentos",activo:true,createdAt:new Date()},
  {id:"smel1-p2",storeId:"sal-mel-1",storeName:"Drogueria Melgar Salud",nombre:"Suero Oral x5",precio:6500,descripcion:"Sales rehidratacion oral.",imagen:"/images/products/suero.jpg",stock:80,categoria:"Medicamentos",activo:true,createdAt:new Date()},
  {id:"smel1-p3",storeId:"sal-mel-1",storeName:"Drogueria Melgar Salud",nombre:"Protector Solar SPF50",precio:38000,descripcion:"Protector solar facial corporal.",imagen:"/images/products/protector.jpg",stock:30,categoria:"Cuidado Personal",activo:true,createdAt:new Date()},
  {id:"smel1-p4",storeId:"sal-mel-1",storeName:"Drogueria Melgar Salud",nombre:"Vitamina D3 x60",precio:22000,descripcion:"Vitamina D3 2000UI capsulas.",imagen:"/images/products/vitaminad3.jpg",stock:45,categoria:"Vitaminas",activo:true,createdAt:new Date()},
  {id:"smel1-p5",storeId:"sal-mel-1",storeName:"Drogueria Melgar Salud",nombre:"Alcohol Gel 500ml",precio:12000,descripcion:"Gel antibacterial 70% alcohol.",imagen:"/images/products/alcoholgel.jpg",stock:60,categoria:"Higiene",activo:true,createdAt:new Date()},
  {id:"hmel1-p1",storeId:"hog-mel-1",storeName:"Hogar & Deco Melgar",nombre:"Cojin Decorativo",precio:28000,descripcion:"Cojin decorativo 45x45cm.",imagen:"/images/products/cojin.jpg",stock:20,categoria:"Decoracion",activo:true,createdAt:new Date()},
  {id:"hmel1-p2",storeId:"hog-mel-1",storeName:"Hogar & Deco Melgar",nombre:"Lampara Mesa LED",precio:65000,descripcion:"Lampara mesa LED regulable.",imagen:"/images/products/lampara.jpg",stock:12,categoria:"Iluminacion",activo:true,createdAt:new Date()},
  {id:"hmel1-p3",storeId:"hog-mel-1",storeName:"Hogar & Deco Melgar",nombre:"Cuadro Decorativo",precio:45000,descripcion:"Cuadro decorativo moderno.",imagen:"/images/products/cuadro.jpg",stock:15,categoria:"Decoracion",activo:true,createdAt:new Date()},
  {id:"hmel1-p4",storeId:"hog-mel-1",storeName:"Hogar & Deco Melgar",nombre:"Organizador Cocina",precio:38000,descripcion:"Organizador cocina 3 niveles.",imagen:"/images/products/organizador.jpg",stock:18,categoria:"Cocina",activo:true,createdAt:new Date()},
  {id:"hmel1-p5",storeId:"hog-mel-1",storeName:"Hogar & Deco Melgar",nombre:"Tapete Sala",precio:85000,descripcion:"Tapete sala antideslizante.",imagen:"/images/products/tapete.jpg",stock:8,categoria:"Decoracion",activo:true,createdAt:new Date()},
  {id:"hesp1-p1",storeId:"hog-esp-1",storeName:"Ferrehogar Espinal",nombre:"Pintura Interior 1 Galon",precio:42000,descripcion:"Pintura vinilo blanca interior.",imagen:"/images/products/pintura1g.jpg",stock:25,categoria:"Pinturas",activo:true,createdAt:new Date()},
  {id:"hesp1-p2",storeId:"hog-esp-1",storeName:"Ferrehogar Espinal",nombre:"Llave Paso 1/2",precio:18000,descripcion:"Llave paso PVC 1/2 pulgada.",imagen:"/images/products/llavepaso.jpg",stock:30,categoria:"Plomeria",activo:true,createdAt:new Date()},
  {id:"hesp1-p3",storeId:"hog-esp-1",storeName:"Ferrehogar Espinal",nombre:"Bombillo LED 9W",precio:8500,descripcion:"Bombillo LED 9W luz blanca.",imagen:"/images/products/bombilloled.jpg",stock:50,categoria:"Electrico",activo:true,createdAt:new Date()},
  {id:"hesp1-p4",storeId:"hog-esp-1",storeName:"Ferrehogar Espinal",nombre:"Cinta Teflon x5",precio:12000,descripcion:"Pack 5 cintas teflon plomeria.",imagen:"/images/products/cinta.jpg",stock:40,categoria:"Plomeria",activo:true,createdAt:new Date()},
  // PRODUCTOS TIENDAS ORIGINALES
  {id:"mini-p1",storeId:"minimercado-1",storeName:"Minimercado La Esquina",nombre:"Arroz Diana 1kg",precio:5200,descripcion:"Arroz blanco de primera calidad.",imagen:"/images/products/arroz.jpg",stock:80,categoria:"Abarrotes",activo:true,createdAt:new Date()},
  {id:"mini-p2",storeId:"minimercado-1",storeName:"Minimercado La Esquina",nombre:"Aceite Girasol 1L",precio:14500,descripcion:"Aceite de girasol puro.",imagen:"/images/products/aceite.jpg",stock:45,categoria:"Abarrotes",activo:true,createdAt:new Date()},
  {id:"mini-p3",storeId:"minimercado-1",storeName:"Minimercado La Esquina",nombre:"Leche Entera 1L",precio:4800,descripcion:"Leche entera pasteurizada.",imagen:"/images/products/leche.jpg",stock:60,categoria:"Lacteos",activo:true,createdAt:new Date()},
  {id:"mini-p4",storeId:"minimercado-1",storeName:"Minimercado La Esquina",nombre:"Gaseosa 2L",precio:7500,descripcion:"Gaseosa fria varios sabores.",imagen:"/images/products/gaseosa.jpg",stock:50,categoria:"Bebidas",activo:true,createdAt:new Date()},
  {id:"mini-p5",storeId:"minimercado-1",storeName:"Minimercado La Esquina",nombre:"Jabon de Bano x3",precio:9800,descripcion:"Pack 3 jabones con glicerina.",imagen:"/images/products/jabon.jpg",stock:35,categoria:"Aseo",activo:true,createdAt:new Date()},
  {id:"mini-p6",storeId:"minimercado-1",storeName:"Minimercado La Esquina",nombre:"Azucar 1kg",precio:4200,descripcion:"Azucar blanca refinada.",imagen:"/images/products/azucar.jpg",stock:70,categoria:"Abarrotes",activo:true,createdAt:new Date()},
  {id:"mini-p7",storeId:"minimercado-1",storeName:"Minimercado La Esquina",nombre:"Cafe Sello Rojo 250g",precio:12500,descripcion:"Cafe molido colombiano.",imagen:"/images/products/cafe.jpg",stock:40,categoria:"Bebidas",activo:true,createdAt:new Date()},
  {id:"mini-p8",storeId:"minimercado-1",storeName:"Minimercado La Esquina",nombre:"Pasta Doria 500g",precio:3800,descripcion:"Pasta de trigo espagueti.",imagen:"/images/products/pasta.jpg",stock:55,categoria:"Abarrotes",activo:true,createdAt:new Date()},
  {id:"pan-p1",storeId:"panaderia-1",storeName:"Panaderia La Espiga Dorada",nombre:"Pan Artesanal x6",precio:4500,descripcion:"Pan de masa madre horneado.",imagen:"/images/products/pan.jpg",stock:30,categoria:"Panaderia",activo:true,createdAt:new Date()},
  {id:"pan-p2",storeId:"panaderia-1",storeName:"Panaderia La Espiga Dorada",nombre:"Croissant x4",precio:8000,descripcion:"Croissants de mantequilla.",imagen:"/images/products/croa.jpg",stock:20,categoria:"Panaderia",activo:true,createdAt:new Date()},
  {id:"pan-p3",storeId:"panaderia-1",storeName:"Panaderia La Espiga Dorada",nombre:"Torta de Cumpleanos",precio:65000,descripcion:"Torta personalizada.",imagen:"/images/products/torta.jpg",stock:5,categoria:"Reposteria",activo:true,createdAt:new Date()},
  {id:"pan-p4",storeId:"panaderia-1",storeName:"Panaderia La Espiga Dorada",nombre:"Almojabanas x6",precio:5500,descripcion:"Almojabanas colombianas.",imagen:"/images/products/almojabanas.jpg",stock:25,categoria:"Panaderia",activo:true,createdAt:new Date()},
  {id:"pan-p5",storeId:"panaderia-1",storeName:"Panaderia La Espiga Dorada",nombre:"Cafe Americano",precio:3500,descripcion:"Cafe de origen tolimense.",imagen:"/images/products/cafeA.jpg",stock:50,categoria:"Bebidas",activo:true,createdAt:new Date()},
  {id:"pan-p6",storeId:"panaderia-1",storeName:"Panaderia La Espiga Dorada",nombre:"Pandebono x6",precio:6000,descripcion:"Pandebono de queso.",imagen:"/images/products/pandebono.jpg",stock:20,categoria:"Panaderia",activo:true,createdAt:new Date()},
  {id:"ropa-p1",storeId:"ropa-1",storeName:"Boutique Moda Tolima",nombre:"Camiseta Basica Hombre",precio:28000,descripcion:"Camiseta algodon 100%.",imagen:"/images/products/camiseta.jpg",stock:40,categoria:"Ropa",activo:true,createdAt:new Date()},
  {id:"ropa-p2",storeId:"ropa-1",storeName:"Boutique Moda Tolima",nombre:"Jean Slim Mujer",precio:75000,descripcion:"Jean slim fit mezclilla.",imagen:"/images/products/jean.jpg",stock:25,categoria:"Ropa",activo:true,createdAt:new Date()},
  {id:"ropa-p3",storeId:"ropa-1",storeName:"Boutique Moda Tolima",nombre:"Vestido Floral",precio:65000,descripcion:"Vestido verano estampado.",imagen:"/images/products/vestido.jpg",stock:15,categoria:"Ropa",activo:true,createdAt:new Date()},
  {id:"ropa-p4",storeId:"ropa-1",storeName:"Boutique Moda Tolima",nombre:"Tenis Deportivos",precio:120000,descripcion:"Tenis unisex antideslizante.",imagen:"/images/products/tenis.jpg",stock:20,categoria:"Calzado",activo:true,createdAt:new Date()},
  {id:"ropa-p5",storeId:"ropa-1",storeName:"Boutique Moda Tolima",nombre:"Chaqueta Impermeable",precio:95000,descripcion:"Chaqueta impermeable capucha.",imagen:"/images/products/chaqueta.jpg",stock:12,categoria:"Ropa",activo:true,createdAt:new Date()},
  {id:"ropa-p6",storeId:"ropa-1",storeName:"Boutique Moda Tolima",nombre:"Bolso de Cuero",precio:85000,descripcion:"Bolso cuero sintetico.",imagen:"/images/products/bolso.jpg",stock:10,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"ferr-p1",storeId:"ferreteria-1",storeName:"Ferreteria El Constructor",nombre:"Taladro Percutor 500W",precio:185000,descripcion:"Taladro percutor con brocas.",imagen:"/images/products/taladro.jpg",stock:8,categoria:"Herramientas",activo:true,createdAt:new Date()},
  {id:"ferr-p2",storeId:"ferreteria-1",storeName:"Ferreteria El Constructor",nombre:"Pintura Blanca 1 Galon",precio:42000,descripcion:"Pintura vinilo blanca.",imagen:"/images/products/pintura.jpg",stock:20,categoria:"Pinturas",activo:true,createdAt:new Date()},
  {id:"ferr-p3",storeId:"ferreteria-1",storeName:"Ferreteria El Constructor",nombre:"Juego Destornilladores x8",precio:28000,descripcion:"Set destornilladores.",imagen:"/images/products/destornilladores.jpg",stock:15,categoria:"Herramientas",activo:true,createdAt:new Date()},
  {id:"ferr-p4",storeId:"ferreteria-1",storeName:"Ferreteria El Constructor",nombre:"Martillo Carpintero",precio:22000,descripcion:"Martillo mango madera.",imagen:"/images/products/martillo.jpg",stock:18,categoria:"Herramientas",activo:true,createdAt:new Date()},
  {id:"ferr-p5",storeId:"ferreteria-1",storeName:"Ferreteria El Constructor",nombre:"Cinta Metrica 5m",precio:12000,descripcion:"Cinta metrica acero.",imagen:"/images/products/metro.jpg",stock:25,categoria:"Herramientas",activo:true,createdAt:new Date()},
  {id:"farm-p1",storeId:"farmacia-1",storeName:"Farmacia Salud y Vida",nombre:"Acetaminofen 500mg x10",precio:4500,descripcion:"Analgesico y antipiretico.",imagen:"/images/products/acetaminofen.jpg",stock:100,categoria:"Medicamentos",activo:true,createdAt:new Date()},
  {id:"farm-p2",storeId:"farmacia-1",storeName:"Farmacia Salud y Vida",nombre:"Vitamina C 1000mg x30",precio:18000,descripcion:"Vitamina C efervescente.",imagen:"/images/products/vitamina.jpg",stock:60,categoria:"Vitaminas",activo:true,createdAt:new Date()},
  {id:"farm-p3",storeId:"farmacia-1",storeName:"Farmacia Salud y Vida",nombre:"Crema Hidratante 200ml",precio:22000,descripcion:"Crema hidratante con aloe.",imagen:"/images/products/crema.jpg",stock:35,categoria:"Cuidado Personal",activo:true,createdAt:new Date()},
  {id:"farm-p4",storeId:"farmacia-1",storeName:"Farmacia Salud y Vida",nombre:"Alcohol Antiseptico 500ml",precio:9800,descripcion:"Alcohol antiseptico 70%.",imagen:"/images/products/alcohol.jpg",stock:50,categoria:"Primeros Auxilios",activo:true,createdAt:new Date()},
  {id:"farm-p5",storeId:"farmacia-1",storeName:"Farmacia Salud y Vida",nombre:"Ibuprofeno 400mg x10",precio:5200,descripcion:"Antiinflamatorio analgesico.",imagen:"/images/products/ibu.jpg",stock:80,categoria:"Medicamentos",activo:true,createdAt:new Date()},
  {id:"papel-p1",storeId:"papeleria-1",storeName:"Papeleria El Estudiante",nombre:"Cuaderno Norma 100 hojas",precio:8500,descripcion:"Cuaderno cuadriculado.",imagen:"/images/products/cuaderno.jpg",stock:60,categoria:"Utiles",activo:true,createdAt:new Date()},
  {id:"papel-p2",storeId:"papeleria-1",storeName:"Papeleria El Estudiante",nombre:"Lapiceros BIC x12",precio:9000,descripcion:"Caja 12 lapiceros BIC.",imagen:"/images/products/lapiceros.jpg",stock:45,categoria:"Utiles",activo:true,createdAt:new Date()},
  {id:"papel-p3",storeId:"papeleria-1",storeName:"Papeleria El Estudiante",nombre:"Resma Papel Carta",precio:22000,descripcion:"Resma 500 hojas bond.",imagen:"/images/products/papel.jpg",stock:30,categoria:"Papeleria",activo:true,createdAt:new Date()},
  {id:"papel-p4",storeId:"papeleria-1",storeName:"Papeleria El Estudiante",nombre:"Colores Faber x24",precio:18500,descripcion:"Caja 24 colores Faber.",imagen:"/images/products/colores.jpg",stock:25,categoria:"Arte",activo:true,createdAt:new Date()},
  {id:"papel-p5",storeId:"papeleria-1",storeName:"Papeleria El Estudiante",nombre:"Mochila Escolar",precio:65000,descripcion:"Mochila escolar resistente.",imagen:"/images/products/mochila.jpg",stock:12,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"tech-p1",storeId:"tecnologia-1",storeName:"TecnoShop Ibague",nombre:"Audifonos Bluetooth",precio:85000,descripcion:"Audifonos inalambricos.",imagen:"/images/products/audifonos.jpg",stock:20,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"tech-p2",storeId:"tecnologia-1",storeName:"TecnoShop Ibague",nombre:"Cargador USB-C 65W",precio:45000,descripcion:"Cargador rapido USB-C.",imagen:"/images/products/cargador.jpg",stock:35,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"tech-p3",storeId:"tecnologia-1",storeName:"TecnoShop Ibague",nombre:"Mouse Inalambrico",precio:55000,descripcion:"Mouse inalambrico ergonomico.",imagen:"/images/products/mouse.jpg",stock:15,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"tech-p4",storeId:"tecnologia-1",storeName:"TecnoShop Ibague",nombre:"Memoria USB 64GB",precio:32000,descripcion:"Memoria USB 3.0 64GB.",imagen:"/images/products/memoria.jpg",stock:40,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"tech-p5",storeId:"tecnologia-1",storeName:"TecnoShop Ibague",nombre:"Parlante Bluetooth 10W",precio:75000,descripcion:"Parlante portatil resistente.",imagen:"/images/products/parlante.jpg",stock:12,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"bell-p1",storeId:"belleza-1",storeName:"Salon de Belleza Glamour",nombre:"Shampoo Keratina 500ml",precio:38000,descripcion:"Shampoo con keratina.",imagen:"/images/products/keratina.jpg",stock:25,categoria:"Belleza",activo:true,createdAt:new Date()},
  {id:"bell-p2",storeId:"belleza-1",storeName:"Salon de Belleza Glamour",nombre:"Mascarilla Capilar 300g",precio:45000,descripcion:"Mascarilla hidratante.",imagen:"/images/products/mascarilla.jpg",stock:20,categoria:"Belleza",activo:true,createdAt:new Date()},
  {id:"bell-p3",storeId:"belleza-1",storeName:"Salon de Belleza Glamour",nombre:"Esmalte de Unas x6",precio:28000,descripcion:"Set 6 esmaltes colores.",imagen:"/images/products/esmalte.jpg",stock:30,categoria:"Belleza",activo:true,createdAt:new Date()},
  {id:"bell-p4",storeId:"belleza-1",storeName:"Salon de Belleza Glamour",nombre:"Plancha de Cabello",precio:95000,descripcion:"Plancha ceramica ajustable.",imagen:"/images/products/plancha.jpg",stock:8,categoria:"Belleza",activo:true,createdAt:new Date()},
  {id:"bell-p5",storeId:"belleza-1",storeName:"Salon de Belleza Glamour",nombre:"Perfume Floral 50ml",precio:78000,descripcion:"Perfume floral femenino.",imagen:"/images/products/perfume.jpg",stock:12,categoria:"Belleza",activo:true,createdAt:new Date()},
  // MUNDO MASCOTAS TOLIMA
  {id:"masc1-p1",storeId:"mascotas-1",storeName:"Mundo Mascotas Tolima",nombre:"Concentrado Perro Adulto 4kg",precio:68000,descripcion:"Alimento balanceado para perros adultos todas las razas.",imagen:"/images/products/concentradoperro.jpg",stock:30,categoria:"Alimento",activo:true,createdAt:new Date()},
  {id:"masc1-p2",storeId:"mascotas-1",storeName:"Mundo Mascotas Tolima",nombre:"Concentrado Gato Adulto 2kg",precio:42000,descripcion:"Alimento premium para gatos adultos con taurina.",imagen:"/images/products/concentradogato.jpg",stock:25,categoria:"Alimento",activo:true,createdAt:new Date()},
  {id:"masc1-p3",storeId:"mascotas-1",storeName:"Mundo Mascotas Tolima",nombre:"Collar Antipulgas Perro",precio:28000,descripcion:"Collar antipulgas y garrapatas duracion 8 meses.",imagen:"/images/products/collaranti.jpg",stock:40,categoria:"Higiene",activo:true,createdAt:new Date()},
  {id:"masc1-p4",storeId:"mascotas-1",storeName:"Mundo Mascotas Tolima",nombre:"Juguete Kong Rellenable",precio:35000,descripcion:"Juguete interactivo rellenable para perros.",imagen:"/images/products/juguetekong.jpg",stock:15,categoria:"Juguetes",activo:true,createdAt:new Date()},
  {id:"masc1-p5",storeId:"mascotas-1",storeName:"Mundo Mascotas Tolima",nombre:"Cama Mascotas Talla M",precio:55000,descripcion:"Cama suave y lavable para perros y gatos talla M.",imagen:"/images/products/cama.jpg",stock:12,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"masc1-p6",storeId:"mascotas-1",storeName:"Mundo Mascotas Tolima",nombre:"Shampoo Perro Antipulgas",precio:22000,descripcion:"Shampoo medicado antipulgas con aloe vera.",imagen:"/images/products/shampo.jpg",stock:35,categoria:"Higiene",activo:true,createdAt:new Date()},
  {id:"masc1-p7",storeId:"mascotas-1",storeName:"Mundo Mascotas Tolima",nombre:"Correa Retractil 5m",precio:45000,descripcion:"Correa retractil resistente hasta 25kg.",imagen:"/images/products/correa.jpg",stock:20,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"masc1-p8",storeId:"mascotas-1",storeName:"Mundo Mascotas Tolima",nombre:"Snacks Premio Perro x50",precio:18000,descripcion:"Premios naturales para entrenamiento canino.",imagen:"/images/products/snackperro.jpg",stock:50,categoria:"Alimento",activo:true,createdAt:new Date()},
  // PETSHOP ANIMALCARE
  {id:"masc2-p1",storeId:"mascotas-2",storeName:"PetShop AnimalCare",nombre:"Pecera Acrilica 30L",precio:95000,descripcion:"Pecera acrilica con filtro y luz LED incluida.",imagen:"/images/products/pecera.jpg",stock:8,categoria:"Acuarios",activo:true,createdAt:new Date()},
  {id:"masc2-p2",storeId:"mascotas-2",storeName:"PetShop AnimalCare",nombre:"Alimento Peces Tropicales",precio:15000,descripcion:"Alimento en escamas para peces tropicales 100g.",imagen:"/images/products/alimento.jpg",stock:45,categoria:"Alimento",activo:true,createdAt:new Date()},
  {id:"masc2-p3",storeId:"mascotas-2",storeName:"PetShop AnimalCare",nombre:"Jaula Hamster Completa",precio:75000,descripcion:"Jaula para hamster con rueda, bebedero y comedero.",imagen:"/images/products/jaula.jpg",stock:10,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"masc2-p4",storeId:"mascotas-2",storeName:"PetShop AnimalCare",nombre:"Arena Gato Aglomerante 4kg",precio:32000,descripcion:"Arena sanitaria aglomerante sin polvo para gatos.",imagen:"/images/products/arena.jpg",stock:30,categoria:"Higiene",activo:true,createdAt:new Date()},
  {id:"masc2-p5",storeId:"mascotas-2",storeName:"PetShop AnimalCare",nombre:"Vitaminas Reptiles 50ml",precio:38000,descripcion:"Suplemento vitamínico para reptiles y tortugas.",imagen:"/images/products/vitaminas.jpg",stock:15,categoria:"Salud",activo:true,createdAt:new Date()},
  {id:"masc2-p6",storeId:"mascotas-2",storeName:"PetShop AnimalCare",nombre:"Comedero Automatico Mascotas",precio:85000,descripcion:"Comedero automatico programable 2L capacidad.",imagen:"/images/products/comedor.jpg",stock:7,categoria:"Accesorios",activo:true,createdAt:new Date()},
  // VETERINARIA HUELLITAS
  {id:"masc3-p1",storeId:"mascotas-3",storeName:"Veterinaria Huellitas",nombre:"Vacuna Antirrábica Perro",precio:35000,descripcion:"Vacuna antirrábica certificada para perros.",imagen:"/images/products/vacuna.jpg",stock:20,categoria:"Salud",activo:true,createdAt:new Date()},
  {id:"masc3-p2",storeId:"mascotas-3",storeName:"Veterinaria Huellitas",nombre:"Desparasitante Interno x3",precio:22000,descripcion:"Desparasitante interno para perros y gatos.",imagen:"/images/products/desparasitante.jpg",stock:50,categoria:"Salud",activo:true,createdAt:new Date()},
  {id:"masc3-p3",storeId:"mascotas-3",storeName:"Veterinaria Huellitas",nombre:"Alimento Terapéutico Renal",precio:78000,descripcion:"Alimento veterinario para mascotas con problemas renales.",imagen:"/images/products/alimentotere.jpg",stock:12,categoria:"Alimento",activo:true,createdAt:new Date()},
  {id:"masc3-p4",storeId:"mascotas-3",storeName:"Veterinaria Huellitas",nombre:"Kit Primeros Auxilios Mascotas",precio:45000,descripcion:"Kit completo de primeros auxilios para mascotas.",imagen:"/images/products/kit.jpg",stock:15,categoria:"Salud",activo:true,createdAt:new Date()},
  {id:"masc3-p5",storeId:"mascotas-3",storeName:"Veterinaria Huellitas",nombre:"Antipulgas Pipeta x3",precio:28000,descripcion:"Pipetas antipulgas y garrapatas para perros.",imagen:"/images/products/antipulga.jpg",stock:40,categoria:"Salud",activo:true,createdAt:new Date()},
  {id:"masc3-p6",storeId:"mascotas-3",storeName:"Veterinaria Huellitas",nombre:"Collar Isabelino Talla M",precio:18000,descripcion:"Collar isabelino para recuperacion post cirugia.",imagen:"/images/products/elicollar.jpg",stock:20,categoria:"Accesorios",activo:true,createdAt:new Date()},
  
  // NUEVOS PRODUCTOS DE TECNOLOGÍA
  // Productos para DigiStore Melgar (tec-mel-1)
  {id:"tmel1-p10",storeId:"tec-mel-1",storeName:"DigiStore Melgar",nombre:"Celular Samsung Galaxy S23",precio:1250000,descripcion:"Smartphone 256GB cámara 50MP, pantalla 6.1 pulgadas.",imagen:"/images/products/celular.jpg",stock:15,categoria:"Celulares",activo:true,createdAt:new Date()},
  {id:"tmel1-p11",storeId:"tec-mel-1",storeName:"DigiStore Melgar",nombre:"Funda Protectora Silicona",precio:25000,descripcion:"Funda silicona antigolpes para celular.",imagen:"/images/products/funda.jpg",stock:50,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"tmel1-p12",storeId:"tec-mel-1",storeName:"DigiStore Melgar",nombre:"Audífonos Inalámbricos Bluetooth",precio:95000,descripcion:"Audífonos bluetooth 5.3 con cancelación de ruido.",imagen:"/images/products/audifonosinalambricos.jpg",stock:30,categoria:"Audio",activo:true,createdAt:new Date()},
  {id:"tmel1-p13",storeId:"tec-mel-1",storeName:"DigiStore Melgar",nombre:"Cargador Rápido 30W",precio:45000,descripcion:"Cargador rápido USB-C 30W con cable incluido.",imagen:"/images/products/cargadorrapido.jpg",stock:40,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"tmel1-p14",storeId:"tec-mel-1",storeName:"DigiStore Melgar",nombre:"Vidrio Templado Protector",precio:15000,descripcion:"Protector de pantalla vidrio templado 9H.",imagen:"/images/products/vidriotemplado.jpg",stock:60,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"tmel1-p15",storeId:"tec-mel-1",storeName:"DigiStore Melgar",nombre:"Cable USB-C 2m",precio:22000,descripcion:"Cable USB-C carga rápida 2 metros.",imagen:"/images/products/cableUSB.jpg",stock:45,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"tmel1-p16",storeId:"tec-mel-1",storeName:"DigiStore Melgar",nombre:"Soporte Celular Escritorio",precio:28000,descripcion:"Soporte ajustable para celular en escritorio.",imagen:"/images/products/soporte.jpg",stock:35,categoria:"Accesorios",activo:true,createdAt:new Date()},
  {id:"tmel1-p17",storeId:"tec-mel-1",storeName:"DigiStore Melgar",nombre:"Memoria MicroSD 128GB",precio:55000,descripcion:"Memoria MicroSD 128GB Clase 10 UHS-I.",imagen:"/images/products/memoriaSD.jpg",stock:25,categoria:"Almacenamiento",activo:true,createdAt:new Date()},
  {id:"tmel1-p18",storeId:"tec-mel-1",storeName:"DigiStore Melgar",nombre:"Anillo Luz LED Selfie",precio:38000,descripcion:"Anillo luz LED para selfies y videos profesionales.",imagen:"/images/products/anilloluz.jpg",stock:20,categoria:"Accesorios",activo:true,createdAt:new Date()},
  
  // Productos para TechPoint Espinal (tec-esp-1)
  {id:"tesp1-p10",storeId:"tec-esp-1",storeName:"TechPoint Espinal",nombre:"Laptop HP Pavilion 15",precio:2200000,descripcion:"Laptop Intel Core i7 16GB RAM 512GB SSD.",imagen:"/images/products/lapto.jpg",stock:8,categoria:"Computadores",activo:true,createdAt:new Date()},
  {id:"tesp1-p11",storeId:"tec-esp-1",storeName:"TechPoint Espinal",nombre:"Mouse Óptico Gaming",precio:35000,descripcion:"Mouse óptico 1600 DPI con iluminación RGB.",imagen:"/images/products/maouseoptico.jpg",stock:25,categoria:"Computadores",activo:true,createdAt:new Date()},
  {id:"tesp1-p12",storeId:"tec-esp-1",storeName:"TechPoint Espinal",nombre:"Impresora Multifuncional HP",precio:650000,descripcion:"Impresora multifuncional WiFi con escáner y copiadora.",imagen:"/images/products/impresora.jpg",stock:10,categoria:"Impresoras",activo:true,createdAt:new Date()},
  {id:"tesp1-p13",storeId:"tec-esp-1",storeName:"TechPoint Espinal",nombre:"Teclado USB Mecánico",precio:55000,descripcion:"Teclado mecánico USB con retroiluminación RGB.",imagen:"/images/products/tecladoUSB.jpg",stock:18,categoria:"Computadores",activo:true,createdAt:new Date()},
];