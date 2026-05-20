const fs = require("fs");
const c = fs.readFileSync("lib/utils.ts", "utf8");

const newStores = `
  {
    id: "digistore-1",
    ownerId: "owner-digi-1",
    nombre: "DigiStore",
    categoria: "Tecnologia",
    direccion: "Cra 12 #5-40, Centro Comercial Espinal Plaza",
    ciudad: "Espinal",
    telefono: "3112233445",
    descripcion: "Tienda especializada en gadgets, accesorios tecnologicos y electronica de consumo. Celulares, tablets, smartwatches y mas al mejor precio.",
    logo: "https://picsum.photos/seed/digilogo/300/300",
    banner: "https://picsum.photos/seed/digibanner/1400/500",
    calificacion: 4.7,
    totalReviews: 198,
    activo: true,
    createdAt: new Date(),
    tags: ["gadgets", "celulares", "tablets", "smartwatch"],
    horario: "Lun-Sab 9:00am - 7:00pm",
  },
  {
    id: "techpoint-1",
    ownerId: "owner-tech2-1",
    nombre: "TechPoint",
    categoria: "Tecnologia",
    direccion: "Cll 8 #10-22, Barrio El Progreso",
    ciudad: "Melgar",
    telefono: "3124455667",
    descripcion: "Computadores, impresoras, componentes y servicio tecnico rapido. Soporte a domicilio disponible para empresas y hogares en Melgar.",
    logo: "https://picsum.photos/seed/techpointlogo/300/300",
    banner: "https://picsum.photos/seed/techpointbanner/1400/500",
    calificacion: 4.6,
    totalReviews: 154,
    activo: true,
    createdAt: new Date(),
    tags: ["computadores", "impresoras", "servicio tecnico", "redes"],
    horario: "Lun-Sab 8:00am - 6:00pm",
  },
  {
    id: "electromelgar-1",
    ownerId: "owner-elec-1",
    nombre: "ElectroMelgar",
    categoria: "Tecnologia",
    direccion: "Av. Principal #20-15, Centro",
    ciudad: "Melgar",
    telefono: "3135566778",
    descripcion: "Electrodomesticos, equipos de sonido, televisores y linea blanca. Ventas a credito disponibles. Garantia oficial en todos los productos.",
    logo: "https://picsum.photos/seed/electromelgarlogo/300/300",
    banner: "https://picsum.photos/seed/electromelbanner/1400/500",
    calificacion: 4.8,
    totalReviews: 312,
    activo: true,
    createdAt: new Date(),
    tags: ["electrodomesticos", "televisores", "sonido", "credito"],
    horario: "Lun-Sab 8:00am - 7:00pm - Dom 10:00am - 4:00pm",
  },`;

const newProducts = `
  // DIGISTORE
  {id:"digi-p1",storeId:"digistore-1",storeName:"DigiStore",nombre:"Smartwatch Deportivo",precio:185000,descripcion:"Reloj inteligente con GPS, monitor cardiaco y resistencia al agua.",imagen:"https://picsum.photos/seed/digip1/400/400",stock:15,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"digi-p2",storeId:"digistore-1",storeName:"DigiStore",nombre:"Tablet 10 pulgadas",precio:450000,descripcion:"Tablet Android 10 pulgadas, 4GB RAM, 64GB almacenamiento.",imagen:"https://picsum.photos/seed/digip2/400/400",stock:8,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"digi-p3",storeId:"digistore-1",storeName:"DigiStore",nombre:"Audifonos Gamer RGB",precio:95000,descripcion:"Audifonos gamer con microfono, sonido surround 7.1.",imagen:"https://picsum.photos/seed/digip3/400/400",stock:20,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"digi-p4",storeId:"digistore-1",storeName:"DigiStore",nombre:"Power Bank 20000mAh",precio:75000,descripcion:"Bateria portatil de carga rapida 20000mAh, 2 puertos USB.",imagen:"https://picsum.photos/seed/digip4/400/400",stock:25,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"digi-p5",storeId:"digistore-1",storeName:"DigiStore",nombre:"Camara Web Full HD",precio:120000,descripcion:"Camara web 1080p con microfono integrado para videollamadas.",imagen:"https://picsum.photos/seed/digip5/400/400",stock:12,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"digi-p6",storeId:"digistore-1",storeName:"DigiStore",nombre:"Soporte Celular Auto",precio:28000,descripcion:"Soporte magnetico para celular en auto, rotacion 360 grados.",imagen:"https://picsum.photos/seed/digip6/400/400",stock:40,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  // TECHPOINT
  {id:"tp-p1",storeId:"techpoint-1",storeName:"TechPoint",nombre:"Laptop Core i5 8GB",precio:1850000,descripcion:"Portatil Intel Core i5, 8GB RAM, 256GB SSD, pantalla 15.6 pulgadas.",imagen:"https://picsum.photos/seed/tpp1/400/400",stock:5,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"tp-p2",storeId:"techpoint-1",storeName:"TechPoint",nombre:"Impresora Multifuncional",precio:380000,descripcion:"Impresora laser multifuncional, imprime, escanea y copia.",imagen:"https://picsum.photos/seed/tpp2/400/400",stock:7,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"tp-p3",storeId:"techpoint-1",storeName:"TechPoint",nombre:"Router WiFi 6 Dual Band",precio:195000,descripcion:"Router WiFi 6 de doble banda, cobertura hasta 150m2.",imagen:"https://picsum.photos/seed/tpp3/400/400",stock:10,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"tp-p4",storeId:"techpoint-1",storeName:"TechPoint",nombre:"Monitor 24 pulgadas FHD",precio:520000,descripcion:"Monitor Full HD 24 pulgadas, panel IPS, 75Hz, HDMI y VGA.",imagen:"https://picsum.photos/seed/tpp4/400/400",stock:6,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"tp-p5",storeId:"techpoint-1",storeName:"TechPoint",nombre:"Disco Duro Externo 1TB",precio:165000,descripcion:"Disco duro externo USB 3.0, 1TB, compatible con PC y Mac.",imagen:"https://picsum.photos/seed/tpp5/400/400",stock:18,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"tp-p6",storeId:"techpoint-1",storeName:"TechPoint",nombre:"UPS 600VA",precio:220000,descripcion:"UPS regulador de voltaje 600VA para proteger equipos.",imagen:"https://picsum.photos/seed/tpp6/400/400",stock:9,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  // ELECTROMELGAR
  {id:"em-p1",storeId:"electromelgar-1",storeName:"ElectroMelgar",nombre:"Televisor Smart 50 pulgadas",precio:1250000,descripcion:"Smart TV 50 pulgadas 4K UHD, Android TV, WiFi integrado.",imagen:"https://picsum.photos/seed/emp1/400/400",stock:4,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"em-p2",storeId:"electromelgar-1",storeName:"ElectroMelgar",nombre:"Nevera 260 Litros",precio:1450000,descripcion:"Nevera no frost 260 litros, eficiencia energetica A+.",imagen:"https://picsum.photos/seed/emp2/400/400",stock:3,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"em-p3",storeId:"electromelgar-1",storeName:"ElectroMelgar",nombre:"Lavadora 8kg Automatica",precio:980000,descripcion:"Lavadora automatica 8kg, 12 programas de lavado.",imagen:"https://picsum.photos/seed/emp3/400/400",stock:5,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"em-p4",storeId:"electromelgar-1",storeName:"ElectroMelgar",nombre:"Equipo de Sonido 2000W",precio:650000,descripcion:"Equipo de sonido 2000W PMPO, Bluetooth, USB, radio FM.",imagen:"https://picsum.photos/seed/emp4/400/400",stock:6,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"em-p5",storeId:"electromelgar-1",storeName:"ElectroMelgar",nombre:"Aire Acondicionado 12000 BTU",precio:1350000,descripcion:"Aire acondicionado split 12000 BTU, inverter, bajo consumo.",imagen:"https://picsum.photos/seed/emp5/400/400",stock:4,categoria:"Tecnologia",activo:true,createdAt:new Date()},
  {id:"em-p6",storeId:"electromelgar-1",storeName:"ElectroMelgar",nombre:"Microondas 20 Litros",precio:285000,descripcion:"Microondas 20 litros, 700W, 5 niveles de potencia.",imagen:"https://picsum.photos/seed/emp6/400/400",stock:10,categoria:"Tecnologia",activo:true,createdAt:new Date()},`;

// Insert stores before closing ];
const storesEnd = c.lastIndexOf("];\n\nexport const DEMO_PRODUCTS");
const updated = c.slice(0, storesEnd) + newStores + "\n" + c.slice(storesEnd);

// Insert products before closing ];
const productsEnd = updated.lastIndexOf("];\n");
const final = updated.slice(0, productsEnd) + newProducts + "\n" + updated.slice(productsEnd);

fs.writeFileSync("lib/utils.ts", final, "utf8");
console.log("Done. Lines:", final.split("\n").length);