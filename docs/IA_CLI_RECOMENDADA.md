# 🤖 Recomendacion IA para desarrollo (CLI)

Este documento propone una forma practica de usar IA en el flujo tecnico del equipo, cuidando costo, velocidad y trazabilidad.

## ✅ Recomendacion principal

Usar IA por **CLI** en lugar de GUI cuando sea posible.

- Mejor control del contexto tecnico por carpeta/proyecto.
- Menor ruido en prompts largos.
- Menor consumo de tokens en tareas repetitivas de codigo.
- Flujo natural con git, pruebas y comandos reales.

## 🧠 Opcion sugerida para este proyecto

### GPT-5.3 Codex via OpenCode (CLI)

- Muy buena calidad para desarrollo y refactor.
- Buena comprension de arquitectura, TypeScript, Prisma, Express y React.
- En CLI suele consumir ligeramente menos tokens que GUI en tareas equivalentes.
- Permite trabajar sobre archivos reales del repo y revisar cambios con comandos.
- Configuracion sugerida de razonamiento: **thinking en medium** (buen balance entre calidad, tiempo y costo de tokens).

## 💸 Sobre costo y disponibilidad

- Se puede vincular una cuenta gratuita (segun disponibilidad actual del proveedor).
- Normalmente hay una cuota de uso por ventanas de tiempo (por ejemplo, cada 5 horas), que puede cambiar.
- Recomendacion: reservar prompts largos para tareas de alto impacto tecnico.

## 🧪 Alternativas

### Claude (muy recomendado para codigo)

- Excelente calidad en arquitectura y razonamiento de cambios complejos.
- Muy bueno para analisis y documentacion tecnica.
- Normalmente orientado a planes de pago para uso continuo.

### Qwen (alternativa valida)

- Puede rendir bien en tareas puntuales.
- Requiere mayor supervision tecnica y validacion manual en cambios criticos.
- Recomendado para soporte, no para decisiones arquitectonicas sin revision.

## 🛡️ Buenas practicas al usar IA

- No pegar secretos (tokens, passwords, llaves privadas).
- Pedir cambios pequenos y verificables por commit.
- Ejecutar siempre `npm run lint` y `npm run build` despues de cambios.
- Revisar manualmente migraciones y cambios de schema.
- Mantener PR pequeno por issue (`Closes #N`).

## 📌 Politica sugerida para el equipo

- IA permitida como apoyo tecnico.
- Toda salida de IA requiere revision humana antes de merge.
- Prohibido merge directo: solo PR a `dev` con code review del lider tecnico.
