# Lanzador de aplicaciones adaptable

## Resultado
- En móvil, la página se verá como una pantalla de inicio: iconos grandes en cuadrícula, nombre debajo y acceso con un toque.
- En escritorio, se verá como un lanzador de apps inspirado en macOS: iconos amplios, ordenados y con una presentación más ligera que las tarjetas actuales.
- Se conservarán las opciones de administrar, añadir, editar, eliminar y restablecer aplicaciones.

## Gestión de iconos
- Cada aplicación podrá usar un icono del catálogo actual o una imagen personalizada subida desde el dispositivo.
- La imagen tendrá vista previa, opción para reemplazarla o quitarla y validación de formato/tamaño.
- Los iconos personalizados se guardarán junto con las aplicaciones en el navegador, manteniendo el funcionamiento estático y compatible con GitHub Pages.
- Las aplicaciones existentes conservarán sus iconos actuales automáticamente.

## Comportamiento visual
- Móvil: cuadrícula compacta de cuatro columnas cuando haya espacio, nombres legibles de hasta dos líneas y controles de edición accesibles.
- Escritorio: cuadrícula centrada y espaciosa, iconos con acabado tipo app, nombre y categoría, con interacción suave al pasar el cursor.
- El modo administración mostrará acciones claras sin impedir distinguir ni organizar las aplicaciones.
- El fondo, cabecera y controles se simplificarán para reforzar la sensación de escritorio/pantalla de inicio.

## Detalles técnicos
- Ampliar el modelo de aplicación con un campo opcional para la imagen personalizada.
- Actualizar el formulario para admitir archivos PNG, JPG o WebP y convertirlos a una imagen local persistente.
- Rediseñar el componente de aplicación con variantes adaptables a móvil y escritorio.
- Ajustar la cuadrícula principal, estados vacíos, botones y estilos globales con los tokens visuales existentes.
- Mantener enlaces externos en pestaña nueva y el despliegue estático actual.

## Validación
- Comprobar creación, edición, eliminación y restablecimiento con iconos del catálogo y personalizados.
- Revisar visualmente móvil y escritorio, incluidos textos largos y modo administración.
- Confirmar que la página compila sin errores y que el enlace de Gestión de Facturas sigue correcto.
