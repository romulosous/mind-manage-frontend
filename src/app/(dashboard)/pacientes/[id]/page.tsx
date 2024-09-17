"use client";
import { Patient as IPatient } from "@/@types/patient";
import Loading from "@/components/Loading";
import { patientApi } from "@/services/patient";
import { useEffect, useState } from "react";

import PatientDetails from "./_components/patientDetails";

interface PatientDetailsPageProps {
  params: {
    id?: string;
  };
}

export default function PatientDetailsPage({
  params,
}: PatientDetailsPageProps) {
  const [data, setData] = useState<IPatient>();
  const [loading, setLoading] = useState(true);

  const fetchPatientById = async () => {
    try {
      if (!params.id) return;
      const response = (await patientApi.fetchPatientById(
        params.id
      )) as unknown as IPatient;
      console.log("response: ", response);
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!params.id) {
    return null;
  }

  // useEffect(() => {
  //   fetchPatientById();
  // }, [params.id]);

  // if(loading) {
  //   return <Loading />
  // }
  return (
    <PatientDetails />
  );
}
