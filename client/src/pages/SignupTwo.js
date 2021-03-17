/** @format */

import React, { useState } from "react";
import {
	Box,
	Container,
	Grid,
	Typography,
	Button,
	Input,
	InputBase,
} from "@material-ui/core";
import { useStyles } from "../styles/Signup_in";
import { Link } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

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
		const newAdd = destination.trim();
		const isInList = travelList.includes(newAdd);

		if (isInList) {
			setDestination("");
			setOpen(!open);
		} else {
			setTravelList((prevState) => [...prevState, newAdd]);
			setDestination("");
			setOpen(!open);
		}
	};

	const handleDelete = (place) => {
		const newList = travelList.filter(
			(t) => t.toLowerCase() !== place.toLowerCase()
		);
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
				<Grid container spacing={1}>
					{travelList.map((place) => (
						<Grid key={place} item xs={12}>
							<InputBase
								name={place}
								id={place}
								value={place}
								readOnly
								fullWidth
								classes={{ root: classes.inputBase, input: classes.input }}
								startAdornment={
									<InputAdornment position="start">
										<LocationOnOutlinedIcon
											classes={{ root: classes.locationIcon }}
										/>
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label={`remove ${place}`}
											onClick={() => handleDelete(place)}
											size="small"
										>
											<CloseIcon classes={{ root: classes.closeIcon }} />
										</IconButton>
									</InputAdornment>
								}
							/>
						</Grid>
					))}
				</Grid>
				<Box textAlign="center" mt={3} mb={2}>
					{open ? (
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
