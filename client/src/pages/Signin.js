/** @format */

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import SigninContainer from "./SigninContainer";

const Signin = () => {
	const [state, setState] = useState(false);
	const handleRedirect = () => setState(true);
	return state.redirect ? <Redirect to="/explore" /> : <SigninContainer redirect={handleRedirect} />
};
export default Signin;
