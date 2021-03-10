/** @format */

import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useStyles } from "../themes/theme";

const Signin = () => {
	const classes = useStyles();

	const [state, setState] = useState({
		emailSignin: "",
		pwdSignin: "",
		emailError: false,
		emailValidationError: false,
		pwdError: false,
		redirect: false,
	});

	useEffect(() => {
		setState(state);
	}, [state]);

	const handleInputChange = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.value,
			emailError: false,
			emailValidationError: false,
			pwdError: false,
		});
	};

	const checkEmail = () => {
		const email_patt = new RegExp(`[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$`);
		const email_test = email_patt.test(state.emailSignin);
		return email_test ? true : false;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const { emailSignin, pwdSignin } = state;
		const userInfo = {
			email: emailSignin.toLowerCase(),
			password: pwdSignin.toLowerCase(),
		};
		if (checkEmail() && pwdSignin) {
			fetch("/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userInfo),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.status === 200) {
						//redirect to dashboard
						setState({ ...state, redirect: true });
					} else if (res.status === []) {
						setState({ ...state, emailError: true });
					} else {
						setState({ ...state, pwdError: true });
					}
				})
				.catch();
		} else if (!checkEmail()) {
			setState({ ...state, emailValidationError: true });
		} else if (!pwdSignin) {
			setState({ ...state, pwdError: true });
		}
	};

	return state.redirect ? (
		<Redirect to="/dashboard" />
	) : (
		<Container id="modal-content" maxWidth="xs">
			<Box textAlign="right" className="modal-header">
				<Button size="small" className={classes.close}>
					&times;
				</Button>
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
								value={state.emailSignin}
								id="emailSignin"
								name="emailSignin"
								type="email"
								color="secondary"
								error={
									state.emailError || state.emailValidationError ? true : false
								}
								helperText={
									state.emailError || state.emailValidationError
										? state.emailError
											? "This email does not exist in our records."
											: "Please enter a valid email address."
										: ""
								}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								label="Password"
								value={state.pwdSignin}
								id="pwdSignin"
								name="pwdSignin"
								type="password"
								color="secondary"
								error={state.pwdError ? true : false}
								helperText={
									state.pwdError
										? "You have entered an incorrect password."
										: ""
								}
								onChange={handleInputChange}
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
			<hr />
			<div className="modal-footer">
				<Typography
					component="p"
					variant="subtitle1"
					align="center"
					className={classes.modalFooter}
				>
					Don't have an account?{" "}
					<Link to="/signup" className={classes.link}>
						Sign Up
					</Link>
				</Typography>
			</div>
		</Container>
	);
};
export default Signin;
