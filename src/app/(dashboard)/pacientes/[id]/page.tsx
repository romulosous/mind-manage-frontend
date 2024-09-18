"use client";
import { redirect } from "next/navigation";
interface PatientDetailsPageProps {
  params: {
    id?: string;
  };
}

export default function PatientDetailsPage({
  params,
}: PatientDetailsPageProps) {
  // const [data, setData] = useState<IPatient>();
  // const [loading, setLoading] = useState(true);

  // const fetchPatientById = async () => {
  //   try {
  //     if (!params.id) return;
  //     const response = (await patientApi.fetchPatientById(
  //       params.id
  //     )) as unknown as IPatient;
  //     console.log("response: ", response);
  //     setData(response);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (!params.id) {
    return null;
  }

  redirect(`/pacientes/${params.id}/info`);
}
