import Layout from "../_components/Layout";
import { History } from "./_components/History";

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
      <History />
    </Layout>
  );
}
