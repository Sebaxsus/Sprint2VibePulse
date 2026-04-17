# Sprint 2 - Base Architecture (Lider tecnico)

Este documento define la base tecnica para que el equipo trabaje por tareas sin romper integracion.

## 1) Estructura base obligatoria

Frontend:

- `client/src/components/catalog/` componentes compartidos de catalogo.
- `client/src/pages/` vistas por pantalla.
- `client/src/layouts/` shell comun (header/footer).
- `client/src/routes/` router y rutas tipadas (`paths.ts`).
- `client/src/services/` datos mock centralizados y servicios.
- `client/src/styles/global.css` tokens globales y directivas Tailwind.
- `client/tailwind.config.js` tema, fuentes y tokens del sistema.

Backend:

- `server/src/config/prisma.ts` cliente Prisma singleton.
- `server/src/controllers/` capa HTTP.
- `server/src/services/` capa de negocio y datos.
- `server/src/routes/` contrato de endpoints.

## 2) Convenciones tecnicas del sprint

- Frontend oficial: React + Vite + TypeScript + Tailwind.
- Rutas oficiales: `/`, `/catalogo`, `/producto/:id`.
- No hardcodear rutas: usar `ROUTES` y `catalogQuery`.
- No duplicar mocks: todo centralizado en `client/src/services/mockData.ts`.
- TypeScript estricto en todo el repo.

## 3) Reglas de PR para todo el equipo

- Cada PR debe referenciar su issue con formato `Closes #N`.
- Base branch obligatoria: `dev`.
- Prohibido hacer merge directo a `main`.
- Prohibido hacer merge local: solo PR para revision del lider tecnico.
- Si un cambio toca contratos compartidos, informar en descripcion del PR.

## 4) Ownership por personas

- Persona 1 (Santiago Rodriguez): arquitectura, setup, coordinacion e integracion.
- Persona 2 (Sebastian Ussa): hero y promociones.
- Persona 3 (Emmanuel Avellaneda): destacados y categorias.
- Persona 4 (Alessandri): grid visual y tarjetas.
- Persona 5 (Sebastian Garcia): logica del catalogo y estados.
