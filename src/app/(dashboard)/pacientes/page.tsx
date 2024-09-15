"use client"

import { useEffect, useState } from "react";
import { Patient } from "./_components/Patient";
import { patientApi } from "@/services/patient";
import Loading from "@/components/Loading";


export default function Home() {

  const [patients, setPatients] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  interface PatientResponse {
    data: [];
    count: number;
  }
  
  const fetchPatients = async () => {
    try {
      const response = await patientApi.fetchPatients({}) as PatientResponse
      setPatients(response.data)
      setCount(response.count)
      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, []);

  if(loading) {
    return <Loading />
  }

  return (
    <div className="">
      <Patient data={patients} count={count} />
    </div>
  );
}
