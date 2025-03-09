import type { Race } from "../fetchers/raceList";

export const hasRacePassed = (race: Race) => {
	const currentDate = new Date();
	const raceDate = new Date(`${race.date}T${race.time}`);

	if (currentDate > raceDate) {
		return true;
	}

	return false;
};

export const convertCounstrctorIdToName = (constructorId?: string) => {
	switch (constructorId) {
		case "Mercedes":
			return "Mercedes";
		case "Red Bull":
			return "Red Bull";
		case "Ferrari":
			return "Ferrari";
		case "McLaren":
			return "McLaren";
		case "Aston Martin":
			return "Aston Martin";
		case "Alpine F1 Team":
			return "Alpine";
		case "Williams":
			return "Williams";
		case "RB F1 Team":
			return "Racing Bulls";
		case "Kick Sauber":
			return "Kick Sauber";
		case "Haas F1 Team":
			return "Haas";
		default:
			return constructorId;
	}
};
