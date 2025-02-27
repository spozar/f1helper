import { formatDateTime } from "~/Pages/HomePage/helpers";
import { countryFlags } from "~/utils/constants/constants";
import type { Race } from "~/utils/fetchers/raceList";

export const dateAndTimeEvents = (race: Race) => {
	// Always call the hook by passing the UTC string or undefined.
	const firstPractice = formatDateTime(
		race.FirstPractice
			? `${race.FirstPractice.date}T${race.FirstPractice.time}`
			: undefined,
	);
	const secondPractice = formatDateTime(
		race.SecondPractice
			? `${race.SecondPractice.date}T${race.SecondPractice.time}`
			: undefined,
	);
	const thirdPractice = formatDateTime(
		race.ThirdPractice
			? `${race.ThirdPractice.date}T${race.ThirdPractice.time}`
			: undefined,
	);
	const qualifying = formatDateTime(
		race.Qualifying
			? `${race.Qualifying.date}T${race.Qualifying.time}`
			: undefined,
	);
	const sprintQualifying = formatDateTime(
		race.SprintQualifying
			? `${race.SprintQualifying.date}T${race.SprintQualifying.time}`
			: undefined,
	);
	const sprint = formatDateTime(
		race.Sprint ? `${race.Sprint.date}T${race.Sprint.time}` : undefined,
	);
	const grandPrix = formatDateTime(
		race ? `${race.date}T${race.time}` : undefined,
	);

	return {
		firstPracticeDate: firstPractice.date,
		firstPracticeTime: firstPractice.time,
		secondPracticeDate: secondPractice.date,
		secondPracticeTime: secondPractice.time,
		thirdPracticeDate: thirdPractice.date,
		thirdPracticeTime: thirdPractice.time,
		qualifyingDate: qualifying.date,
		qualifyingTime: qualifying.time,
		sprintQualifyingDate: sprintQualifying.date,
		sprintQualifyingTime: sprintQualifying.time,
		sprintDate: sprint.date,
		sprintTime: sprint.time,
		grandPrixDate: grandPrix.date,
		grandPrixTime: grandPrix.time,
	};
};

export const getCountryFlagUrl = (race: Race) => {
	const country = race.Circuit.Location.country;
	const flag = countryFlags.find((flag) => flag.name === country);

	return flag ? flag.flag : "";
};
