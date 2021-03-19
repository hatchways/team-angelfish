/** @format */

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import SigninContainer from "../components/SigninContainer";

const Signin = ({ close, signup }) => {
  const [state, setState] = useState(false);
  const goToDash = () => setState(true);
  const goToSignup = () => signup();
  const handleModal = () => close();

  return state ? (
    <Redirect to="/dashboard" />
  ) : (
    <SigninContainer dash={goToDash} signup={goToSignup} close={handleModal} />
  );
};

export default Signin;
