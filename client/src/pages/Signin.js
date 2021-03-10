/** @format */

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import SigninContainer from "./SigninContainer";

const Signin = () => {
	const [state, setState] = useState(false);
	const handleRedirect = () => setState(true);
	return state.redirect ? <Redirect to="/dashboard" /> : <SigninContainer redirect={handleRedirect} />
};
export default Signin;
