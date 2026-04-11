# ⚡ VibePulse - Sprint 2 Base del Equipo

Proyecto academico de **E-commerce web de ropa juvenil**.  
Este repositorio contiene la base tecnica para el Sprint 2 (Home + Catalogo), preparada para trabajo por equipo con arquitectura limpia, flujo de issues y PRs controlado.

## 🎯 Objetivo de esta base

- Estandarizar arquitectura y entorno para que cada persona implemente su tarea sin romper integracion.
- Reducir deuda tecnica del codigo legacy.
- Dejar reglas claras de colaboracion para revisar en `dev` antes de cualquier merge final.

## 🧱 Stack oficial

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM

## ✅ Por que React + Vite

- Vite: arranque rapido, hot reload inmediato, configuracion simple para trabajo modular.
- React: componentes reutilizables y separacion por pantallas para repartir tareas por sprint.
- TypeScript: tipado fuerte, menos errores en integracion, mejor contrato entre equipos.

## ✅ Por que se estandarizo Tailwind (y no CSS legacy)

- El codigo legacy tenia estilos dispersos y repetidos, lo que elevaba costo de mantenimiento.
- Tailwind acelera desarrollo por tareas cortas y reduce conflictos de estilos en PRs paralelos.
- Permite que diseno base, spacing, tipografia y colores se apliquen con consistencia.
- Facilita code review: se ve rapido si un componente respeta o no el design system.

Tailwind **no cambia la estructura de tecnologias del proyecto** porque el enunciado no obliga una herramienta especifica de estilos.
Se mantiene intacto el stack oficial y solo se optimiza la capa visual para mejorar velocidad y mantenibilidad.

> Nota: existen archivos legacy en CSS Modules que se iran migrando por etapas. Desde este punto, el **estandar para nuevos cambios es Tailwind**.

## 📁 Estructura principal

```txt
ecommerce-vibe-pulse/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── types/
│   ├── tailwind.config.cjs
│   ├── postcss.config.cjs
│   └── vite.config.ts
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   └── middleware/
│   └── .env.example
├── prisma/
└── docs/
```

## 🚀 Setup rapido

### 1) Requisitos
- Node.js 18+
- PostgreSQL local

### 2) Instalar dependencias

```bash
npm run install:all
```

### 3) Variables de entorno

Copiar `server/.env.example` a `server/.env` y completar:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/vibepulse_db"
JWT_SECRET="cambia-este-secreto-en-produccion"
SEED_USER_PASSWORD_HASH="$2a$10$REEMPLAZA_ESTE_HASH_BCRYPT"
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Generar hash bcrypt para `SEED_USER_PASSWORD_HASH`:

```bash
node -e "console.log(require('./server/node_modules/bcryptjs').hashSync('tuPasswordSegura',10))"
```

### 4) Base de datos

```bash
npm run prisma:migrate
npm run prisma:seed
```

### 5) Desarrollo

```bash
npm run dev
```

Por separado:

```bash
npm run dev:client   # React + Vite en http://localhost:5173
npm run dev:server   # API en http://localhost:3001
```

## 🧪 Calidad

```bash
npm run lint
npm run build
```

## 🗄️ Herramienta recomendada para DB

Se prioriza **TablePlus** sobre pgAdmin para este sprint:

- Menos pesada y mas rapida para consultas puntuales.
- UI mas simple para estudiantes cuando se trabaja por tareas cortas.
- Mejor flujo para revisar tablas y datos seed sin sobrecargar la maquina.

Guia: `docs/DB_TOOLING_TABLEPLUS.md`

## 🔀 Flujo de trabajo con Issues y PR

1. Tomar una issue asignada (`#N`).
2. Crear rama desde `dev`.
3. Implementar solo el alcance de la issue.
4. Abrir PR contra `dev` con referencia `Closes #N`.
5. Esperar revision del lider tecnico.

⚠️ Regla estricta: **no hacer merge directo**. Solo PR para revision.

Guia completa: `docs/GIT_ISSUES_PR_FLOW.md`

## 👥 Distribucion del Sprint 2

- Persona 1 - Santiago Rodriguez (lider tecnico)
- Persona 2 - Sebastian Ussa
- Persona 3 - Emmanuel Avellaneda
- Persona 4 - Alessandri
- Persona 5 - Sebastian Garcia

Issues por persona: documentos locales del lider tecnico (no versionados).

## 📚 Documentacion clave

- `docs/SPRINT2_BASE_ARCHITECTURE.md`
- `docs/LEGACY_REFACTOR_REPORT.md`
- `docs/TAILWIND_MIGRATION_DECISION.md`
- `docs/DB_TOOLING_TABLEPLUS.md`
- `docs/GIT_ISSUES_PR_FLOW.md`
- `docs/SEED_Y_ENTORNO_SEGURO.md`
