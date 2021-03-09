/** @format */

import React, { useState } from "react";
import SignupOne from "./SignupOne";
import SignupTwo from "./SignupTwo";

const Signup = () => {
	const [data, setData] = useState({});
	const [next, setNext] = useState(false);

	const handleData = (childData) => {
		setData(childData);
		setNext(true);
	};
	return (
		<>{next ? <SignupTwo data={data} /> : <SignupOne setData={handleData} />}</>
	);
};
export default Signup;
