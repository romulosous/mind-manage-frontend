import { patientApi } from "@/services/patient";

interface PatientDetailsPageProps {
  params: {
    id?: string;
  };
}

export default async function PatientDetailsPage({ params }: PatientDetailsPageProps){
  // const [patient] = useQuery(getPatient, { id: params.id }, { retryOnMount: true });
  if (!params.id) {
      // TODO: redirecionar para home page
      return null;
    }

    const response = await patientApi.fetchPatientById(params.id);
    console.log(response);

    if (response === null || response === undefined) {
        return null
    }



  return (
    <div>
      <h1>Patient Details</h1>
      {/* <PatientDetails patient={patient} /> */}
      {response?.data?.name}
    </div>
  );
};
