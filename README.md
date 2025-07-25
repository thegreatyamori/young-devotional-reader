# Young Devotional Reader

Una aplicación web simple para leer devocionales diarios. Diseñada especialmente para jóvenes, con una interfaz moderna y fácil de usar.

## Características

- 📖 Lectura diaria de devocionales
- 📱 Diseño responsivo para móviles y escritorio
- 📅 Navegación entre fechas
- 🎨 Interfaz tipo journal, amigable para jóvenes
- ⚡ Construido con Vite para máximo rendimiento

## Tecnologías

- Vite
- JavaScript (Vanilla)
- Marked.js para renderizado de Markdown
- Day.js para manejo de fechas

## Desarrollo

1. Clona el repositorio

```bash
git clone https://github.com/TU_USUARIO/young-devotional-reader.git
cd young-devotional-reader
```

2. Instala las dependencias

```bash
npm install
```

3. Inicia el servidor de desarrollo

```bash
npm run dev
```

## Añadir Nuevos Devocionales

Los devocionales se encuentran en la carpeta `public/devotionals/` y deben seguir el formato:

- Nombre del archivo: `YYYY-MM-DD.md`
- Contenido en Markdown

### Estructura del Devocional

```markdown
# Título del Devocional

## Lectura del día: [Referencia Bíblica]

[Versículo o pasaje bíblico]

## Reflexión

[Contenido de la reflexión]

## Aplicación

[Puntos de aplicación práctica]

## Oración

[Oración sugerida]
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la versión de producción
- `npm run lint`: Ejecuta el linter
- `npm run lint:fix`: Corrige automáticamente problemas de linting
- `npm run format`: Formatea el código
