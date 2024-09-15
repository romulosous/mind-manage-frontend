import { Patient } from "./_components/Patient";


export default async function Home() {

  const response = await fetch("http://localhost:3333/patient")
  const json = await response.json()

  if (json.length === 0) {
    return (
      <div className="">
        <h1>Pacientes</h1>
        <p>Nenhum paciente cadastrado</p>
      </div>
    );
  }
  return (
    <div className="">
      <Patient data={json.data} count={json.count} />
    </div>
  );
}
