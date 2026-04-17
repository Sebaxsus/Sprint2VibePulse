# 🔀 Flujo oficial - Issues + PR a `dev`

## 🧭 Regla principal

Todo trabajo se gestiona por issue y se integra por PR.

- ✅ Base branch para PR: `dev`
- ❌ Prohibido merge directo a `main`
- ❌ Prohibido merge local sin revision

## 🪜 Paso a paso

1. Revisar el tablero de issues y tomar una asignada.
2. Crear rama desde `dev`:

```bash
git checkout dev
git pull origin dev
git checkout -b feat/issue-<N>-descripcion-corta
```

3. Implementar solo el alcance de la issue.
4. Ejecutar validaciones:

```bash
npm run lint
npm run build
```

5. Commit con mensaje claro.
6. Push de rama y crear PR contra `dev`.

## 🧷 Requisito obligatorio en descripcion del PR

Incluir referencia exacta al issue:

```txt
Closes #N
```

## 🧾 Plantilla corta de PR

```md
## 🎯 Issue
Closes #N

## ✅ Que se hizo
- Punto 1
- Punto 2

## 🧪 Validacion
- [x] npm run lint
- [x] npm run build

## 📸 Evidencia (si aplica)
- Capturas / video
```

## 🔒 Regla para el equipo

Nadie hace merge directo.  
Solo se abre PR y se espera aprobacion del lider tecnico (Santiago).
