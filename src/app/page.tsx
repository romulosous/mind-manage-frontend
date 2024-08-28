import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <Button size={"lg"}>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
