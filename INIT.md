# Inicialización del Proyecto

> Instrucciones para el agente de IA. Ejecuta cada paso en orden y confirma antes de continuar.

## Pasos

1. **Eliminar tags git del starter kit** (solo local, no remoto):
   ```
   git tag -l | xargs git tag -d
   ```

2. **Actualizar versión** en `package.json`: cambiar `"version"` a `"0.1.0"`.

3. **Eliminar `CHANGELOG.md`** si existe.

4. **Limpiar `README.md`**: eliminar el bloque completo entre los comentarios HTML
   `<!-- INICIO: SECCIÓN DE INICIALIZACIÓN -->` y `<!-- FIN: SECCIÓN DE INICIALIZACIÓN -->`,
   incluyendo los propios comentarios y la línea en blanco que los rodea.

5. **Eliminar este archivo** (`INIT.md`).

6. Informar al usuario que la inicialización está completa y que debe:
   - Actualizar `README.md` con el nombre y descripción de su proyecto
   - Ejecutar `bun run release` para generar el primer release
