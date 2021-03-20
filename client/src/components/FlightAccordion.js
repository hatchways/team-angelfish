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
import TurkLogo from "../assets/images/turk-logo.png";
import useStyles from "../styles/FlightAccordion";

const FlightAccordion = ({ quote, carrier, date }) => {
	const classes = useStyles();
	const [expand, setExpand] = useState(false);

	const showDetails = (event, expanded) => {
		setExpand(expanded)
	};

	return (
		<>
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
										width="50%"
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
										{date.slice(0, 10)}
									</Typography>
								</Grid>
							</Grid>
							<Grid
								item
								container
								xs={12}
								sm={5}
								justify="flex-end"
								spacing={0}
							>
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
										{quote.MinPrice}
									</Typography>
									<Typography className={classes.departSubtitle} align="right">
										round trip
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					) : (
						<Grid item container xs={12} alignItems="center">
							<Grid item container xs={12} sm={4} alignItems="center">
								<Grid item xs={4}>
									<img src={TurkLogo} alt="turkish logo" width="75%" />
								</Grid>
								<Grid item xs={8} className={classes.departTime}>
									<Typography
										variant="subtitle2"
										className={classes.departHeader}
									>
										10:30 PM - 7:35 AM
									</Typography>
									<Typography className={classes.departSubtitle}>
										{carrier.Name}
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={2} className={classes.departDuration}>
								<Typography
									variant="subtitle2"
									className={classes.departHeader}
								>
									32hr 5 min
								</Typography>
								<Typography className={classes.departSubtitle}>
									YYZ-DPS
								</Typography>
							</Grid>
							<Grid item xs={12} sm={4} className={classes.departStop}>
								<Typography
									variant="subtitle2"
									className={classes.departHeader}
								>
									1 stop
								</Typography>
								<Typography className={classes.departSubtitle}>
									10hr 15 min IST
								</Typography>
							</Grid>
							<Grid item xs={12} sm={2}>
								<Typography
									variant="subtitle2"
									className={classes.departPriceBold}
									align="right"
								>
									{quote.MinPrice}
								</Typography>
								<Typography className={classes.departSubtitle} align="right">
									round trip
								</Typography>
							</Grid>
						</Grid>
					)}
				</AccordionSummary>
				<Divider />
				<AccordionDetails>
					<Grid item container xs={12}>
						<Grid item xs={1} className={classes.summaryLogo}>
							<img src={TurkLogo} alt="turkish logo" width="95%" />
						</Grid>
						<Grid item xs={11} className={classes.timelineMargin}>
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
										8:40AM Toronto Pearson International Airport (YYZ)
										<Typography
											color="secondary"
											className={classes.timelineInsert}
										>
											Travel Time: 1hr 41min
										</Typography>
									</TimelineContent>
								</TimelineItem>
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
										9:21AM O'HareInternational Airport (ORD)
										<Typography
											color="secondary"
											className={classes.timelineAfter}
										>
											Air CanadaEconomyEmbraer RJ-175AC 7701
										</Typography>
										<Typography
											color="secondary"
											className={classes.timelineAfter}
											display="inline"
										>
											Plane and crew by Air Canada Express - Sky Regional Ticket
											also sold by United
										</Typography>
										<Divider light className={classes.timelineDivider} />
										<Typography
											color="secondary"
											className={classes.timelineLast}
										>
											1 hr 19 min layover Chicago (ORD)
										</Typography>
									</TimelineContent>
								</TimelineItem>
							</Timeline>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default FlightAccordion;
