export interface RaceTableResultAPI {
	season: string;
	Races: RaceResultAPI[];
}

export interface RaceResultAPI {
	season: string;
	round: string;
	url: string;
	raceName: string;
	Circuit: CircuitResultAPI;
	date: string;
	time: string;
	Results: ResultResultAPI[];
}

export interface CircuitResultAPI {
	circuitId: string;
	url: string;
	circuitName: string;
	Location: LocationResultAPI;
}

export interface LocationResultAPI {
	lat: string;
	long: string;
	locality: string;
	country: string;
}

export interface ResultResultAPI {
	number: string;
	position: string;
	positionText: string;
	points: string;
	Driver: DriverResultAPI;
	Constructor: ConstructorResultAPI;
	grid: string;
	laps: string;
	status: string;
	Time?: RaceTimeResultAPI;
	FastestLap?: FastestLapResultAPI;
}

export interface DriverResultAPI {
	driverId: string;
	permanentNumber: string;
	code: string;
	url: string;
	givenName: string;
	familyName: string;
	dateOfBirth: string;
	nationality: string;
}

export interface ConstructorResultAPI {
	constructorId: string;
	url: string;
	name: string;
	nationality: string;
}

export interface RaceTimeResultAPI {
	millis: string;
	time: string;
}

export interface FastestLapResultAPI {
	rank: string;
	lap: string;
	Time: FastLapTimeResultAPI;
	AverageSpeed: AverageSpeedResultAPI;
}

export interface FastLapTimeResultAPI {
	time: string;
}

export interface AverageSpeedResultAPI {
	units: string;
	speed: string;
}

const deduplicateRaces = (races: RaceResultAPI[]): RaceResultAPI[] => {
	const uniqueRaces: { [round: string]: RaceResultAPI } = {};
	for (const race of races) {
		// Save or overwrite by round (assuming round is unique)
		uniqueRaces[race.round] = race;
	}
	return Object.values(uniqueRaces);
};

const resultsFetcher = async (
	year: string,
): Promise<RaceTableResultAPI | null> => {
	const limit = 90;
	let offset = 0;
	let total = 0;
	const combinedRaces: RaceResultAPI[] = [];

	try {
		do {
			const url = `https://api.jolpi.ca/ergast/f1/${year}/results?limit=${limit}&offset=${offset}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			const data = await response.json();

			const raceTable: RaceTableResultAPI = data.MRData.RaceTable;

			if (total === 0) {
				total = Number.parseInt(data.MRData.total, 10);
			}

			combinedRaces.push(...raceTable.Races);
			offset += limit;
		} while (offset < total);

		const uniqueRaces = deduplicateRaces(combinedRaces);
		const season = uniqueRaces.length > 0 ? uniqueRaces[0].season : year;

		const resultList: RaceTableResultAPI = {
			season,
			Races: uniqueRaces,
		};

		return resultList;
	} catch (error) {
		console.error("Error fetching races:", error);
		return null;
	}
};

export default resultsFetcher;
