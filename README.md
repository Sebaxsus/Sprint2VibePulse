# ⚡ VibePulse — Sprint 2: Página Principal y Catálogo

> E-commerce moderno construido con React + Vite + TypeScript en el frontend, Node.js + Express + TypeScript en el backend, PostgreSQL como base de datos y Prisma como ORM.

---

## 📁 Estructura del Proyecto

```
ecommerce-vibe-pulse/
├── client/                          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── catalog/
│   │   │   │   ├── ProductCard.tsx        # Tarjeta de producto
│   │   │   │   ├── ProductCard.module.css
│   │   │   │   ├── ProductGrid.tsx        # Grid con skeleton loader
│   │   │   │   ├── ProductGrid.module.css
│   │   │   │   ├── CatalogFilters.tsx     # Sidebar de filtros
│   │   │   │   └── CatalogFilters.module.css
│   │   ├── pages/
│   │   │   ├── HomePage.tsx              # Página principal
│   │   │   ├── HomePage.module.css
│   │   │   ├── CatalogPage.tsx           # Catálogo con filtros
│   │   │   ├── CatalogPage.module.css
│   │   │   ├── ProductDetailPage.tsx     # Detalle de producto
│   │   │   └── ProductDetailPage.module.css
│   │   ├── layouts/
│   │   │   ├── MainLayout.tsx            # Navbar + Footer
│   │   │   └── MainLayout.module.css
│   │   ├── routes/
│   │   │   └── AppRouter.tsx             # React Router v6
│   │   ├── services/
│   │   │   ├── mockData.ts               # Mock data (12 productos, 6 categorías)
│   │   │   └── productService.ts         # Servicios con simulación de API
│   │   ├── hooks/
│   │   │   └── useProducts.ts            # Custom hooks React
│   │   ├── types/
│   │   │   └── index.ts                  # TypeScript interfaces
│   │   ├── styles/
│   │   │   └── global.css                # Tokens globales + reset
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                          # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── productController.ts      # CRUD productos
│   │   │   └── categoryController.ts     # CRUD categorías
│   │   ├── routes/
│   │   │   ├── products.ts
│   │   │   └── categories.ts
│   │   ├── middleware/
│   │   │   └── auth.ts                   # JWT middleware
│   │   ├── app.ts                        # Express setup
│   │   └── index.ts                      # Entry point
│   ├── tsconfig.json
│   └── package.json
│
├── prisma/
│   ├── schema.prisma                     # Modelos DB
│   └── seed.ts                           # Datos iniciales
│
├── package.json                          # Scripts raíz (monorepo)
└── README.md
```

---

## 🚀 Instalación y Ejecución

### 1. Prerrequisitos

- Node.js 18+
- PostgreSQL corriendo localmente (puerto 5432)
- npm, pnpm, bun o yarn

### 2. Clonar e instalar dependencias

```bash
# Instalar todas las dependencias (raíz + client + server)
pnpm run install:all
```

### 3. Variables de entorno

Crear `server/.env`:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/vibepulse_db"
JWT_SECRET="vibe-pulse-super-secret-2025"
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 4. Base de datos

```bash
# Crear DB y correr migraciones
pnpm run prisma:migrate

# Poblar con datos de prueba
pnpm run prisma:seed
```

### 5. Iniciar en desarrollo

```bash
# Levanta cliente (puerto 5173) y servidor (puerto 3001) simultáneamente
pnpm run dev
```

O por separado:

```bash
pnpm run dev:client   # → http://localhost:5173
pnpm run dev:server   # → http://localhost:3001
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

| Token               | Valor       | Uso                          |
|---------------------|-------------|------------------------------|
| `--vp-primary`      | `#FF4757`   | Rojo coral — CTAs, acentos   |
| `--vp-secondary`    | `#2F3542`   | Gris oscuro — hero, footer   |
| `--vp-accent`       | `#FFA502`   | Ámbar — badges, alertas      |
| `--vp-bg`           | `#FAFAF9`   | Fondo general                |
| `--vp-text`         | `#1A1A2E`   | Texto principal              |

### Tipografía

- **Display**: `Syne` (700–800) — Títulos y headings
- **Body**: `DM Sans` (400–600) — Texto general, UI

### Rutas

| Ruta             | Página                  |
|------------------|-------------------------|
| `/`              | Página Principal (Home) |
| `/catalogo`      | Catálogo completo       |
| `/catalogo?categoryId=1` | Catálogo filtrado |
| `/catalogo?search=query` | Búsqueda        |
| `/producto/:id`  | Detalle de producto     |

---

## ✅ Criterios de Aceptación Cubiertos

| #  | Criterio                                                        | Estado |
|----|-----------------------------------------------------------------|--------|
| 1  | Usuario puede visualizar la página principal                    | ✅     |
| 2  | Hero con mensaje promocional                                    | ✅     |
| 3  | Hero con botón de llamada a la acción                           | ✅     |
| 4  | Botón "Comprar ahora" redirige al catálogo                      | ✅     |
| 5  | Sección de productos destacados                                 | ✅     |
| 6  | Sección de categorías                                           | ✅     |
| 7  | Promociones u ofertas visibles (3 banners rotativos)            | ✅     |
| 8  | Menú de navegación visible y funcional                          | ✅     |
| 9  | Acceso al catálogo desde el home                                | ✅     |
| 10 | Catálogo en formato grid                                        | ✅     |
| 11 | Producto muestra imagen, nombre y precio                        | ✅     |
| 12 | Acción visible para ver detalle                                 | ✅     |
| 13 | Usuario puede seleccionar un producto                           | ✅     |
| 14 | Redirige a vista de detalle                                     | ✅     |
| 15 | Catálogo muestra varias categorías sin romper diseño            | ✅     |
| 16 | Mensaje adecuado si no hay productos                            | ✅     |
| 17 | No duplica productos                                            | ✅     |
| 18 | Imágenes cargan correctamente (con fallback)                    | ✅     |
| 19 | Diseño prioritariamente de escritorio                           | ✅     |
| 20 | Interfaz completamente en español                               | ✅     |
| 21 | Estados visuales al pasar el cursor (hover)                     | ✅     |
| 22 | Consistencia visual con el sistema general                      | ✅     |
| 23 | Layout soporta diferentes cantidades de productos               | ✅     |
| 24 | Navegación entre home y catálogo sin errores                    | ✅     |
| 25 | Se adapta a resoluciones menores                                | ✅     |

---

## 🔌 API Endpoints (Backend)

```
GET  /api/health
GET  /api/products?categoryId=&search=&minPrice=&maxPrice=&featured=&page=&limit=
GET  /api/products/featured
GET  /api/products/:id
GET  /api/categories
GET  /api/categories/:slug
```

---

## 👤 Usuarios de Prueba (Seed)

| Rol    | Email                      | Contraseña    |
|--------|----------------------------|---------------|
| ADMIN  | admin@vibepulse.com        | password123   |
| CLIENT | cliente@vibepulse.com      | password123   |

---

## 🤝 Convenciones del Equipo

- Todo el código en **TypeScript** estricto
- CSS con **CSS Modules** (`.module.css`)
- Nombres de rutas: `/`, `/catalogo`, `/producto/:id`
- Nombres de campos en español (UI) y camelCase (código)
- Mock data compartida en `services/mockData.ts`
- Variables CSS globales con prefijo `--vp-`
