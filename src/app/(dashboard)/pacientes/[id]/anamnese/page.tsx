import Layout from "../_components/Layout";

interface PatientDetailsPageProps {
  params: {
    id?: string;
  };
}

export default function PatientAnamnesePage({
  params,
}: PatientDetailsPageProps) {

  if (!params.id) {
    return null;
  }

  return (
    <Layout>
      <h1>anamnese</h1>
    </Layout>
  );
}
