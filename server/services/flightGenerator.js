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
	const quotes = [1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
		return id % 2 === 0
			? {
					QuoteId: id,
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
			  }
			: {
					QuoteId: id,
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
			  };
	});
	return {
		From: from,
		To: to,
		Quotes: quotes
			.sort((x, y) => x.MinPrice - y.MinPrice)
			.slice(randomInt(quotes.length)),
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
