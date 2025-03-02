import { formatDateTime } from "~/Pages/HomePage/helpers";
import { countryFlags } from "~/utils/constants/constants";
import type { Race } from "~/utils/fetchers/raceList";
import type { RaceResultAPI } from "~/utils/fetchers/results";

export const dateAndTimeEvents = (race: Race) => {
	const firstPractice = formatDateTime(
		race.FirstPractice?.date && race.FirstPractice?.time
			? `${race.FirstPractice.date}T${race.FirstPractice.time}`
			: undefined,
	);
	const secondPractice = formatDateTime(
		race.SecondPractice?.date && race.SecondPractice?.time
			? `${race.SecondPractice.date}T${race.SecondPractice.time}`
			: undefined,
	);
	const thirdPractice = formatDateTime(
		race.ThirdPractice?.date && race.ThirdPractice?.time
			? `${race.ThirdPractice.date}T${race.ThirdPractice.time}`
			: undefined,
	);
	const qualifying = formatDateTime(
		race.Qualifying?.date && race.Qualifying?.time
			? `${race.Qualifying.date}T${race.Qualifying.time}`
			: undefined,
	);
	const sprintQualifying = formatDateTime(
		race.SprintQualifying?.date && race.SprintQualifying?.time
			? `${race.SprintQualifying.date}T${race.SprintQualifying.time}`
			: undefined,
	);
	const sprint = formatDateTime(
		race.Sprint?.date && race.Sprint?.time
			? `${race.Sprint.date}T${race.Sprint.time}`
			: undefined,
	);
	const grandPrix = formatDateTime(
		race?.date && race?.time ? `${race.date}T${race.time}` : undefined,
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

export const getCountryFlagUrl = (race: Race | RaceResultAPI) => {
	const country = race.Circuit.Location.country;
	const flag = countryFlags.find((flag) => flag.name === country);

	return flag ? flag.flag : "";
};
