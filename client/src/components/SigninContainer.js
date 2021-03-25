/** @format */

import React, { useReducer, useEffect, useState } from "react";
import {
	Box,
	Container,
	Grid,
	Typography,
	TextField,
	Button,
	IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "../styles/Signup_in";
import { useDispatchContext } from "../context";

const SigninContainer = ({ dash, signup, close }) => {
	const classes = useStyles();

	const dispatch = useDispatchContext();

	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [emailClientError, setEmailClientError] = useState(false);
	const [emailServerError, setEmailServerError] = useState(false);
	const [pwdClientError, setPwdClientError] = useState(false);
	const [pwdServerError, setPwdServerError] = useState(false);

	const handleEmail = (event) => {
		setEmail(event.target.value);
		setEmailClientError(false);
		setEmailServerError(false);
	};
	const handlePwd = (event) => {
		setPwd(event.target.value);
		setPwdClientError(false);
		setPwdServerError(false);
	};

	const checkEmail = () => {
		const emailPattern = new RegExp(`[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$`);
		return emailPattern.test(email);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const userInfo = {
			email: email.trim().toLowerCase(),
			password: pwd.trim(),
		};
		if (checkEmail() && pwd) {
			try {
				const loginResponse = await fetch("/api/users/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userInfo),
				});
				const loginData = await loginResponse.json();
				if (loginData.status === "success") {
					// need to close modal
					dispatch({ type: "AUTHENTICATED", payload: loginData.data });
					dash(); // redirect to explore page
				} else if ("password" in loginData) {
					setPwdServerError(true);
				} else if ("email" in loginData) {
					setEmailServerError(true);
				}
			} catch (err) {
				console.log(err);
			}
		} else if (!checkEmail()) {
			setEmailClientError(true);
		} else if (!pwd) {
			setPwdClientError(true);
		}
	};
	return (
		<Container
			id="modal-content"
			maxWidth="xs"
			className={classes.paper}
			classes={{ root: classes.contain }}
		>
			<Box textAlign="right" className="modal-header">
				<IconButton onClick={() => close()}>
					<CloseIcon classes={{ root: classes.closeModal }} />
				</IconButton>
			</Box>
			<div className={`modal-body ${classes.modalBody}`}>
				<Typography
					component="h1"
					variant="h4"
					align="center"
					className={classes.modalTitle}
				>
					Sign In
				</Typography>
				<Typography
					component="p"
					variant="subtitle1"
					align="center"
					className={classes.modalSubtitle}
				>
					Track prices, organize travel plans and access member-only deals
				</Typography>
				<form>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Email Address"
								value={email}
								id="emailSignin"
								name="emailSignin"
								type="email"
								color="secondary"
								error={emailClientError || emailServerError}
								helperText={
									emailServerError || emailClientError
										? emailServerError
											? "This email does not exist in our records."
											: "Please enter a valid email address."
										: ""
								}
								onChange={handleEmail}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Password"
								value={pwd}
								id="pwdSignin"
								name="pwdSignin"
								type="password"
								color="secondary"
								error={pwdClientError || pwdServerError}
								helperText={
									pwdServerError || pwdClientError
										? pwdServerError
											? "You have entered an incorrect password."
											: "Please enter a password."
										: ""
								}
								onChange={handlePwd}
							/>
						</Grid>
					</Grid>
				</form>
				<Box textAlign="center">
					<Button
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						classes={{ root: classes.modalSubmit }}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
				</Box>
			</div>
			<div className="modal-footer">
				<Typography
					component="p"
					variant="subtitle1"
					align="center"
					className={classes.modalFooter}
				>
					Don't have an account?{" "}
					<span className={classes.link} onClick={() => signup()}>
						Sign Up
					</span>
				</Typography>
			</div>
		</Container>
	);
};

export default SigninContainer;
