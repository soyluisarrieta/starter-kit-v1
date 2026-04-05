# PENDIENTES

1. Actualizar a Laravel 13
2. Añadir reglas o SKILLS de IA para que el código sea siempre en inglés, pero UI/UX en español (url, ui, attr aliases, mensajes de error, etc)
3. Migrar tipo de id de usuarios a UUID, actualizando todo lo que dependa (migraciones, foreign keys, modelos, validaciones, configuración de spatie/laravel-permission, typescript)
4. Actualizar el README.md para que proporcione un checklist con los pasos previo al desarrollo del nuevo proyecto.
5. Si un usuario se registra con el formulario de contacto, no puede acceder usando SSO. Caso contrario lo mismo, no puede acceder usando el correo y una contraseña hasta no asignar una contraseña en la configuración del perfil.
6. Actualizar color theme y fuente tipográfica para Paylus.
7. Migrar de Lucide Icons a React Icons y crear carpeta de iconos para centralizar los iconos por grupos (navigation, layout, actions, etc) y exportar con alias para usar con nombres más idenitificaivos como: `export { HiHome as HomeIcon } from "react-icons/hi2"; export { FaUser as UserIcon } from "react-icons/fa";`. Además se debe actualizar todos los iconos del proyecto (son al rededor de 50 archivos) priorizando hero-icons 2 (outline) .
8. Revisar y mejorar sistema de registro de errores.
