# CLAUDE.md — Arquitectura 712 (React)

> Este archivo define las bases arquitectónicas que toda IA debe seguir al desarrollar dentro de este proyecto. Léelo completo antes de escribir cualquier código.

---

## 1. Screaming Architecture

La estructura del proyecto debe **gritar** que esto es un *landing page de un estudio creativo*, no que está hecho con React/Vite/CSS Modules.

### Regla de oro

Si alguien mira la jerarquía de carpetas en `src/`, debe entender inmediatamente el **negocio** (showcase, studio, work, social-proof), no el **framework** (ui, webgl, lib).

### Separación fundamental

El código se divide en dos grandes grupos al mismo nivel dentro de `src/`:

| Carpeta | Contiene | Ejemplo |
|---|---|---|
| `domain/` | Componentes que representan conceptos de negocio | `showcase/HeroContent.tsx` |
| `infrastructure/` | Componentes técnicos reutilizables | `ui/Button.tsx`, `webgl/Galaxy.tsx` |
| `pages/` | Páginas (cada una es una ruta) | `Home.tsx`, `About.tsx` (opcional) |

Los componentes de `domain/` **importan** desde `infrastructure/`, pero NUNCA al revés.

### Estructura de carpetas
src/

─── DOMINIOS DE NEGOCIO (gritan qué hace el sitio) ───
domain/
showcase/ # Hero + Video — primera impresión
studio/ # About / Services / Process
work/ # Portfolio / Gallery
social-proof/ # Testimonials
contact/ # Contact Form
navigation/ # Navbar
footer/ # Footer

─── INFRAESTRUCTURA TÉCNICA (cómo se implementa) ───
infrastructure/
ui/ # Componentes UI atómicos y reutilizables
animation/ # Sistema de animación (ScrollAnimator, etc.)
webgl/ # Galaxy y efectos WebGL
lib/ # Utilidades puras, constantes, tipos
styles/ # CSS global, animaciones, tokens
layouts/ # Layouts de página (componentes envolventes)

─── PÁGINAS ───
pages/ # Cada archivo es una ruta
Home.tsx
(si crece: About.tsx, Services.tsx, etc.)

─── ROUTER (opcional, si usas React Router) ───
router/
index.tsx # Definición de rutas

text

### Reglas de naming

| Concepto | Convención | Ejemplo |
|---|---|---|
| Carpetas de dominio | `kebab-case` | `social-proof/`, `showcase/` |
| Componentes | `PascalCase.tsx` | `HeroContent.tsx` |
| Hooks | `useCamelCase.ts` | `useScrollReveal.ts` |
| Utilidades | `camelCase.ts` | `formatPrice.ts` |
| Constantes | `SCREAMING_SNAKE` | `SITE_CONFIG` |
| Tipos/Interfaces | `PascalCase` | `NavLink` |
| Archivo de types por dominio | `types.ts` | `domain/showcase/types.ts` |
| Archivo de estilos (CSS Modules) | `ComponentName.module.css` | `HeroContent.module.css` |

---

## 2. Composición sobre Herencia

**No** se usan clases ni herencia de componentes. Todo es composición de funciones y componentes pequeños.

### Patrón correcto

```tsx
// ✅ Composición: componente pequeño y enfocado
// domain/studio/SectionHeader.tsx
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  label: string;
  title: string;
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <p className={styles.label}>{label}</p>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}

// ✅ Uso por composición (dominio importa de infraestructura)
import Container from '@/infrastructure/ui/Container';
import SectionSurface from '@/infrastructure/ui/SectionSurface';
import SectionHeader from '@/domain/studio/SectionHeader';

function Services() {
  return (
    <SectionSurface>
      <Container>
        <SectionHeader label="Servicios" title="Lo que hacemos" />
        <ServiceGrid services={services} />
      </Container>
    </SectionSurface>
  );
}
Patrón prohibido
tsx
// ❌ NO: herencia o clases
class Section extends React.Component { ... }
class ServicesSection extends Section { ... }

// ❌ NO: props spreading genérico sin tipado
function Section(props: any) { ... }
3. SOLID
S — Single Responsibility
Cada archivo hace una sola cosa.

SectionHeader.tsx → solo renderiza el encabezado de sección

formatPrice.ts → solo formatea precios

useScrollReveal.ts → solo lógica de reveal al scroll

Síntoma de violación: un archivo que importa de 5+ dominios distintos o tiene múltiples export no relacionados.

O — Open/Closed
Los componentes están abiertos a extensión vía props, cerrados a modificación.

tsx
// ✅ Extensible por composición
// infrastructure/ui/Button/Button.tsx
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({ variant = 'primary', size = 'md', children }: ButtonProps) {
  return <button className={`${styles.btn} ${styles[variant]} ${styles[size]}`}>{children}</button>;
}

// ❌ NO: if/else por tipo de botón dentro del componente
// ❌ NO: modificar el componente base para añadir un nuevo caso
L — Liskov Substitution
Las interfaces deben ser consistentes. Si un tipo promete una propiedad, todos los usos deben cumplirla.

I — Interface Segregation
Interfaces pequeñas y específicas por dominio, no interfaces gigantes globales.

tsx
// ✅ Bien: específica del dominio y modularizada
// domain/showcase/types.ts
export interface HeroContentProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

// ❌ Mal: interfaz gigante con todo
interface ComponentProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  images?: GalleryImage[];
  testimonials?: Testimonial[];
  // ...
}
D — Dependency Inversion
Los componentes de dominio dependen de abstracciones (tipos/interfaces), no de implementaciones concretas.

tsx
// ✅ El componente recibe datos por props, no importa una API
// domain/work/ProductGrid.tsx
import type { Product } from './types';

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  // ...
}

// ❌ NO: el componente hace fetch directamente
function ProductGrid() {
  const [data, setData] = useState([]);
  useEffect(() => { fetch('/api/products').then(...) }, []);
  // ...
}
4. DRY (Don't Repeat Yourself)
Regla de importación (Dependency Inversion)
domain/ → puede importar de infrastructure/ y de infrastructure/lib/

infrastructure/ → NUNCA importa de domain/

pages/ → importa de ambos (orquesta la composición)

Qué extraer a infrastructure/lib/
Constantes de negocio (productos, testimonios, servicios)

Configuración del sitio (colores, tipografía, metadata)

Helpers puros (formateo, clases condicionales, smooth scroll)

Qué extraer a infrastructure/ui/
Componentes que aparecen en 2+ secciones distintas

Button, Card, Container, SectionHeader, SectionSurface

Qué NO duplicar
Estructura de sección (label + title + contenido → ya está en SectionSurface)

Animaciones de entrada (ya está en ScrollAnimator)

Regla práctica
Si copiaste y pegaste el mismo bloque en 2+ archivos, extráelo a un componente compartido. Si son 2+ líneas de JS/TS puro en 2+ archivos, extráelo a infrastructure/lib/.

5. KISS (Keep It Simple, Stupid)
Preferencias de implementación
Situación	Solución simple ✅	Solución compleja ❌
Animación al scroll	CSS transitions + IntersectionObserver	GSAP timeline compleja
Estado global	Props + lifting state	Context/Redux/Zustand
Efecto visual	CSS gradient + blend modes	WebGL (salvo Galaxy)
Formulario	useState + validación manual	Librería de forms externa
Estilos	CSS Modules	CSS-in-JS con lógica compleja
Checklist KISS
□ ¿Podría esto resolverse con CSS puro?
□ ¿Podría este componente ser funcional sin efectos secundarios?
□ ¿Esta abstracción realmente ahorra más de lo que complica?
□ ¿Un desarrollador nuevo entendería esto sin documentación externa?
6. Convenciones de Código
Exports
tsx
// ✅ Default export para componentes
export default function Nav(props: NavProps) { ... }

// ✅ Named export para utilidades y tipos
export function cn(...) { ... }
export interface NavLink { ... }
Imports
tsx
// ✅ Orden: externas → internas → tipos
import { useEffect } from 'react';
import { Container } from '@/infrastructure/ui/Container';
import { cn } from '@/infrastructure/lib/utils/helpers';
import type { Testimonial } from '@/infrastructure/lib/types';
Estructura de un componente
tsx
// 1. Imports
import { useState } from 'react';
import styles from './MyComponent.module.css';

// 2. Tipos locales (si son específicos del componente) -> MEJOR en archivo types.ts separado
// Ver sección 7 para modularización de tipos

// 3. Componente (default export)
export default function MyComponent({ ... }: MyComponentProps) {
  // 4. Hooks al inicio
  const [state, setState] = useState();

  // 5. Handlers/helpers inline
  const handleClick = () => { ... };

  // 6. Render (un solo return, minimal JSX logic)
  return ( ... );
}
Fragment shaders (WebGL)
Los shaders GLSL se declaran como constantes string al inicio del archivo o en archivo separado si exceden 30 líneas.

7. Modularización de Tipos (Interfaces)
Todas las interfaces y tipos se definen en archivos types.ts específicos por dominio o por infraestructura. Nunca se declaran dentro del mismo archivo del componente.

Estructura de tipos por dominio
Cada carpeta de dominio debe tener su propio types.ts:

text
domain/showcase/
  ├── HeroContent.tsx
  ├── HeroGalaxy.tsx
  ├── VideoSection.tsx
  └── types.ts          # Aquí viven todas las interfaces del showcase
Ejemplo de domain/showcase/types.ts
tsx
export interface HeroContentProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  animationDelay?: number;
}

export interface VideoSectionProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
}

export interface HeroGalaxyProps {
  color1?: string;
  color2?: string;
  speed?: number;
  particleCount?: number;
}
Infraestructura también tiene sus tipos
text
infrastructure/ui/
  ├── Button/
  │   ├── Button.tsx
  │   ├── Button.module.css
  │   └── types.ts        # Props específicas de Button
  ├── Container/
  └── ...
Ejemplo de infrastructure/ui/Button/types.ts
tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
}
Uso en el componente
tsx
// infrastructure/ui/Button/Button.tsx
import styles from './Button.module.css';
import type { ButtonProps } from './types';

export default function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${styles[size]}`} onClick={onClick}>
      {children}
    </button>
  );
}
Regla de oro
Nunca declares una interfaz en el mismo archivo que el componente.

Siempre usa export interface en types.ts para que pueda ser importada desde cualquier lugar.

Para props que solo usa un componente, sigue estando en types.ts de ese dominio o infraestructura.

8. Estilos: CSS Modules (sin Tailwind)
No se usa Tailwind. Todos los estilos se escriben con CSS Modules (archivos .module.css) o, en su defecto, CSS puro con convención BEM para proyectos pequeños.

Estructura de archivos de estilos
Cada componente tiene su propio archivo .module.css al lado:

text
infrastructure/ui/Button/
  ├── Button.tsx
  ├── Button.module.css
  └── types.ts

domain/showcase/HeroContent/
  ├── HeroContent.tsx
  ├── HeroContent.module.css
  └── types.ts
Ejemplo de uso
css
/* infrastructure/ui/Button/Button.module.css */
.btn {
  display: inline-block;
  font-family: var(--font-body);
  font-weight: 600;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
}

.primary {
  background: var(--color-accent);
  color: var(--color-white);
}
.secondary {
  background: var(--color-primary);
  color: var(--color-white);
}
.outline {
  background: transparent;
  border: 2px solid var(--color-accent);
  color: var(--color-accent);
}

.sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
.md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
.lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}
tsx
// infrastructure/ui/Button/Button.tsx
import styles from './Button.module.css';
import type { ButtonProps } from './types';

export default function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
Variables globales (CSS custom properties)
Todas las variables de diseño se definen en infrastructure/styles/globals.css y se usan en los módulos:

css
/* infrastructure/styles/globals.css */
:root {
  --color-primary: #1A1A2E;
  --color-secondary: #16213E;
  --color-accent: #E94560;
  --color-gold: #F5A623;
  --color-light: #F5F5F5;
  --color-white: #FFFFFF;

  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;

  --section-padding-y: clamp(4rem, 8vw, 8rem);
  --section-padding-x: clamp(1.5rem, 5vw, 6rem);

  --transition-base: 0.3s ease;
  --transition-slow: 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
Reglas de estilo
No hardcodear valores: siempre usar las variables CSS.

CSS Modules: cada componente importa su propio módulo; los nombres de clase se generan localmente.

Estilos globales: solo para reset, variables, tipografía y utilidades básicas (.container, .sr-only).

Responsive: se maneja con media queries dentro de los módulos (mobile-first).

9. Patrones Prohibidos
Patrón	Razón
any en tipos TypeScript	Rompe el tipado estricto
eslint-disable / @ts-ignore	Oculta problemas
Clases de JavaScript	Preferir funciones + composición
Librerías externas para cosas simples	KISS violation
Componentes con más de 200 líneas	Viola SRP
Import relativo profundo (../../../)	Usar alias @/
Mutación directa de props	React: estado inmutable
Tailwind o cualquier utility-first CSS	No está permitido; usar CSS Modules
10. Stack Técnico (Actualizar al añadir dependencias)
Capa	Tecnología	Versión
Framework / Bundler	Vite	^5.0
UI	React	^18.3 (o ^19)
Enrutamiento (opcional)	React Router	^6.20 (solo si crece)
Estilos	CSS Modules (sin Tailwind)	—
Animaciones	CSS + IntersectionObserver + GSAP (solo para animaciones pesadas)	^3.12
WebGL	ogl	^1.0
Build / Optimización	vite-plugin-compression	^0.5
IMPORTANTE: No agregar dependencias sin aprobación explícita. Preferir solución nativa (CSS/JS) antes que librería externa.

11. Proceso para Desarrollar
Leer este archivo (CLAUDE.md) completo

Identificar el dominio de negocio al que pertenece el cambio

Buscar componentes existentes en infrastructure/ui/ que puedan componerse

Definir las interfaces en el types.ts del dominio correspondiente

Escribir el componente en domain/ correspondiente

Crear el archivo .module.css con los estilos necesarios

Verificar SOLID + DRY + KISS + modularización de tipos antes de dar por terminado

No repetir patrones que ya están implementados en infrastructure/lib/ o infrastructure/ui/

12. Notas sobre React y performance en una landing page
Carga inicial: Al ser una landing, prioriza el renderizado rápido. Usa React.lazy + Suspense para secciones pesadas (ej. galería, testimonios) que no están en el viewport inicial.

Animaciones: Prefiere useEffect con IntersectionObserver para activar GSAP solo cuando el elemento entra en pantalla. Evita animaciones que se ejecuten en el render inicial si no son visibles.

Imágenes: Usa <img loading="lazy" /> y formatos modernos (WebP, Avif). Si usas Vite, aprovecha import para hasheo.

Videos: Similar a imágenes, carga el src solo cuando el video esté cerca del viewport (puedes usar un custom hook useLazyVideo).

SEO: Aunque es una SPA, puedes usar react-helmet o el Head de React Router (si lo usas) para manejar meta tags dinámicos.

13. Ejemplo de estructura de página (Home.tsx)
tsx
import Nav from '@/domain/navigation/Nav';
import HeroGalaxy from '@/domain/showcase/HeroGalaxy';
import HeroContent from '@/domain/showcase/HeroContent';
import VideoSection from '@/domain/showcase/VideoSection';
import About from '@/domain/studio/About';
import Services from '@/domain/studio/Services';
import HowWeWork from '@/domain/studio/HowWeWork';
import ProductGrid from '@/domain/work/ProductGrid';
import Gallery from '@/domain/work/Gallery';
import Testimonials from '@/domain/social-proof/Testimonials';
import ContactForm from '@/domain/contact/ContactForm';
import Footer from '@/domain/footer/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <section id="inicio">
        <HeroGalaxy />
        <HeroContent />
      </section>
      <VideoSection />
      <About />
      <Services />
      <HowWeWork />
      <ProductGrid />
      <Gallery />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
}
14. Configuración de Vite para alias y CSS Modules
ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
