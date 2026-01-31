# Starter Kit

Starter kit moderno para construir aplicaciones full-stack con Laravel y React, enfocado en productividad, tipado estricto y buenas prácticas tanto en backend como en frontend.

## Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 + TypeScript, Inertia.js, Tailwind CSS
- **Autenticación**: Laravel Fortify + Socialite (Google OAuth)
- **UI**: Radix UI + componentes custom basados en shadcn/ui
- **Estado**: Zustand (tablas), hooks de React (estado local)
- **Testing**: PHPUnit (backend)

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
