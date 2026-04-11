# 🔐 Guia rapida - Seed y entorno seguro

Este documento explica como configurar el entorno local sin exponer contrasenas reales en el repositorio.

## 1) Crear archivo `.env` local

En la carpeta `server/`, copia el ejemplo:

```bash
copy "server\.env.example" "server\.env"
```

> `server/.env` esta ignorado por git. No se sube al repo.

## 2) Configurar `DATABASE_URL`

Ejemplo local (PostgreSQL en 5432):

```env
DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/vibepulse_db"
```

## 3) Generar `SEED_USER_PASSWORD_HASH`

No guardes password en texto plano. Genera hash bcrypt:

```bash
node -e "console.log(require('./server/node_modules/bcryptjs').hashSync('TuPasswordSegura123!',10))"
```

Copia la salida y pegala en `server/.env`:

```env
SEED_USER_PASSWORD_HASH="$2a$10$..."
```

## 4) Ejecutar Prisma

Desde la raiz del proyecto:

```bash
npm --prefix server run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Si `prisma:migrate` te pide nombre de migracion, usa uno simple, por ejemplo: `init`.

## 5) Validar que todo levanta

```bash
npm run lint
npm run build
npm run dev
```

## Problemas comunes

- `P1001` (cannot reach db): puerto incorrecto o Postgres apagado.
- `P1000` (auth failed): usuario/password incorrectos en `DATABASE_URL`.
- Seed falla por hash: falta `SEED_USER_PASSWORD_HASH` en `server/.env`.

## Seguridad minima

- Nunca subir `server/.env`.
- Nunca subir passwords reales a docs/codigo.
- En `server/.env.example` dejar placeholders, no secretos reales.
