import React, { useState } from "react";

import { useAuthentication } from "@hooks/authentication/useAuthentication";
import UserStack from "./userStack ";
import AuthStack from "./authStack";
import { Loading } from "@components";
import { images, COLORS } from "@constants";
const RootNavigation = () => {
  const { user } = useAuthentication();

  if (user == undefined) {
    return (
      <Loading
        containerStyle={{
          backgroundColor: COLORS.transparent,
        }}
        lottieSrc={images.loading2}
        lottieSpeed={1}
      />
    );
  } else {
    return user ? <UserStack /> : <AuthStack />;
  }
};
export default RootNavigation;
