# [Nombre del Proyecto]

> **Descripción breve del proyecto** — reemplaza esta línea con una descripción clara de qué hace la aplicación.

## 📋 Acerca de

[Describe el propósito de la aplicación, sus características principales y el público objetivo. 2-3 párrafos máximo.]

## ✨ Características del Proyecto

- [x] **Data Tables Server-side** — tablas genéricas con paginación, búsqueda y ordenamiento, caching automático
- [x] **Type-safe Routes** — rutas generadas automáticamente con Wayfinder, sin strings mágicos
- [x] **Autenticación** — Laravel Fortify + Google OAuth integrado
- [x] **Estado Reactivo** — Zustand para UI state + TanStack Query para caché
- [x] **Componentes UI** — shadcn/ui + Radix UI, Tailwind CSS 4 con configuración strict
- [x] **TypeScript Strict** — tipado strict en todo el stack, sin `any`
- [x] **Testing** — PHPUnit en backend, estructura lista para testing
- [ ] Nueva caracteristica
- [ ] Nueva caracteristica
- [ ] Nueva caracteristica
- [ ] Nueva caracteristica
- [ ] Nueva caracteristica

## 🛠️ Stack

- **Backend**: Laravel 13 (PHP 8.3+)
- **Frontend**: React 19 + TypeScript, Inertia.js 3, Tailwind CSS 4
- **Autenticación**: Laravel Fortify + Socialite (Google OAuth)
- **UI**: Radix UI + componentes custom basados en shadcn/ui
- **Estado**: Zustand (tablas), hooks de React (estado local)
- **Testing**: PHPUnit (backend)

<!-- ======================================================== -->
<!-- INICIO: SECCIÓN DE INICIALIZACIÓN                        -->
<!-- Elimina esta sección después de inicializar el proyecto  -->
<!-- ======================================================== -->

## 🚀 Inicialización (Solo para plantilla)

Si el repositorio fue creado desde una plantilla GitHub:

1. **Abre Claude Code** en la carpeta y solicita:

   ```
   inicializa el proyecto siguiendo INIT.md
   ```

2. **Actualiza este README**:
   - Reemplaza `[Nombre del Proyecto]` con el nombre real
   - Completa las secciones marcadas con `[...]`
   - Documenta las características principales
   - Actualiza requisitos e instrucciones específicas

3. **Crea el primer release**:

   ```bash
   git add .
   git commit -m "chore: initial commit"
   bun run release
   git push -u origin main
   ```

<!-- ======================================================== -->
<!-- FIN: SECCIÓN DE INICIALIZACIÓN                           -->
<!-- ======================================================== -->

## 📦 Instalación

### Requisitos

- PHP 8.3+
- Composer
- Node.js + Bun
- [Otros requisitos específicos]

### Pasos

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-proyecto>
   ```

2. Instala las dependencias:

   ```bash
   composer setup
   ```

3. Configura el archivo `.env`:

   ```bash
   cp .env.example .env
   ```

   - Conexión a la base de datos
   - `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`
   - [Otras variables de entorno necesarias]

4. Ejecuta las migraciones:

   ```bash
   php artisan migrate
   ```

## 🚀 Desarrollo

### Iniciar el servidor

```bash
composer run dev
```

La aplicación estará disponible en `http://localhost`

### Calidad de Código

```bash
# Backend
composer run lint
composer run test

# Frontend
bun run lint
bun run types
bun run format
```

### Testing

```bash
php artisan test
```

## 📝 Releases

El proyecto utiliza `bun run release` para versioning automático:

```bash
# Patch (1.0.0 → 1.0.1)
bun run release

# Minor (1.0.0 → 1.1.0)
bun run release -- --minor

# Major (1.0.0 → 2.0.0)
bun run release -- --major
```

## 📚 Documentación

- [Documentación del Backend](docs/backend.md) *(opcional)*
- [Documentación del Frontend](docs/frontend.md) *(opcional)*

## 🤝 Contribuciones

[Describe cómo pueden contribuir otros desarrolladores, o indica que es un proyecto personal.]

## 📄 Licencia

[MIT, Apache 2.0, u otra licencia elegida]

## 🔗 Enlaces Útiles

- [Repositorio](https://github.com/usuario/proyecto)
- [Issues](https://github.com/usuario/proyecto/issues)
- [Demo en vivo](https://ejemplo.com) *(opcional)*

---

**Última actualización**: 2026-04-09
