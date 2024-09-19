import Layout from "../_components/Layout";
import { ProfileForm } from "./_components/profileForm";

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
      <ProfileForm />
    </Layout>
  );
}
