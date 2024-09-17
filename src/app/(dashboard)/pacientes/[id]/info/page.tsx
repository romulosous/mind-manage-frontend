import Layout from "../_components/Layout";

interface PatientDetailsPageProps {
  params: {
    id?: string;
  };
}

export default function PatientInfoPage({ params }: PatientDetailsPageProps) {
  if (!params.id) {
    return null;
  }

  return (
    <Layout>
      <h1>Info</h1>
    </Layout>
  );
}
