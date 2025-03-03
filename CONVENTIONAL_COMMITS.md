# Reglas de Conventional Commits

**Todos los mensajes de commit deben ser en inglés** y seguir la siguiente estructura:

## Componentes del Commit

1. **Tipo**: Indica el tipo de cambio que se está realizando. Los tipos permitidos son:
   - `feat`: Nuevas características.
   - `fix`: Correcciones de errores.
   - `docs`: Cambios en la documentación.
   - `style`: Cambios que no afectan el significado del código (formato, espacios en blanco, etc.).
   - `refactor`: Cambios en el código que no corrigen errores ni añaden funcionalidades.
   - `perf`: Mejoras de rendimiento.
   - `test`: Añadir o corregir pruebas.
   - `build`: Cambios que afectan el sistema de construcción o dependencias externas.
   - `ci`: Cambios en los archivos de configuración de integración continua.
   - `chore`: Tareas de mantenimiento.
   - `revert`: Revertir cambios anteriores.

2. **Alcance** (opcional): Indica la sección del código afectada por el cambio. Por ejemplo, `auth`, `ui`, `api`, etc.

3. **Descripción**: Breve descripción del cambio en tiempo presente e imperativo. Por ejemplo, "añadir botón de inicio de sesión" en lugar de "añadido botón de inicio de sesión".

4. **Cuerpo** (opcional): Proporciona información adicional sobre el cambio. Puede incluir motivación y contexto.

5. **Pie** (opcional): Información adicional como referencias a issues, cambios importantes (BREAKING CHANGE), etc.

## Ejemplos

- `feat(auth): añadir autenticación de dos factores`
- `fix(ui): corregir error en el formulario de registro`
- `docs: actualizar guía de contribución`
- `style: ajustar formato de código`
- `refactor: simplificar lógica de autenticación`
- `perf: mejorar rendimiento de la carga de datos`
- `test: añadir pruebas unitarias para el módulo de usuarios`
- `build: actualizar dependencias`
- `ci: configurar pipeline de integración continua`
- `chore: eliminar archivos temporales`
- `revert: revertir commit anterior que introdujo un error`

## Herramientas Recomendadas

- **Commitlint**: Valida que los mensajes de commit cumplan con la convención.
- **Husky**: Permite configurar hooks de Git para validar commits antes de ser confirmados.
- **Standard Version**: Automatiza la generación de changelogs y versiones basadas en los commits.

## Recursos Adicionales

- [Documentación Oficial de Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Cheatsheet de Conventional Commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)

---

**Importante**: Todos los commits que no sigan esta convención serán rechazados. Asegúrate de revisar y seguir estas reglas antes de realizar cualquier commit.
