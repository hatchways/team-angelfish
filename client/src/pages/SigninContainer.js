/** @format */

import React, { useReducer, useEffect } from "react";
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

const SigninContainer = ({ dash, signup, close }) => {
	const classes = useStyles();

	const initialState = {
		emailSignin: "",
		pwdSignin: "",
		emailError: false,
		emailValidationError: false,
		pwdError: false,
		pwdValidationError: false,
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case "textChange":
				return {
					...state,
					[action.name]: action.value,
					emailError: false,
					emailValidationError: false,
					pwdError: false,
					pwdValidationError: false,
				};
			case "error":
				return { ...state, [action.error]: true };
			case "update":
				return state;
			default:
				throw new Error();
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({ type: "update" });
	}, [state]);

	const handleInputChange = (event) => {
		dispatch({
			type: "textChange",
			name: event.target.name,
			value: event.target.value,
		});
	};

	const checkEmail = () => {
		const emailPattern = new RegExp(`[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$`);
		const emailTest = emailPattern.test(state.emailSignin);
		return emailTest;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const { emailSignin, pwdSignin } = state;
		const userInfo = {
			email: emailSignin.trim().toLowerCase(),
			password: pwdSignin.trim().toLowerCase(),
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
				.then((results) => {
					if (results.status === "success") {
						dash(); // redirect to user's dashboard
					} else if ("email" in results) {
						dispatch({ type: "error", error: "emailError" });
					} else if ("password" in results) {
						dispatch({ type: "error", error: "pwdError" });
					} else if ("errors" in results) {
						if ("email" in results.errors) {
							dispatch({ type: "error", error: "emailValidationError" });
						}
					}
				})
				.catch((err) => console.error(err.message));
		} else if (!checkEmail()) {
			dispatch({ type: "error", error: "emailValidationError" });
		} else if (!pwdSignin) {
			dispatch({ type: "error", error: "pwdValidationError" });
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
								error={
									state.pwdError || state.pwdValidationError ? true : false
								}
								helperText={
									state.pwdError || state.pwdValidationError
										? state.pwdError
											? "You have entered an incorrect password."
											: "Please enter a password."
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
