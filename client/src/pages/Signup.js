/** @format */

import React, { useState } from "react";
import { Redirect } from "react-router";
import SignupOne from "./SignupOne";
import SignupTwo from "./SignupTwo";

const Signup = () => {
	const [redirect, setRedirect] = useState(false);
	const [next, setNext] = useState(false);

	const handleNext = () => {
		setNext(true);
	};
	const handleRedirect = () => {
		setRedirect(true);
	};
	return (
		redirect 
		? <Redirect to="/dashboard"/> 
		: next 
		  ? <SignupTwo redirect={handleRedirect} /> 
		  : <SignupOne next={handleNext} />

	);
};
export default Signup;
