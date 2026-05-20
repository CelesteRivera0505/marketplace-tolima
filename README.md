# 🛒 Marketplace Tolima

Plataforma marketplace para pequeños comercios locales del departamento del Tolima, Colombia.

## 🚀 Cómo ejecutar

```bash
# 1. Instalar dependencias (ya instaladas)
npm install

# 2. Configurar Firebase (opcional para demo)
# Edita .env.local con tus credenciales de Firebase

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abre **http://localhost:3000** en tu navegador.

## 📁 Estructura

```
app/
├── (marketplace)/     # Home y páginas públicas con Header/Footer
├── (auth)/            # Login y registro (sin Header)
├── vendedor/          # Panel vendedor (sidebar)
├── tienda/[id]/       # Perfil de tienda
├── producto/[id]/     # Detalle de producto
├── buscar/            # Búsqueda y filtros
└── carrito/           # Carrito de compras
```

## 👥 Roles

| Rol | Ruta login | Panel |
|-----|-----------|-------|
| Comprador | `/login/comprador` | Home + carrito |
| Vendedor | `/login/vendedor` | `/vendedor/dashboard` |

## 🔥 Firebase

Para activar autenticación y base de datos real:
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Activa **Authentication** (Email/Password)
3. Activa **Firestore Database**
4. Copia las credenciales en `.env.local`

Sin Firebase configurado, la app funciona con datos demo.

## 🛠 Tecnologías

- Next.js 14 + TypeScript
- Tailwind CSS
- Firebase Auth + Firestore
- Framer Motion
- Lucide React Icons
- React Hot Toast
