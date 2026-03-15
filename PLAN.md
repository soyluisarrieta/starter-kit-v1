# Plan: Security Fixes, Backend Tests & Error Boundary

## Context

El boilerplate está funcional pero tiene dos vulnerabilidades de seguridad (password hardcodeado en creación de usuarios, descarga de avatar sin timeout), cobertura de tests backend limitada (solo auth y validación de DataTableRequest), y no tiene Error Boundary en React. Este plan corrige las vulnerabilidades, añade tests para los controllers sin cobertura y agrega un Error Boundary global.

---

## Commit 3: `test(users): add UserController feature tests`

**Crear**: `tests/Feature/UserControllerTest.php`

Setup: seed PermissionSeeder + RoleSeeder. Helper `actingAsWithPermission(...$permissions)`.

### Tests

**Index:**

- guests redirected to login
- users without `users.list` get 403
- users with permission can list (assertOk)
- `getJson()` returns JSON paginator structure (`data`, `current_page`, `per_page`, `total`)

**Store:**

- guests redirected
- without `users.create` → 403
- with permission → user created in DB
- password is NOT `qweqwe123` (verify the security fix)
- validates required fields (name, last_name, email)
- validates unique email

**Update:**

- guests redirected
- without `users.update` → 403
- with permission → DB updated
- validates required fields
- validates unique email (ignoring self)

**Destroy:**

- guests redirected
- without `users.delete` → 403
- with permission + correct password → user deleted
- requires current password (validation error without it)
- rejects wrong password

**Destroy Multiple:**

- deletes selected users with valid ids + password
- requires password
- validates ids exist in DB
- requires at least one id

**Notas clave:**

- Factory password por defecto es `'password'` → usar en CurrentPasswordRequest
- Route names: `users`, `users.store`, `users.update`, `users.destroy`, `users.destroyMultiple`
- UserRequest valida: name, last_name, email, avatar (via UserValidationRules trait)

---

## Commit 4: `test(roles): add RoleController feature tests`

**Crear**: `tests/Feature/Settings/RoleControllerTest.php`

Setup: seed permisos/roles. Helper con `roles.manage` permission.

### Testss

**Index:**

- guests redirected
- without `roles.manage` → 403
- with permission → assertOk
- response excludes super-admin role

**Store:**

- creates role with label + hex_color
- name = Str::slug(label)
- validates required fields
- validates unique label
- validates hex_color format (`/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/`)

**Update:**

- updates role label
- cannot update super-admin role (flash error)
- validates required fields

**UpdatePermission** (route `roles.update-permissions`):

- enable permission → role has it
- disable permission → role doesn't have it
- cannot modify super-admin permissions
- validates permission exists in DB

**Destroy:**

- deletes role with current password
- cannot delete super-admin
- cannot delete last non-super-admin role
- requires current password

**Nota**: RoleRequest tiene `authorize()` que también chequea `roles.manage` además del middleware.

---

## Commit 5: `test(data-table): add HasDataTable trait integration tests`

**Crear**: `tests/Feature/HasDataTableTest.php`

Usa la ruta de users (`getJson(route('users', [...]))`) con permisos para testear el comportamiento del trait.

### Testssss

- Default sort es id desc
- Sort by name asc funciona
- Invalid sort column falls back to default (no error)
- Search filtra resultados por nombre
- Search por ID numérico
- perPage respeta el valor (crear 15 users, perPage=10 → 10 en data)
- page=2 devuelve el subset correcto
- Search vacío devuelve todos (paginado)

---

## Commit 6: `test(socialite): add SocialiteController feature tests`

**Crear**: `tests/Feature/Auth/SocialiteTest.php`

Requiere mock de `Socialite::driver($provider)->user()`.

### Testsssss

- Redirect to Google → 302 con URL de Google OAuth
- Callback crea nuevo usuario desde provider
- Callback vincula usuario existente por email (actualiza sso_id/sso_provider)
- Callback loguea usuario SSO existente
- Callback redirige a login on failure (Socialite exception)
- Callback redirige a login cuando no hay email
- Avatar download failure no impide creación de usuario

**Mock pattern:**

```php
Socialite::shouldReceive('driver')->with('google')->andReturn($driver);
$driver->shouldReceive('user')->andReturn($socialiteUser);
```

---

## Commit 7: `feat(ui): add React Error Boundary component`

**Crear**: `resources/js/components/error-boundary.tsx`
**Modificar**: `resources/js/app.tsx`

Error Boundary (class component, requerido por React):

- `getDerivedStateFromError()` → captura error
- `componentDidCatch()` → log a console
- Fallback UI: card centrada con heading "Algo salió mal", botón "Recargar página" (`window.location.reload()`) y botón "Intentar de nuevo" (reset state)
- Styled con Tailwind (clases existentes del proyecto)

Integración en `app.tsx`: envolver `<App {...props} />` dentro de `<ErrorBoundary>`, dentro de `<QueryClientProvider>`.

---

## Verificación

1. **Security fixes**: `php artisan test` pasa, crear usuario desde UI y verificar que no tiene password `qweqwe123`
2. **Tests**: `php artisan test` — todos los tests nuevos pasan
3. **Error Boundary**: `bun run build` sin errores, verificar visualmente forzando un error en un componente (throw en render)
4. **Lint**: `bun run lint && bun run format && bun run types:check`
