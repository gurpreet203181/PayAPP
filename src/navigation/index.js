import React from "react";

import { useAuthentication } from "@hooks/authentication/useAuthentication";
import UserStack from "./userStack ";
import AuthStack from "./authStack";

export default function RootNavigation() {
  const { user } = useAuthentication(); //checking if user is logged in or not

  return user ? <UserStack /> : <AuthStack />;
}
