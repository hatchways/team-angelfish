/** @format */

import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../styles/Signup_in";
import { Button, Input } from "@material-ui/core";
import { Link } from "react-router-dom";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";

const SignupTwo = ({ dash, close }) => {
	const classes = useStyles();

	const [travelList, setTravelList] = useState([]);
	const [destination, setDestination] = useState("");
	const [open, setOpen] = useState(false);

	const handleTextChange = (event) => {
		setDestination(event.target.value);
	};
	const openAdd = () => {
		setOpen(!open);
	};

	const handleAdd = () => {
		const newAdd = destination.trim().toLowerCase();
		const isInList = travelList.includes(newAdd);

		if (isInList) {
			setDestination("");
			setOpen(!open);
		} else {
			setTravelList((prevState) => [...prevState, newAdd]);
			setDestination("");
			setOpen(!open);
		}
		console.log(destination)
	};

	const handleDelete = (place) => {
		const newList = travelList.filter((t) => t !== place);
		setTravelList(newList);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const travelInfo = { travel: travelList };
		if (travelList.length > 0) {
			// url to post travel list
			fetch("", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(travelInfo),
			})
				.then((res) => res.json())
				.then(dash())
				.catch((err) => console.error(err));
		} else {
			dash();
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
				<Button size="small" onClick={() => close()} className={classes.close}>
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
					Sign Up
				</Typography>
				<Typography
					component="p"
					variant="subtitle1"
					align="center"
					className={classes.modalSubtitle}
				>
					Please select your favorite travel destinations
				</Typography>
				<Grid container spacing={2}>
					{travelList.map((destination) => (
						<Grid key={destination} item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<OutlinedInput
									name={destination}
									id={destination}
									value={destination}
									color="secondary"
									readOnly
									startAdornment={
										<InputAdornment position="end">
											<LocationOnOutlinedIcon
												classes={{ root: classes.icon }}
											/>
										</InputAdornment>
									}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="remove destination"
												onClick={handleDelete(destination)}
												edge="end"
											>
												<CloseIcon />
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
					))}
				</Grid>
				<Box textAlign="center" mt={3} mb={2}>
					{open ? (
						<FormControl>
							<Input
								id="add-destination"
								color="secondary"
								onChange={handleTextChange}
								value={destination}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="add destination"
											onClick={handleAdd}
											edge="end"
										>
											<AddIcon />
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					) : (
						<Button className={classes.link} onClick={openAdd}>
							Add more
						</Button>
					)}
				</Box>
				<Box textAlign="center">
					<Button
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						classes={{ root: classes.modalSubmit }}
						onClick={handleSubmit}
					>
						Continue
					</Button>
				</Box>
			</div>
			{/* Need to change the footer if user is automatically signed in. */}
			<div className="modal-footer">
				<Typography
					component="p"
					variant="subtitle1"
					align="center"
					className={classes.modalFooter}
				>
					Already have an account?{" "}
					<Link to="/signin" className={classes.link}>
						Sign In
					</Link>
				</Typography>
			</div>
		</Container>
	);
};
export default SignupTwo;
