import { formatDateTime } from "~/homePage/helpers";
import { countryFlags } from "~/utils/constants/constants";
import type { Race } from "~/utils/fetchers/raceList";

export const dateAndTimeEvents = (race: Race) => {
	const firstPractice =
		race.FirstPractice &&
		formatDateTime(`${race.FirstPractice.date}T${race.FirstPractice.time}`);
	const { date: firstPracticeDate, time: firstPracticeTime } = firstPractice
		? firstPractice
		: { date: undefined, time: undefined };

	const secondPractice =
		race.SecondPractice &&
		formatDateTime(`${race.SecondPractice.date}T${race.SecondPractice.time}`);
	const { date: secondPracticeDate, time: secondPracticeTime } = secondPractice
		? secondPractice
		: { date: undefined, time: undefined };

	const thirdPractice =
		race.ThirdPractice &&
		formatDateTime(`${race.ThirdPractice.date}T${race.ThirdPractice.time}`);
	const { date: thirdPracticeDate, time: thirdPracticeTime } = thirdPractice
		? thirdPractice
		: { date: undefined, time: undefined };

	const qualifying =
		race.Qualifying &&
		formatDateTime(`${race.Qualifying.date}T${race.Qualifying.time}`);
	const { date: qualifyingDate, time: qualifyingTime } = qualifying
		? qualifying
		: { date: undefined, time: undefined };

	const sprintQualifying =
		race.SprintQualifying &&
		formatDateTime(
			`${race.SprintQualifying.date}T${race.SprintQualifying.time}`,
		);
	const { date: sprintQualifyingDate, time: sprintQualifyingTime } =
		sprintQualifying ? sprintQualifying : { date: undefined, time: undefined };

	const sprint =
		race.Sprint && formatDateTime(`${race.Sprint.date}T${race.Sprint.time}`);
	const { date: sprintDate, time: sprintTime } = sprint
		? sprint
		: { date: undefined, time: undefined };
	const grandPrix = race && formatDateTime(`${race.date}T${race.time}`);
	const { date: grandPrixDate, time: grandPrixTime } = grandPrix
		? grandPrix
		: { date: undefined, time: undefined };

	return {
		firstPracticeDate,
		firstPracticeTime,
		secondPracticeDate,
		secondPracticeTime,
		thirdPracticeDate,
		thirdPracticeTime,
		qualifyingDate,
		qualifyingTime,
		sprintQualifyingDate,
		sprintQualifyingTime,
		sprintDate,
		sprintTime,
		grandPrixDate,
		grandPrixTime,
	};
};

export const getCountryFlagUrl = (race: Race) => {
	const country = race.Circuit.Location.country;
	const flag = countryFlags.find((flag) => flag.name === country);

	return flag ? flag.flag : "";
};
