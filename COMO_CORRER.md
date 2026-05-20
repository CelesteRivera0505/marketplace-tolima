# Cómo correr Marketplace Tolima

## Pasos

1. Abre una terminal en VS Code  
   (Menú → Terminal → Nueva terminal)

2. Entra a la carpeta del proyecto:
   ```
   cd marketplace-tolima
   ```

3. Inicia el servidor:
   ```
   npm run dev
   ```

4. Abre en el navegador:
   ```
   http://localhost:3000
   ```

## Si hay error de módulos

```
npm install
npm run dev
```

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home marketplace |
| `/buscar` | Búsqueda con sidebar de categorías |
| `/login/comprador` | Login comprador |
| `/login/vendedor` | Login vendedor |
| `/registro/comprador` | Registro comprador |
| `/registro/vendedor` | Registro vendedor (3 pasos + datos de pago) |
| `/carrito` | Carrito de compras |
| `/checkout` | Pasarela de pago directa al vendedor |
| `/vendedor/dashboard` | Panel vendedor |
| `/vendedor/productos` | CRUD productos |
| `/vendedor/pedidos` | Gestión de pedidos |
