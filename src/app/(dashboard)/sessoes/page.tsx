export default async function Home() {

  const response = await fetch("http://localhost:3333/appointment?type=SESSION")
  const json = await response.json()
  console.log(json)
  return (
    <div className="">
      <h1>Sessoes</h1>
    </div>
  );
}
