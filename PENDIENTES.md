# PENDIENTES

1. Migrar tipo de id de usuarios a UUID, actualizando todo lo que dependa (migraciones, foreign keys, modelos, validaciones, configuración de spatie/laravel-permission, typescript)
2. Actualizar el README.md para que proporcione un checklist con los pasos previo al desarrollo del nuevo proyecto.
3. Si un usuario se registra con el formulario de contacto, no puede acceder usando SSO. Caso contrario lo mismo, no puede acceder usando el correo y una contraseña hasta no asignar una contraseña en la configuración del perfil.
4. Actualizar color theme y fuente tipográfica para Paylus.
5. Migrar de Lucide Icons a React Icons y crear carpeta de iconos para centralizar los iconos por grupos (navigation, layout, actions, etc) y exportar con alias para usar con nombres más idenitificaivos como: `export { HiHome as HomeIcon } from "react-icons/hi"; export { FaUser as UserIcon } from "react-icons/fa";`. Además se debe actualizar todos los iconos del proyecto (son al rededor de 50 archivos) priorizando hero-icons (outline) .

# PROTOCOLO CONSTANTE
Ult. Actualización: Marzo 25 - 2026

1. Verificar o Actualizar nueva versión de Laravel o React
