"use client";

import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const router = useRouter();
    if (typeof window !== "undefined") {
        const isAuthenticated = checkUserAuthenticated();
        if(isAuthenticated){
            router.replace("/home");
        }
    }

  return <>{children}</>;
}
