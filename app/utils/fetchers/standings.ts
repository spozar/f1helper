type Constructor = {
	constructorId: string;
	url: string;
	name: string;
	nationality: string;
};

type Driver = {
	driverId: string;
	permanentNumber: string;
	code: string;
	url: string;
	givenName: string;
	familyName: string;
	dateOfBirth: string;
	nationality: string;
};

// Constructor Standings Types
type ConstructorStanding = {
	position: string;
	positionText: string;
	points: string;
	wins: string;
	Constructor: Constructor;
};

export type ConstructorStandingsList = {
	season: string;
	round: string;
	ConstructorStandings: ConstructorStanding[];
};

export type ConstructorStandingsTable = {
	season: string;
	round: string;
	StandingsLists: ConstructorStandingsList[];
};

// Driver Standings Types
type DriverStanding = {
	position: string;
	positionText: string;
	points: string;
	wins: string;
	Driver: Driver;
	Constructors: Constructor[];
};

export type DriverStandingsList = {
	season: string;
	round: string;
	DriverStandings: DriverStanding[];
};

export type DriverStandingsTable = {
	season: string;
	round: string;
	StandingsLists: DriverStandingsList[];
};

export const fetchDriverStandings = async (year?: string) => {
	const response = await fetch(
		`https://api.jolpi.ca/ergast/f1/${year || 2025}/driverstandings/`,
	);

	if (!response.ok) {
		return null;
	}

	const data = await response.json();

	const raceList: DriverStandingsTable = data.MRData.StandingsTable;

	return raceList;
};

export const fetchConstructorStandings = async (year?: string) => {
	const response = await fetch(
		`https://api.jolpi.ca/ergast/f1/${year || 2025}/constructorstandings/`,
	);

	if (!response.ok) {
		return null;
	}

	const data = await response.json();

	const raceList: ConstructorStandingsTable = data.MRData.StandingsTable;

	return raceList;
};
