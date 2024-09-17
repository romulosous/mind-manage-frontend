import Layout from "../_components/Layout";

interface PatientDetailsPageProps {
  params: {
    id?: string;
  };
}

export default function PatientHistoryPage({
  params,
}: PatientDetailsPageProps) {

  if (!params.id) {
    return null;
  }

  return (
    <Layout>
      <h1>historico</h1>
    </Layout>
  );
}
