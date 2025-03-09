export type DriversApIResponse = {
	driverId: string;
	permanentNumber: string;
	code: string;
	url: string;
	givenName: string;
	familyName: string;
	dateOfBirth: string;
	nationality: string;
};

const fetchDrivers = async (year: string) => {
	const response = await fetch(
		`https://api.jolpi.ca/ergast/f1/${year}/drivers/`,
	);
	const data = await response.json();

	const results: DriversApIResponse[] = data.MRData.DriverTable.Drivers;

	return results;
};

export default fetchDrivers;
