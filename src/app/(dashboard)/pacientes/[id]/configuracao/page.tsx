import Layout from "../_components/Layout";

interface PatientDetailsPageProps {
  params: {
    id?: string;
  };
}

export default function PatientConfigPage({ params }: PatientDetailsPageProps) {
  if (!params.id) {
    return null;
  }

  return (
    <Layout>
      <h1>configuracao</h1>
    </Layout>
  );
}
