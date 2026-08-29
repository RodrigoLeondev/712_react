import Nav from '@/domain/navigation/Nav';
import BaseLayout from '@/infrastructure/layouts/BaseLayout/BaseLayout';

/**
 * La página orquesta: compone el layout de infraestructura con las
 * secciones de domain/. Header y footer se inyectarán como slots cuando
 * existan Nav y Footer.
 */
export default function Home() {
  return (
    <BaseLayout header={<Nav />}>
      <main> 
        <h1>Contenido principal</h1>
      </main>
    </BaseLayout>
  );
}
