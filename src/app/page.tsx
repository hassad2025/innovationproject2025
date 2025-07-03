import Layout from '../components/Layout';
import EvenementsPage from './evenements/page'; // ajuste le chemin selon ta structure

export default function Home() {
  return (
    <Layout>
      <EvenementsPage />
    </Layout>
  );
}
