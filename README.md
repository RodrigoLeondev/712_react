# 712 — Landing

Landing page de un estudio creativo audiovisual. Single page con scroll narrativo: hero con video en parallax, servicios en acordeón, sobre nosotros, formas de colaborar y contacto.

React 19 + TypeScript + Vite, con CSS Modules escritos a mano. Sin framework de estilos, sin router, sin librerías de animación.

---

## Arranque

```bash
npm install
npm run dev
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | `tsc -b` + build de producción a `dist/` |
| `npm run preview` | Sirve el build de `dist/` |
| `npm run lint` | ESLint sobre todo el proyecto |

---

## Arquitectura

El proyecto sigue **screaming architecture**: la estructura de `src/` grita el negocio, no el framework. Las reglas completas están en [`claude/claude.md`](claude/claude.md) y son de lectura obligatoria antes de escribir código.

```
src/
├── domain/              Conceptos de negocio
│   ├── showcase/        Hero: titular animado + video en parallax
│   ├── services/        Acordeón de servicios + formas de colaborar
│   ├── about/           Sobre nosotros, portafolio, marcas
│   ├── contact/         Formulario de contacto
│   ├── navigation/      Nav sticky con menú hamburguesa
│   └── footer/          Footer con newsletter y redes
├── infrastructure/      Piezas técnicas reutilizables
│   ├── ui/              card, carousel, pill, text, video
│   ├── layouts/         BaseLayout
│   ├── lib/             hooks y constantes
│   └── styles/          globals.css (tokens) y fonts.css
└── pages/
    └── Home.tsx         Orquesta el layout con las secciones
```

**Regla de dependencia:** `domain/` importa de `infrastructure/`, **nunca al revés**. `pages/` importa de ambos y compone.

Convenciones: componentes en `PascalCase.tsx` con default export, hooks en `useCamelCase.ts`, estilos en `ComponentName.module.css` al lado del componente, y **todas las interfaces en un `types.ts`** por carpeta — nunca declaradas dentro del archivo del componente. El alias `@/` apunta a `src/`.

---

## Sistema de diseño

Todos los valores viven como custom properties en `src/infrastructure/styles/globals.css`. **Ningún componente hardcodea valores**: siempre `var(--*)`.

| Grupo | Tokens |
|---|---|
| Color | `--color-primary`, `--color-dark`, `--color-white`, `--color-red-orange`, `--color-green`, `--color-blue`, `--color-purple`, `--color-rose`, `--color-grey`, `--color-title` |
| Tipografía | `--font-display` (Yotsuba), `--font-body` (Satoshi), escala `--text-sm` → `--text-4xl` |
| Espaciado | `--space-xs` → `--space-xl`, `--section-padding-x`, `--section-pt`, `--section-pb` |
| Radios | `--radius-sm` → `--radius-xl`, `--radius-circle`, `--radius-pill` |
| Bordes y sombras | `--border-card`, `--shadow-card`, `--shadow-card-up` |
| Layout | `--nav-h`, `--content-max`, `--title-size`, `--title-overlap` |
| Movimiento | `--transition-base`, `--transition-slow` |
| Capas | `--z-base`, `--z-overlay`, `--z-nav` |

### El token que sostiene el efecto de los títulos

En Servicios y Contacto el título gigante queda **detrás** de la card que lo sigue. El solapamiento no es un valor fijo: es una fracción del propio alto del título.

```css
margin-top: calc(var(--title-size) * var(--title-overlap) * -1);
```

Como `--title-size` es `clamp(3rem, 17.36vw, 250px)`, el solapamiento escala con la resolución y el efecto se ve idéntico a 375px y a 1920px. Si se usara un valor fijo, por debajo de ~507px la card taparía el título por completo.

---

## Responsive

**Mobile-first.** Los estilos base son los del teléfono; cada `@media (min-width: …)` agrega hacia arriba. No hay ningún `max-width` en condiciones de media query.

| Breakpoint | A partir de | Cambios principales |
|---|---|---|
| base | — | Una columna en todo; nav con hamburguesa |
| `30rem` | 480px | Más padding de sección, tipografías de footer y contacto |
| `48rem` | 768px | Formulario a dos columnas, card deck y marquee más grandes |
| `64rem` | 1024px | Nav de escritorio, grids a dos columnas, layout completo |
| `120rem` | 1920px | Contenido limitado a `--content-max` y centrado |

Los valores por tier se redefinen en `globals.css` (`--nav-h`, `--section-pt`, `--section-pb`, `--title-size`) y los componentes solo consumen el token. Las condiciones de los media queries se repiten literalmente porque **las custom properties no funcionan dentro de un `@media`** — es una limitación de CSS, no una decisión de estilo.

Varias secciones usan **container queries** (`cqw`) en vez de media queries: `Collaborate`, `StackedCard` y `CollapseItem` escalan contra el ancho de su contenedor, así que se adaptan solas sin breakpoints.

---

## Accesibilidad y rendimiento

- `prefers-reduced-motion: reduce` está contemplado en el hero, el parallax de About, el card deck y el marquee de logos.
- El menú móvil bloquea el scroll del body, cierra con `Escape` y expone `aria-expanded` / `aria-controls`.
- `scroll-padding-top: calc(var(--nav-h) + var(--space-sm))` evita que los anclajes queden debajo de la nav sticky.
- Las imágenes decorativas usan `loading="lazy"`; las del primer viewport no, a propósito.
- Los hooks de scroll (`useScrollProgress`, `HeroVideo`) usan `requestAnimationFrame` y listeners pasivos.

---

## Despliegue

Pensado para Vercel o Netlify. Las cabeceras de seguridad están en **`vercel.json`** y, duplicadas para Netlify, en **`public/_headers`** — usar la que corresponda al host.

### Variables de entorno

```bash
cp .env.example .env
```

| Variable | Para qué |
|---|---|
| `VITE_WEB3FORMS_KEY` | Clave de [Web3Forms](https://web3forms.com) que reciben los formularios de contacto y newsletter |

La clave es **pública por diseño** (viaja en el bundle, como toda variable `VITE_`). No es un secreto: la protección contra abuso es el campo honeypot más el límite de envíos del propio servicio. Sin la clave, los formularios muestran estado de error.

### Antes de publicar

- [ ] Reemplazar `https://712studio.com` por el dominio real en `index.html` (canonical, OG, JSON-LD) y en `public/sitemap.xml` y `public/robots.txt`
- [ ] Subir `public/og-image.jpg` de 1200×630 — sin él, los enlaces compartidos no muestran imagen
- [ ] Añadir `public/apple-touch-icon.png` de 180×180 y su `<link>` en `index.html`
- [ ] Completar `sameAs` en el JSON-LD con los perfiles reales de redes
- [ ] Actualizar `socialLinks` en `src/domain/footer/footerData.ts`, que hoy apunta a las portadas de X, Facebook y LinkedIn

### Control de tráfico

Vercel y Netlify **no ofrecen WAF ni rate limiting en sus planes gratuitos**, y un sitio estático no puede limitarse a sí mismo. Para tenerlo sin costo, poner Cloudflare como DNS por delante del hosting: su plan gratuito incluye WAF, reglas de rate limiting, Bot Fight Mode y analítica. No requiere migrar el hosting, solo cambiar los nameservers.

### Sobre ofuscar el código

No se hace, y es deliberado. Todo lo que corre en el navegador se descarga y se ejecuta ahí: no existe forma de cifrarlo. Vite ya minifica el bundle y no emite sourcemaps en producción. Ofuscar encima infla el peso, degrada el rendimiento, vuelve imposible depurar producción y sigue siendo reversible: es fricción, no seguridad.

---

## Reglas duras

Antes de dar por terminado un cambio, verificar que se cumple:

- Sin `any`, sin `@ts-ignore`, sin `eslint-disable`
- Sin clases de JavaScript — composición de funciones
- Sin imports relativos profundos (`../../../`) — usar `@/`
- Sin Tailwind ni utility-first CSS
- Sin comentarios en el código
- Componentes de menos de 200 líneas
- Interfaces siempre en `types.ts`
- No agregar dependencias sin aprobación explícita
