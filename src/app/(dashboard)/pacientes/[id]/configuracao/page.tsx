import { Settings } from "lucide-react";
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
       <div className="flex justify-center items-center h-full">
       <h1 className="text-[#159A9C] text-4xl font-semibold mb-5 flex gap-3 items-center">Em breve! <Settings size={30} /></h1>
       </div>
    </Layout>
  );
}
