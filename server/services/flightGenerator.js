/** @format */
import { add, format, intervalToDuration } from "date-fns";
// random generators
const randomMinMax = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};
const randomInt = (num) => {
	return Math.floor(Math.random() * num);
};
// format flight dates
const formattedDate = (date) => {
	const resetDate = new Date(`${date}T00:00`);
	const pattern = (option) => format(resetDate, option);
	return `${pattern("EEE")}, ${pattern("LLL")} ${pattern("d")}`;
};
// convert minutes for layovers
const convertMinutes = (num) => {
	const hours = Math.floor(num / 60);
	const minutes = num % 60;
	return `${hours} ${hours > 1 ? `hours` : `hour`} ${minutes} minutes`;
};
/* make the flight time between 2 hr 25 min to 2 hr 40 min */
// times for direct flights
const directTime = () => {
	const randomTime = randomMinMax(100000000, 154000000);
	const departTime = new Date(randomTime);
	const arrivalTime = add(departTime, {
		hours: 2,
		minutes: randomMinMax(25, 41),
	});
	const totalDuration = intervalToDuration({
		start: departTime,
		end: arrivalTime,
	});
	return {
		DepartureTime: format(departTime, "p"),
		ArrivalTime: format(arrivalTime, "p"),
		Duration: `2 hours ${totalDuration.minutes} minutes`,
	};
};

// times for indirect flights
const indirectTime = () => {
	const randomTime = randomMinMax(100000000, 154000000);
	const departTime = new Date(randomTime);
	const arrivalTime = add(departTime, {
		hours: randomMinMax(3, 7),
		minutes: randomMinMax(0, 60),
	});
	const totalDuration = intervalToDuration({
		start: departTime,
		end: arrivalTime,
	});
	const totalMinutes = totalDuration.hours * 60 + totalDuration.minutes;
	const stopDuration = convertMinutes(totalMinutes - randomMinMax(145, 161));
	return {
		DepartureTime: format(departTime, "p"),
		ArrivalTime: format(arrivalTime, "p"),
		Duration: `${totalDuration.hours} hours ${totalDuration.minutes} minutes`,
		Stops: [
			{
				City: "Queens (JFK)", // layovers in New York
				Duration: stopDuration,
			},
		],
	};
};

const mockData = ({ from, to, departure, returning }) => {
	const carrierIds = [29, 173, 870, 450];
	const randomCarrier = (num = carrierIds.length) => carrierIds[randomInt(num)];
	const quotes = [
		{
			QuoteId: 1,
			MinPrice: returning ? randomMinMax(225, 255) : randomMinMax(110, 145),
			Direct: false,
			OutboundLeg: {
				CarrierId: randomCarrier(),
				DepartureDate: formattedDate(departure),
				...indirectTime(),
			},
			...(returning && {
				InboundLeg: {
					CarrierId: randomCarrier(),
					ReturnDate: formattedDate(returning),
					...indirectTime(),
				},
			}),
		},
		{
			QuoteId: 2,
			MinPrice: returning ? randomMinMax(255, 285) : randomMinMax(145, 210),
			Direct: true,
			OutboundLeg: {
				CarrierId: randomCarrier(),
				DepartureDate: formattedDate(departure),
				...directTime(),
			},
			...(returning && {
				InboundLeg: {
					CarrierId: randomCarrier(),
					ReturnDate: formattedDate(returning),
					...directTime(),
				},
			}),
		},
		{
			QuoteId: 3,
			MinPrice: returning ? randomMinMax(255, 285) : randomMinMax(145, 210),
			Direct: true,
			OutboundLeg: {
				CarrierId: randomCarrier(),
				DepartureDate: formattedDate(departure),
				...directTime(),
			},
			...(returning && {
				InboundLeg: {
					CarrierId: randomCarrier(),
					ReturnDate: formattedDate(returning),
					...directTime(),
				},
			}),
		},
		{
			QuoteId: 4,
			MinPrice: returning ? randomMinMax(225, 255) : randomMinMax(110, 145),
			Direct: false,
			OutboundLeg: {
				CarrierId: randomCarrier(),
				DepartureDate: formattedDate(departure),
				...indirectTime(),
			},
			...(returning && {
				InboundLeg: {
					CarrierId: randomCarrier(),
					ReturnDate: formattedDate(returning),
					...indirectTime(),
				},
			}),
		},
		{
			QuoteId: 5,
			MinPrice: returning ? randomMinMax(255, 285) : randomMinMax(145, 210),
			Direct: true,
			OutboundLeg: {
				CarrierId: randomCarrier(),
				DepartureDate: formattedDate(departure),
				...directTime(),
			},
			...(returning && {
				InboundLeg: {
					CarrierId: randomCarrier(),
					ReturnDate: formattedDate(returning),
					...directTime(),
				},
			}),
		},
	].sort((x, y) => x.MinPrice - y.MinPrice); // sort by price and shuffle

	return {
		From: from,
		To: to,
		Quotes: quotes.slice(randomInt(quotes.length)),
		Carriers: [
			{
				CarrierId: 29,
				Name: "American Airlines",
				LogoUrl: "",
			},
			{
				CarrierId: 173,
				Name: "United Airlines",
				LogoUrl: "",
			},
			{
				CarrierId: 870,
				Name: "JetBlue",
				LogoUrl: "",
			},
			{
				CarrierId: 450,
				Name: "Delta Air Lines",
				LogoUrl: "",
			},
		],
	};
};

module.exports = mockData;
