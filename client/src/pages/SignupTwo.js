/** @format */

import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { Button, Input } from "@material-ui/core";
import { Link } from "react-router-dom";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";

const SignupTwo = ({ redirect }) => {
	const classes = useStyles();
	const [travel, setTravel] = useState({
		destination: "",
		list: [],
		add: false, //open textbox to add new destination
	});

	useEffect(() => {
		setTravel(travel);
	}, [travel]);

	const handleTextChange = (event) => {
		setTravel({ ...travel, destination: event.target.value });
	};
	const openAddTextbox = () => {
		setTravel({ ...travel, add: true });
	};

	const handleAdd = () => {
		const newAdd = travel.destination.trim().toLowerCase();
		const isInList = travel.list.includes(newAdd);

		if (isInList || !newAdd) {
			setTravel({ ...travel, destination: "", add: false });
		} else {
			setTravel({
				...travel,
				destination: "",
				list: [...travel.list, newAdd],
				add: false,
			});
		}
	};

	const handleDelete = (destination) => {
		const newList = travel.list.filter((t) => t !== destination);
		setTravel({ ...travel, list: [...newList] });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const travelInfo = { travel: travel.list };
		if (travel.list.length > 0) {
			// url to send travel list
			fetch("", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(travelInfo),
			})
				.then((res) => res.json())
				.then(redirect())
				.catch((err) => console.error(err));
		} else {
			redirect();
		}
	};
	return (
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
					Sign Up
				</Typography>
				<Typography
					component="p"
					variant="subtitle1"
					align="center"
					className={classes.modalSubtitle}
				>
					Please select your favorite travel travel
				</Typography>
				<Grid container spacing={2}>
					{travel.list.map((destination) => (
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
					{travel.add ? (
						<FormControl>
							<Input
								id="add-destination"
								color="secondary"
								onChange={handleTextChange}
								value={travel.destination}
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
						<Button className={classes.link} onClick={openAddTextbox}>
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
			<hr />
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
