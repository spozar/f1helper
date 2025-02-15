import type { Race } from "~/utils/fetchers/raceList";
import { dateAndTimeEvents } from "../SelectedRace/helpers";

const Race = (race: Race) => {
	const {
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
	} = dateAndTimeEvents(race);
	return (
		<div>
			<h3>{race.raceName}</h3>
		</div>
	);
};

export default Race;
