# Theme

Sistema de tema visual del starter kit. Basado en TailwindCSS 4 + variables CSS, con modo claro/oscuro vía la clase `.dark` en `<html>`.

## Dónde vive

| Archivo | Qué define |
| ------- | ---------- |
| [resources/css/app.css](../resources/css/app.css) | Paleta completa, light + dark, radius, fuente, neutrals |
| [resources/views/app.blade.php](../resources/views/app.blade.php) | Background inline (anti-FOUC) y carga de fuente |

## Estructura

El tema está dividido en tres bloques en `app.css`:

1. **`@theme { ... }`** — define las **CSS custom properties que Tailwind genera como utilities** (`bg-primary`, `text-foreground`, etc). Cada `--color-*` apunta a una variable de runtime (`--primary`, `--background`, etc.) que se sobrescribe según el modo.
2. **`:root { ... }`** — valores para **modo claro**.
3. **`.dark { ... }`** — valores para **modo oscuro** (sobrescribe `:root`).

> Para cambiar un color, edita el valor en `:root` y `.dark`. Para añadir un color nuevo a las utilities de Tailwind, declara su variable runtime en ambos bloques y expón el `--color-*` en `@theme`.

## Paleta Paylus

Tema cálido sobre fondo neutro con tinte púrpura sutil. Primary naranja/coral, charts en escala verde.

### Tokens semánticos

| Token | Light | Dark | Uso |
| ----- | ----- | ---- | --- |
| `background` | `oklch(1 0.00011 271.152)` | `oklch(20% 0 280)` | Fondo de página (con tinte púrpura muy sutil) |
| `foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Texto principal |
| `card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Fondo de cards/superficies elevadas |
| `popover` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Fondo de popovers/dropdowns |
| `primary` | `oklch(66.903% 0.18082 36.878)` | `oklch(64.834% 0.17757 33.548)` | **Naranja/coral Paylus** — botones primarios, links, énfasis |
| `primary-foreground` | `oklch(1 0 0)` | `oklch(1 0 0)` | Texto sobre primary (siempre blanco) |
| `secondary` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | Botones secundarios |
| `muted` | `oklch(96.424% 0.00425 271.37)` | `oklch(23.138% 0 280)` | Fondos sutiles |
| `accent` | `oklch(96.424% 0.00425 271.37)` | `oklch(23.138% 0 280)` | Hover states |
| `destructive` | `oklch(0.57 0.21 25.2)` | `oklch(0.57 0.21 25.2)` | Acciones destructivas (rojo unificado) |
| `border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` | Bordes generales |
| `input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` | Bordes de inputs |
| `ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` | Focus rings |

### Sidebar

Tokens dedicados para el sidebar (con tinte azul/púrpura más marcado):

| Token | Light | Dark |
| ----- | ----- | ---- |
| `sidebar` | `oklch(0.96 0.00354 248.563)` | `oklch(23% 0 280)` |
| `sidebar-primary` | `oklch(66.903% 0.18082 36.878)` (= primary) | `oklch(64.834% 0.17757 33.548)` (= primary) |
| `sidebar-accent` | `oklch(92.3% 0.00425 271.37)` | `oklch(25.8% 0 280)` |
| `sidebar-border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |

### Charts

Paleta verde escalonada (light = oscura, dark = misma — los charts no cambian entre modos):

| Token | Valor |
| ----- | ----- |
| `chart-1` | `oklch(0.871 0.15 154.449)` (verde claro) |
| `chart-2` | `oklch(0.723 0.219 149.579)` |
| `chart-3` | `oklch(0.627 0.194 149.214)` |
| `chart-4` | `oklch(0.527 0.154 150.069)` |
| `chart-5` | `oklch(0.448 0.119 151.328)` (verde oscuro) |

### Neutrals (paleta extra)

Definida directo en `@theme` (no como token semántico). Disponible como `bg-neutral-100`, `text-neutral-500`, etc. Útil cuando necesitas grises con tinte púrpura sutil sin pasar por los tokens semánticos:

```text
neutral-100  oklch(94%   0 280)
neutral-200  oklch(89.2% 0 280)
neutral-300  oklch(84%   0 280)
neutral-400  oklch(67.8% 0 280)
neutral-500  oklch(52.6% 0 280)
neutral-600  oklch(40.9% 0 280)
neutral-700  oklch(34.1% 0 280)
neutral-800  oklch(23.9% 0 280)
neutral-900  oklch(17.5% 0 280)
```

## Otras propiedades

| Token | Valor | Uso |
| ----- | ----- | --- |
| `--radius` | `0.875rem` | Border radius base. Se derivan `--radius-sm` (-4px), `--radius-md` (-2px), `--radius-lg` (= base) |
| `--font-sans` | `Instrument Sans, ui-sans-serif, system-ui, ...` | Fuente del proyecto. Se carga vía `fonts.bunny.net` en [app.blade.php](../resources/views/app.blade.php). **Sustituible por proyecto.** |

## Cómo personalizar para un nuevo proyecto

1. **Cambiar el primary**: edita `--primary`, `--primary-foreground`, `--sidebar-primary` y `--sidebar-primary-foreground` en `:root` y `.dark`.
2. **Cambiar el background tint**: edita `--background` (root y dark) y el `<style>` inline en [app.blade.php](../resources/views/app.blade.php) para evitar FOUC.
3. **Cambiar la fuente**: actualiza `--font-sans` en `@theme` y el `<link>` de Bunny Fonts en `app.blade.php`.
4. **Cambiar charts**: edita `--chart-1` a `--chart-5` (light + dark, o solo light si quieres misma paleta).

> Mantén el mismo set de tokens semánticos — los componentes de shadcn/ui los referencian por nombre. Cambiar los **valores** es seguro; cambiar los **nombres** rompe los componentes.

## Anti-FOUC

[app.blade.php](../resources/views/app.blade.php) tiene un `<style>` inline que setea `background-color` en `<html>` para light y dark **antes** de que cargue Tailwind. Si cambias el `--background` de la paleta, **actualiza también este estilo inline** para evitar el flash de fondo blanco mientras carga la página.
