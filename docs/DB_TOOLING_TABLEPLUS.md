# 🗃️ DB Tooling - TablePlus como opcion recomendada

## ✅ Recomendacion del proyecto

Para el Sprint 2 se recomienda usar **TablePlus** en vez de pgAdmin.

## 🔎 Motivos

- Menor consumo de recursos para equipos de clase.
- Curva de uso mas simple para consultas y revision rapida.
- Conexion y exploracion de tablas mas directa para validar seed y filtros.

## ⚙️ Conexion sugerida

- Host: `localhost`
- Port: `5432`
- Database: `vibepulse_db`
- User: el definido en tu PostgreSQL local
- Password: el definido en tu PostgreSQL local

`DATABASE_URL` debe coincidir con `server/.env`.

## 🧪 Checklist rapido en TablePlus

- [ ] Ver tabla `User` con roles `ADMIN` y `CLIENT`.
- [ ] Ver tabla `Category` con categorias del sprint.
- [ ] Ver tabla `Product` con datos mock/seed.
- [ ] Probar query filtrada por `categoryId`.

## 📝 Nota

Si alguien del equipo usa pgAdmin no es bloqueo, pero la guia oficial de soporte del lider tecnico sera TablePlus.
