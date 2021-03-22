/** @format */

// random generators
const randomPrice = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};
const randomInt = (num) => {
	return Math.floor(Math.random() * num);
};

// times for direct flights
const noStops = [
	{
		depart: "6:50AM",
		arrive: "11:10AM",
		duration: "4 hr 20 min",
	},
	{
		depart: "11:25AM",
		arrive: "4:55PM",
		duration: "5 hr 30 min",
	},
	{
		depart: "2:30PM",
		arrive: "9:15PM",
		duration: "6 hr 45 min",
	},
	{
		depart: "4:15PM",
		arrive: "8:25PM",
		duration: "4 hr 10 min",
	},
];
const directTime = () => {
	const direct = noStops[randomInt(noStops.length)];
	return {
		DepartureTime: direct.depart,
		ArrivalTime: direct.arrive,
		Duration: direct.duration,
	};
};
// times for indirect flights
const withStops = [
	{
		depart: "6:50AM",
		arrive: "11:10AM",
		duration: "4 hr 20 min",
		stopDuration: "1 hr 45 min",
	},
	{
		depart: "11:25AM",
		arrive: "4:55PM",
		duration: "5 hr 30 min",
		stopDuration: "3 hr 0 min",
	},
	{
		depart: "2:30PM",
		arrive: "9:15PM",
		duration: "6 hr 45 min",
		stopDuration: "4 hr 10 min",
	},
	{
		depart: "4:15PM",
		arrive: "8:25PM",
		duration: "4 hr 10 min",
		stopDuration: "1 hr 40 min",
	},
];
const indirectTime = () => {
	const indirect = withStops[randomInt(withStops.length)];
	return {
		DepartureTime: indirect.depart,
		ArrivalTime: indirect.arrive,
		Duration: indirect.duration,
		Stops: [
			{
				City: "Queens (JFK)", // layovers in New York
				Duration: indirect.stopDuration,
			},
		],
	};
};

/* 
Note: For roundtrips, departure dates (OutboundLeg) and return dates (InboundLeg) may 
from time to time return the same flight time. To avoid this occurrence, we will 
need to separate the times for departure dates from the return dates. 

example: 

const directFlightDepart = []
const directFlightReturn = []
const indirectFlightDepart = []
const indirectFlightReturn = []
*/

const mockData = ({ from, to, departure, returning }) => {
	const carrierIds = [29, 173, 870, 450];
	const randomCarrier = (num = carrierIds.length) => carrierIds[randomInt(num)];
	const quotes = [
		{
			QuoteId: 1,
			MinPrice: returning ? randomPrice(225, 255) : randomPrice(110, 145),
			Direct: false,
			OutboundLeg: {
				CarrierId: randomCarrier(),
				DepartureDate: departure,
				...indirectTime(),
			},
			...(returning && {
				InboundLeg: {
					CarrierId: randomCarrier(),
					ReturnDate: returning,
					...indirectTime(),
				},
			}),
		},
		{
			QuoteId: 2,
			MinPrice: returning ? randomPrice(255, 285) : randomPrice(145, 210),
			Direct: true,
			OutboundLeg: {
				CarrierId: randomCarrier(),
				DepartureDate: departure,
				...directTime(),
			},
			...(returning && {
				InboundLeg: {
					CarrierId: randomCarrier(),
					ReturnDate: returning,
					...directTime(),
				},
			}),
		},
		{
			QuoteId: 3,
			MinPrice: returning ? randomPrice(255, 285) : randomPrice(145, 210),
			Direct: true,
			OutboundLeg: {
				CarrierId: randomCarrier(),
				DepartureDate: departure,
				...directTime(),
			},
			...(returning && {
				InboundLeg: {
					CarrierId: randomCarrier(),
					ReturnDate: returning,
					...directTime(),
				},
			}),
		},
		{
			QuoteId: 4,
			MinPrice: returning ? randomPrice(225, 255) : randomPrice(110, 145),
			Direct: false,
			OutboundLeg: {
				CarrierId: randomCarrier(),
				DepartureDate: departure,
				...indirectTime(),
			},
			...(returning && {
				InboundLeg: {
					CarrierId: randomCarrier(),
					ReturnDate: returning,
					...indirectTime(),
				},
			}),
		},
		{
			QuoteId: 5,
			MinPrice: returning ? randomPrice(255, 285) : randomPrice(145, 210),
			Direct: true,
			OutboundLeg: {
				CarrierId: randomCarrier(),
				DepartureDate: departure,
				...directTime(),
			},
			...(returning && {
				InboundLeg: {
					CarrierId: randomCarrier(),
					ReturnDate: returning,
					...directTime(),
				},
			}),
		},
	].sort((x, y) => x.MinPrice - y.MinPrice); // sort by price and shuffle

	return {
		From: from,
		To: to,
		Quotes: quotes.slice(randomInt(quotes.length)), // return random no. of results
		Carriers: [
			{
				CarrierId: 29,
				Name: "American Airlines",
				LogoUrl: "https://images.app.goo.gl/2cMU7XMepefeVCGG6",
			},
			{
				CarrierId: 173,
				Name: "Air Canada",
				LogoUrl: "https://images.app.goo.gl/LJGUpxRRPz6QYKz66",
			},
			{
				CarrierId: 870,
				Name: "JetBlue",
				LogoUrl: "https://images.app.goo.gl/QrF9p4BQAsSQSNXN8",
			},
			{
				CarrierId: 450,
				Name: "Delta Air Lines",
				LogoUrl: "https://images.app.goo.gl/KUpzJ63e9HTYA9em6",
			},
		],
	};
};

module.exports = mockData;
