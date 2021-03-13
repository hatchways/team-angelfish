/** @format */

import React, { useState } from "react";
import { Redirect } from "react-router";
import SignupOne from "./SignupOne";
import SignupTwo from "./SignupTwo";

const Signup = ({ close, signin }) => {
	const [dash, setDash] = useState(false);
	const [next, setNext] = useState(false);

	const goToNext = () => setNext(true);
	const goToDash = () => setDash(true);
	const goToSignin = () => signin();
	const handleModal = () => close();
	
	return dash ? (
		<Redirect to="/dashboard" />
	) : next ? (
		<SignupTwo dash={goToDash} close={handleModal} />
	) : (
		<SignupOne next={goToNext} signin={goToSignin} close={handleModal} />
	);
};
export default Signup;
