# Starter Kit

Starter kit moderno para construir aplicaciones full-stack con Laravel y React, enfocado en productividad, tipado estricto y buenas prácticas tanto en backend como en frontend.

## Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 + TypeScript, Inertia.js, Tailwind CSS
- **Autenticación**: Laravel Fortify + Socialite (Google OAuth)
- **UI**: Radix UI + componentes custom basados en shadcn/ui
- **Estado**: Zustand (tablas), hooks de React (estado local)
- **Testing**: PHPUnit (backend)

<!-- ======================================================== -->
<!-- INICIO: SECCIÓN DE INICIALIZACIÓN                        -->
<!-- Elimina esta sección después de inicializar el proyecto  -->
<!-- ======================================================== -->

## Inicialización del Proyecto

Al crear un nuevo proyecto basado en este starter kit, abre Claude Code y dile:

> "inicializa el proyecto siguiendo INIT.md"

Luego actualiza el README con la información de tu proyecto y ejecuta `bun run release`.

<!-- ======================================================== -->
<!-- FIN: SECCIÓN DE INICIALIZACIÓN                           -->
<!-- ======================================================== -->

## Empezar

1. Clona el repositorio.
2. Ejecuta la instalación inicial:

    ```bash
    composer setup
    ```

3. Abre el archivo `.env` y configura:
   - Conexión a la base de datos
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

4. Ejecuta las migraciones si es necesario:

    ```bash
    php artisan migrate
    ```

## Desarrollo

```bash
composer run dev
```

## Calidad de Código

```bash
# Backend
composer run lint
composer run test

# Frontend
bun run lint
bun run types
bun run format
```

## Testing

```bash
# PHPUnit
php artisan test
```

## Releases

```bash
# Patch (1.0.0 → 1.0.1)
bun run release

# Minor (1.0.0 → 1.1.0)
bun run release -- --minor

# Major (1.0.0 → 2.0.0)
bun run release -- --major
```

## Utiles

```bash
# Git merge Feature
git switch main
git merge --no-ff --no-edit BRANCH_NAME
git branch -d BRANCH_NAME
git push origin main
```
