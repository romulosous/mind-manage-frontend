import Layout from "../_components/Layout";
import { AnamneseForm } from "./_components/AnamneseForm";

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
      <AnamneseForm />
    </Layout>
  );
}
