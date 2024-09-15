export default async function Home() {

  const response = await fetch("http://localhost:3333/appointment")
  const json = await response.json()
  return (
    <div className="">
      <h1>Calendar</h1>
    </div>
  );
}
