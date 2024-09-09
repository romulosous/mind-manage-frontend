export default async function Home() {

  const response = await fetch("http://localhost:3333/patient")
  const json = await response.json()
  console.log(json)

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
      <ul>
        {json?.data?.map((item : any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <h1>Pacientes</h1>
    </div>
  );
}
