import { redirect } from "next/navigation";

export default function Home() {
  const isLogged = true;

  if (isLogged) {
    return redirect("/home");
  }
  return redirect("/login");
}
