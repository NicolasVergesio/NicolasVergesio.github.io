# nvergesio

Sitio personal de **Nicolás Vergesio**: bioinformática y análisis de datos.

HTML, CSS y JavaScript puros, sin build ni dependencias. Se publica con GitHub Pages.

## Estructura

```
index.html            contenido de la página (textos en español)
css/style.css         estilos
js/main.js            nav, acordeón de servicios, animaciones al scrollear
js/scratch.js         la foto "raspable" de la sección Sobre
js/i18n.js            traducción al inglés (botón ES / EN)
assets/favicon.svg    ícono de la pestaña
assets/img/           foto, ilustración y og-image (preview al compartir el link)
assets/cv/            CV descargable
.nojekyll             le dice a GitHub Pages que no procese el sitio con Jekyll
```

## Editar textos

- **Español:** directo en `index.html`.
- **Inglés:** en `js/i18n.js`, dentro de `EN`. Cada elemento con `data-i18n="clave"` en el HTML tiene su traducción con la misma clave.
  Si cambiás un texto en español, acordate de cambiar también su versión en inglés.

## Ver en local

Abrir `index.html` con doble clic funciona. Para probarlo igual que en producción:

```bash
python -m http.server 8000
# → http://localhost:8000
```

## Publicar

`git add . && git commit -m "..." && git push`. GitHub Pages actualiza solo en 1–2 minutos.
(Configuración inicial: Settings → Pages → Deploy from a branch → `main` / `root`.)
