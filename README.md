# Nombre del Proyecto 🎉

Aquí presentamos una breve descripción de tu fascinante proyecto. ¿Qué resuelve? ¿Qué hace único a este proyecto?

## 🚀 Índice

- [Nombre del Proyecto 🎉](#nombre-del-proyecto-)
  - [🚀 Índice](#-índice)
  - [🎬 Comenzando](#-comenzando)
    - [💻 Requisitos previos](#-requisitos-previos)
    - [⚙️ Instalación](#️-instalación)
  - [📚 Tecnologías](#-tecnologías)
  - [🌟 Características](#-características)
  - [🏗️ Arquitectura de la Aplicación](#️-arquitectura-de-la-aplicación)
    - [📁 Estructura del directorio](#-estructura-del-directorio)
  - [Autores](#autores)

## 🎬 Comenzando

### 💻 Requisitos previos

Antes de comenzar a trabajar con este proyecto, asegúrate de tener Node.js y npm para gestionar las dependencias y ejecutar scripts. Asegúrate de tenerlos instalados en tu sistema. Puedes descargar NodeJS desde [nodejs.org](https://nodejs.org/), npm viene con NodeJS.

Para verificar que NodeJS y npm están instalados, puedes ejecutar los siguientes comandos en tu terminal:

```bash
node -v
npm -v
```

Asegurate de tener las versiones de [node](https://nodejs.org/) y [npm](https://docs.npmjs.com/try-the-latest-stable-version-of-npm) actualizadas.

### ⚙️ Instalación

A continuación se explica paso a paso cómo configurar un entorno de desarrollo:

1. Clona este repositorio
2. Accede al repositorio:

    ```bash
    cd nameApp
    ```

3. Genera el archivo .env ejecuntado el siguiete comando:

    ```bash
    cp .env.example .env
    ```

4. Instala las dependencias ejecuntando el siguiente comando:

    ```bash
    npm install
    ```

5. Ejecutar la aplicación:

    ```bash
    npm run dev
    ```

    Esto iniciará la aplicación en un servidor local y deberías poder acceder a ella en tu navegador en <http://localhost:5173/>.

¡Ahora estás listo para comenzar a trabajar en el proyecto utilizando npm como gestor de paquetes!

## 📚 Tecnologías

Este Kit Starter utiliza las siguientes tecnologías con las versiones más actualizadas:

|  | Nombre | Descripción |
| --- | --- | --- |
| 1 | [⚛️React](https://reactjs.org/) | Biblioteca de JavaScript para construir interfaces de usuario. |
| 2 | [🟦Typescript](https://www.typescriptlang.org/) | Lenguaje de programación estático y de tipado fuerte basado en JavaScript. |
| 3 | [🚀Vite](https://vitejs.dev/) | Herramienta de desarrollo rápida y flexible para aplicaciones web. |
| 4 | [🚨ESLint](https://eslint.org/) | Herramienta de análisis de código estático para identificar patrones problemáticos encontrados en el código JavaScript. |
| 5 | [🔳Shadcn](https://nextui.dev/) | Colección de componentes de interfaz de usuario accesibles y personalizables. |
| 6 | [➰TailwindCSS](https://tailwindcss.com/) | Framework CSS de utilidad de última generación para crear rápidamente interfaces de usuario personalizadas. |
| 7 | [🥢Wouter](https://github.com/molefrog/wouter) | Enrutador minimalista de JavaScript para aplicaciones modernas. |
| 8 | [🌐Axios](https://axios-http.com/) | Cliente HTTP basado en promesas utilizado para realizar peticiones HTTP a servidores, lo que facilita la interacción con API. |
| 9 | [🐻Zustand](https://zustand-demo.pmnd.rs/) | Pequeña, rápida y escalable librería de gestión de estado que permite administrar el estado de la aplicación de manera sencilla y efectiva. |
| 10 | [⚙️React_Query](https://tanstack.com/query/latest/docs/react/overview) | Biblioteca de gestión de datos que simplifica la gestión del estado global y las solicitudes a APIs, mejorando la eficiencia y la experiencia del usuario. |
| 11 | [📋Formik](https://formik.org/) | Biblioteca para la gestión de formularios que simplifica la validación, el seguimiento de cambios y la obtención de datos de formularios de manera eficiente. |
| 12 | [🔍Yup](https://github.com/jquense/yup) | Biblioteca de validación utilizada comúnmente con Formik para definir esquemas de validación de datos en formularios. |
| 13 | [⭐Lucide_Icons](https://lucide.dev/icons/) | Colección de iconos ligeros y minimalistas para aplicaciones web. |
| 14 | [⏳nProgress](https://ricostacruz.com/nprogress/) | Biblioteca para loader o barra de progreso delgadas como YouTube. |
| 15 | [🔔Sonner](https://sonner.emilkowal.ski/) | Biblioteca para generar toast de notificaciones. |
| 16 | [📆MomentJS](https://momentjs.com/) | Analizar, validar, manipular, formatear y mostrar fechas y horas en javascript. |

## 🌟 Características

- ### Sistema de login

  - [ ] Formularios de inicio de sesión ~~y registro~~.
  - [ ] Cerrar sesión.
  - [ ] Cambiar contraseña.
  - [ ] Recuperación contraseña.
  - [ ] Recordar usuario.
  - [ ] Integración con Gmail.

- ### Panel de control

  - [ ] Navegación intuitiva y menús desplegables.
  - [ ] Página de bienvenida.
  - [ ] Permisos administrativos.
  - [ ] Gestión de perfil de usuario.

- ### Gestion de contenido (usuarios)

  - [ ] Mostrar todos
  - [ ] Mostrar detalles por id
  - [ ] Crear nuevo
  - [ ] Editar uno
  - [ ] Eliminar uno
  
## 🏗️ Arquitectura de la Aplicación

Nuestra aplicación sigue una arquitectura modular basada en componentes utilizando React.

El código se divide en módulos separados según su funcionalidad, lo que facilita el mantenimiento y la escalabilidad del código. Cada módulo tiene su propio conjunto de componentes, servicios y estado.

### 📁 Estructura del directorio

```bash
    📂 src/
    ├── 🧩 components/
    │   ├── 📁 layout/ # Componentes de layout
    │   │   ├── AdminLayout.tsx
    │   │   ├── GuestLayout.tsx
    │   │   ├── MasterLayout.tsx
    │   │   └── PublicLayout.tsx
    │   │
    │   ├── 📁 pages/ # Componentes de página
    │   │   ├── Authenticating.tsx
    │   │   ├── DashboardPage.tsx
    │   │   ├── HomePage.tsx
    │   │   ├── LoginPage.tsx
    │   │   ├── UserPage.tsx
    │   │   └── 📁 errors/ # Componentes de error
    │   │       └── NotFound.tsx
    │   │
    │   ├── 📁 ui/ # Componentes de interfaz de usuario reutilizables
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── drawer.tsx
    │   │   ├── select.tsx
    │   │   └── ...
    │   │
    │   ├── 📁 modules/ # Componentes específicos de módulos
    │   │   └── ...
    │   │
    │   └── 📁 icons/ # Componentes de iconos y logos personalizados
    │
    ├── 🧲 hooks/ # Hooks personalizados
    │   ├── useAuth.ts
    │   ├── useCheckAuth.ts
    │   ├── useMediaQuery.tsx
    │   └── ...
    │
    ├── 📚 lib/ # Configuraciones y utilidades
    │   ├── axios.ts
    │   ├── react-query.ts
    │   ├── utils.ts
    │   ├── wouter-routes.ts
    │   └── ...
    │
    ├── 🌐 services/ # Servicios para solicitudes a la API
    │   ├── authServices.ts
    │   ├── userServices.ts
    │   ├── diaryServices.ts
    │   └── ...
    │
    ├── 🏪 store/ # Configuración del estado global
    │   ├── AuthStore.ts
    │   ├── ThemeModeStore.ts
    │   ├── PreferencesStore.ts
    │   └── ...
    │
    ├── 🌐 App.tsx # Contiene la lógica principal de enrutamiento y autenticación
    ├── 📜 constants.ts # Todas las constantes utilizadas en la aplicación
    ├── 🎨 global.css # Estilos globales y punto de entrada para Tailwind CSS
    ├── 🚀 main.tsx # Punto de entrada principal con todos los providers
    └── 📚 types.d.ts # Definiciones de tipos globales
```

## Autores

- **Luis Arrieta A.** - *Desarrollador web* ([@SoyLuisArrieta](https://github.com/soyluisarrieta))
