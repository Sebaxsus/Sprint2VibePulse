# 🎨 Decision Tecnica - Estandarizar en Tailwind

## ✅ Decision

Desde esta base del Sprint 2, el estandar para UI es:

- **Tailwind CSS para nuevos desarrollos**.
- Legacy en CSS Modules se mantiene temporalmente y se migra por etapas.

## 🤔 Por que se tomo esta decision

- Facilita colaboracion por tareas en paralelo.
- Reduce duplicacion de estilos y deuda tecnica.
- Hace mas rapido el code review del lider tecnico.
- Minimiza conflictos por nombres de clase y cascadas no deseadas.

## 🧾 Compatibilidad con el stack del enunciado

Esta decision **no altera la estructura tecnologica solicitada**:

- React + Vite + TypeScript siguen iguales en frontend.
- Node + Express + TypeScript + PostgreSQL + Prisma siguen iguales en backend.
- El enunciado no restringe una libreria de estilos concreta.

Tailwind se adopta como mejor practica para productividad y consistencia, no como cambio de arquitectura base.

## 🧩 Como convivir con legacy sin bloquear al equipo

- No reescribir todo de una vez.
- Cada issue nueva migra solo lo que toca.
- Componentes nuevos: Tailwind obligatorio.
- Refactors grandes: planificados por PR separados.

## 📐 Regla de implementacion

1. Reutilizar tokens del sistema (colores, tipografia, espaciado).
2. Evitar estilos inline salvo casos muy puntuales.
3. No introducir librerias de UI adicionales sin aprobacion.
4. Mantener naming y estructura acordada por el lider tecnico.

## 🔍 Verificacion minima en PR

- [ ] La UI nueva usa Tailwind.
- [ ] No se duplican tokens ya definidos.
- [ ] No se rompe desktop ni responsive basico.
- [ ] El PR referencia su issue con `Closes #N`.
