/** @format */

import React, { useState } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Grid,
	Typography,
	Divider,
	Button,
} from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DepartLogo from "../assets/images/depart.png";
import AmericanAirlinesLogo from "../assets/images/american-airlines-logo.jpeg";
import AirCanadaLogo from "../assets/images/air-canada-logo.jpeg";
import DeltaLogo from "../assets/images/delta-logo.png";
import JetBlueLogo from "../assets/images/jetBlue-logo.jpeg";
import useStyles from "../styles/FlightAccordion";

const carriers = [
	{
		CarrierId: 29,
		Name: "American Airlines",
		LogoUrl: AmericanAirlinesLogo,
	},
	{
		CarrierId: 173,
		Name: "Air Canada",
		LogoUrl: AirCanadaLogo,
	},
	{
		CarrierId: 870,
		Name: "JetBlue",
		LogoUrl: JetBlueLogo,
	},
	{
		CarrierId: 450,
		Name: "Delta Air Lines",
		LogoUrl: DeltaLogo,
	},
];

const FlightAccordion = ({ quote, cities }) => {
	const classes = useStyles();
	const [expand, setExpand] = useState(false);

	const findDepartingCarrier = carriers.find(
		(carrier) => carrier.CarrierId === quote.OutboundLeg.CarrierId
	);
	const departingCarrierLogo = findDepartingCarrier.LogoUrl;
	const departingCarrierName = findDepartingCarrier.Name;


	const showDetails = (event, expanded) => setExpand(expanded);

	return (
		<Accordion
			onChange={showDetails}
			classes={{
				root: classes.accordion,
				expanded: classes.expanded,
			}}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
				classes={{
					root: classes.summary,
					content: classes.content,
					expanded: classes.expanded,
				}}
			>
				{expand ? (
					<Grid item container xs={12} alignItems="center">
						<Grid item container xs={12} sm={7} alignItems="center">
							<Grid item xs={2}>
								<img
									src={DepartLogo}
									alt="departure logo"
									width="75%"
									height="44px"
									className={classes.departLogo}
								/>
							</Grid>
							<Grid item xs={10} className={classes.departTime}>
								<Typography
									variant="subtitle2"
									className={`${classes.departHeader} ${classes.departure}`}
									display="inline"
								>
									Departure
								</Typography>
								<Typography
									display="inline"
									variant="subtitle2"
									className={`${classes.departHeader} ${classes.departureDate}`}
								>
									{quote.OutboundLeg.DepartureDate}
								</Typography>
							</Grid>
						</Grid>
						<Grid item container xs={12} sm={5} justify="flex-end" spacing={0}>
							<Grid item sm={9} className={classes.buttonBox}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									size="large"
									classes={{ root: classes.button }}
								>
									Select flight
								</Button>
							</Grid>
							<Grid item sm={3}>
								<Typography
									variant="subtitle2"
									className={classes.departHeader}
									align="right"
								>
									{`$${quote.MinPrice}`}
								</Typography>
								<Typography className={classes.departSubtitle} align="right">
									{quote.InboundLeg ? "round trip" : "one way"}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				) : (
					<Grid item container xs={12} alignItems="center">
						<Grid item container xs={12} sm={4} alignItems="center">
							<Grid item xs={4}>
								<img
									src={departingCarrierLogo}
									alt={`${departingCarrierName} logo`}
									width="75%"
									height="60px"
								/>
							</Grid>
							<Grid item xs={8} className={classes.departTime}>
								<Typography
									variant="subtitle2"
									className={classes.departHeader}
								>
									{`${quote.OutboundLeg.DepartureTime} - ${quote.OutboundLeg.ArrivalTime}`}
								</Typography>
								<Typography className={classes.departSubtitle}>
									{departingCarrierName}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={3} className={classes.departDuration}>
							<Typography variant="subtitle2" className={classes.departHeader}>
								{quote.OutboundLeg.Duration}
							</Typography>
							<Typography
								className={classes.departSubtitle}
							>{`${cities.from} - ${cities.to}`}</Typography>
						</Grid>
						<Grid item xs={12} sm={3} className={classes.departStop}>
							<Typography variant="subtitle2" className={classes.departHeader}>
								{quote.Direct === false ? "1 stop" : "Nonstop"}
							</Typography>

							{quote.Direct === false && (
								<Typography className={classes.departSubtitle}>
									{quote.OutboundLeg.Stops[0].Duration}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12} sm={2}>
							<Typography
								variant="subtitle2"
								className={classes.departPriceBold}
								align="right"
							>
								{`$${quote.MinPrice}`}
							</Typography>
							<Typography className={classes.departSubtitle} align="right">
								{quote.InboundLeg
									? "round trip per traveler"
									: "one way per traveler"}
							</Typography>
						</Grid>
					</Grid>
				)}
			</AccordionSummary>
			<Divider />
			<AccordionDetails>
				<Grid item container xs={12}>
					<Grid item xs={1} className={classes.summaryLogo}>
						<img
							src={departingCarrierLogo}
							alt={`${departingCarrierName} logo`}
							width="100%"
							height="60px"
						/>
					</Grid>
					<Grid item xs={11}>
						<Timeline className={classes.timeline}>
							<TimelineItem
								classes={{
									root: classes.itemRoot,
									missingOppositeContent: classes.timelineItem,
								}}
							>
								<TimelineSeparator classes={{ root: classes.separator }}>
									<TimelineDot
										variant="outlined"
										classes={{ root: classes.timelineDot }}
									/>
									<TimelineConnector
										classes={{ root: classes.timelineConnector }}
									/>
								</TimelineSeparator>
								<TimelineContent classes={{ root: classes.timelineContent }}>
									{`${quote.OutboundLeg.DepartureTime} ${cities.from} Airport`}
									<Typography
										color="secondary"
										className={classes.timelineInsert}
									>
										{`Travel Time: ${
											quote.Direct === false
												? quote.OutboundLeg.TravelTimeToStop
												: quote.OutboundLeg.Duration
										}`}
									</Typography>
								</TimelineContent>
							</TimelineItem>
							{quote.Direct === false && (
								<TimelineItem
									classes={{
										root: classes.itemRoot,
										missingOppositeContent: classes.timelineItem,
									}}
								>
									<TimelineSeparator classes={{ root: classes.separator }}>
										<TimelineDot
											variant="outlined"
											classes={{ root: classes.timelineDot }}
										/>
										<TimelineConnector
											classes={{ root: classes.timelineConnector }}
										/>
									</TimelineSeparator>
									<TimelineContent classes={{ root: classes.timelineContent }}>
										{`${quote.OutboundLeg.Stops[0].ArrivalTime} ${quote.OutboundLeg.Stops[0].City}`}
										<Typography
											color="secondary"
											className={classes.timelineInsert}
										>
											{`Travel Time: ${quote.OutboundLeg.Stops[0].TravelTimeFromStop}`}
										</Typography>
									</TimelineContent>
								</TimelineItem>
							)}
							<TimelineItem
								classes={{ missingOppositeContent: classes.timelineItem }}
							>
								<TimelineSeparator classes={{ root: classes.separator }}>
									<TimelineDot
										variant="outlined"
										classes={{ root: classes.timelineDot }}
									/>
								</TimelineSeparator>
								<TimelineContent classes={{ root: classes.timelineContent }}>
									{`${quote.OutboundLeg.ArrivalTime} ${cities.to} Airport`}
									<Typography
										color="secondary"
										className={classes.timelineAfter}
									>
										{departingCarrierName}
									</Typography>
									<Typography
										color="secondary"
										className={classes.timelineAfter}
										display="inline"
									>
										{`Plane and crew by ${departingCarrierName}`}
									</Typography>
									<Divider light className={classes.timelineDivider} />
									{quote.Direct === false && (
										<Typography
											color="secondary"
											className={classes.timelineLast}
										>
											{`${quote.OutboundLeg.Stops[0].Duration} layover ${quote.OutboundLeg.Stops[0].City}`}
										</Typography>
									)}
								</TimelineContent>
							</TimelineItem>
						</Timeline>
					</Grid>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default FlightAccordion;
