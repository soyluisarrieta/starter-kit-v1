# Merge con bifurcación visible

## 1. Ir a main y actualizar

```bash
git checkout main
git pull origin main
```

## 2. Hacer el merge con el commit generado

```bash
git merge --no-ff --no-edit [NOMBRE_DE_RAMA]
```

## 3. Subir main

```bash
git push origin main
```

## 4. Eliminar la rama local

```bash
git branch -d [NOMBRE_DE_RAMA]
```
