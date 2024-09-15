import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import { APP_ROUTES } from "@/constants/app-routes";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";

type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    verifyUserAuthentication();
  }, []);

  const verifyUserAuthentication = async () => {
    const isUserAuthenticated =  checkUserAuthenticated();
    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.login);
    } else {
      setIsUserAuthenticated(true);
    }
  };

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  );
};
