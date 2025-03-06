export type RaceResult = {
	number: string;
	position: string;
	positionText: string;
	points: string;
	Driver: {
		driverId: string;
		permanentNumber: string;
		code: string;
		url: string;
		givenName: string;
		familyName: string;
		dateOfBirth: string;
		nationality: string;
	};
	Constructor: {
		constructorId: string;
		url: string;
		name: string;
		nationality: string;
	};
	grid: string;
	laps: string;
	status: string;
	Time?: {
		millis: string;
		time: string;
	};
	FastestLap?: {
		rank: string;
		lap: string;
		Time: {
			time: string;
		};
		AverageSpeed: {
			units: string;
			speed: string;
		};
	};
};

export type Race = {
	season: string;
	round: string;
	url: string;
	raceName: string;
	Circuit: {
		circuitId: string;
		url: string;
		circuitName: string;
		Location: {
			lat: string;
			long: string;
			locality: string;
			country: string;
		};
	};
	date: string;
	time: string;
	Results: RaceResult[];
};

export type DriverResultsApiResponse = {
	Races: Race[];
};

const fetchDriverResults = async (driverId: string, year: string) => {
	const response = await fetch(
		`https://ergast.com/api/f1/${year}/drivers/${driverId}/results.json`,
	);
	const data = await response.json();

	const results: DriverResultsApiResponse = data.MRData.RaceTable.Races;

	return results;
};

export default fetchDriverResults;
