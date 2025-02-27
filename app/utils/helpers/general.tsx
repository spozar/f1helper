import type { Race } from "../fetchers/raceList";

export const hasRacePassed = (race: Race) => {
	const currentDate = new Date();
	const raceDate = new Date(`${race.date}T${race.time}`);

	if (currentDate > raceDate) {
		return true;
	}

	return false;
};
