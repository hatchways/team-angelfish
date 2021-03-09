/** @format */

import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from '../themes/theme';

const SignupOne = ({ setData }) => {
	const classes = useStyles();

	const [state, setState] = useState({
		name: '',
		emailSignup: '',
		pwdSignup: '',
		confirmPwdSignup: '',
		userInfo: {},
		nameError: false,
		emailError: false,
		pwdError: false,
		confirmPwdError: false,
	});

	useEffect(() => {
		setState(state);
	}, [state]);

	const handleInputChange = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.value,
			nameError: false,
			emailError: false,
			pwdError: false,
			confirmPwdError: false,
		});
	};

	const checkUser = () => {
		const user_patt = new RegExp(
			`^(?=.*[A-Za-z].*[A-Za-z])[A-Za-z0-9@$!%*#?&]{4,}$`
		);
		const user_test = user_patt.test(state.name);
		return user_test ? true : false;
	};

	const checkEmail = () => {
		const email_patt = new RegExp(`[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$`);
		const email_test = email_patt.test(state.emailSignup);
		return email_test ? true : false;
	};

	const checkPwd = () => {
		const pwd_patt = new RegExp('.{6,}');
		const pwd_test = pwd_patt.test(state.pwdSignup);
		return pwd_test ? true : false;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const { name, emailSignup, pwdSignup, confirmPwdSignup } = state;
		const data = { name: name, email: emailSignup, password: pwdSignup };
		if (
			checkUser() &&
			checkEmail() &&
			checkPwd() &&
			pwdSignup === confirmPwdSignup
		) {
			setData(data);
			setState({
				name: '',
				emailSignup: '',
				pwdSignup: '',
				confirmPwdSignup: '',
				userInfo: {},
			});
		} else if (!checkUser()) {
			setState({ ...state, nameError: true });
		} else if (!checkEmail()) {
			setState({ ...state, emailError: true });
		} else if (!checkPwd()) {
			setState({ ...state, pwdError: true });
		} else {
			setState({ ...state, confirmPwdError: true });
		}
	};

	return (
		<Container id='modal-content' maxWidth='xs'>
			<Box textAlign='right' className='modal-header'>
				<Button size='small' className={classes.close}>
					&times;
				</Button>
			</Box>
			<div className={`modal-body ${classes.modalBody}`}>
				<Typography
					component='h1'
					variant='h4'
					align='center'
					className={classes.modalTitle}
				>
					Sign Up
				</Typography>
				<Typography
					component='p'
					variant='subtitle1'
					align='center'
					className={classes.modalSubtitle}
				>
					Track prices, organize travel plans and access member-only deals
				</Typography>
				<form>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								label='Name'
								value={state.name}
								id='name'
								name='name'
								color='secondary'
								error={state.nameError ? true : false}
								helperText={
									state.nameError
										? 'Name must be at least 4 characters with no spaces.'
										: ''
								}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								label='Email Address'
								value={state.emailSignup}
								id='emailSignup'
								name='emailSignup'
								type='email'
								color='secondary'
								error={state.emailError ? true : false}
								helperText={
									state.emailError ? 'Please enter a valid email address.' : ''
								}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								label='Password'
								value={state.pwdSignup}
								id='pwdSignup'
								name='pwdSignup'
								type='password'
								color='secondary'
								error={state.pwdError ? true : false}
								helperText={
									state.pwdError
										? 'Your password must be at least 6 characters.'
										: ''
								}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								label='Confirm Password'
								value={state.confirmPwdSignup}
								id='confirmPwdSignup'
								name='confirmPwdSignup'
								type='password'
								color='secondary'
								error={state.confirmPwdError ? true : false}
								helperText={
									state.confirmPwdError ? 'Your passwords do not match.' : ''
								}
								onChange={handleInputChange}
							/>
						</Grid>
					</Grid>
				</form>
				<Box textAlign='center'>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						size='large'
						classes={{ root: classes.modalSubmit }}
						onClick={handleSubmit}
					>
						Continue
					</Button>
				</Box>
			</div>
			<hr />
			<div className='modal-footer'>
				<Typography
					component='p'
					variant='subtitle1'
					align='center'
					className={classes.modalFooter}
				>
					Already have an account?{' '}
					<Link to='/signin' className={classes.link}>
						Sign In
					</Link>
				</Typography>
			</div>
		</Container>
	);
};
export default SignupOne;
