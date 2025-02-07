export interface RaceTable {
	season: string;
	Races: Race[];
}

export interface Race {
	season: string;
	round: string;
	raceName: string;
	Circuit: Circuit;
	date: string; // ISO 8601 date format (YYYY-MM-DD)
	time: string; // ISO 8601 time format (HH:MM:SSZ)
	FirstPractice: Session;
	SecondPractice?: Session;
	ThirdPractice?: Session; // Optional since some events might not have it
	Qualifying: Session;
	SprintQualifying?: Session; // Optional in case there's a sprint
	Sprint?: Session; // Optional in case there's a sprint race
}

export interface Circuit {
	circuitId: string;
	url: string;
	circuitName: string;
	Location: Location;
}

export interface Location {
	lat: string;
	long: string;
	locality: string;
	country: string;
}

export interface Session {
	date: string;
	time: string;
}

export const fetchRaceList = async () => {
	const response = await fetch(
		'https://api.jolpi.ca/ergast/f1/2025/races/'
	);

	if (!response.ok) {
		return null;
	}

	const data = await response.json();

	const raceList: RaceTable = data.MRData.RaceTable;

	return raceList;
};
