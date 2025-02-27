import { dateAndTimeEvents } from "~/Modules/SelectedRace/helpers";
import type { Race } from "~/utils/fetchers/raceList";

interface RaceDateTimeProps {
	race: Race;
}

const RaceDateTime = ({ race }: RaceDateTimeProps) => {
	const events = dateAndTimeEvents(race);

	return (
		<div className="flex gap-2 md:gap-4">
			<p className="text-right text-nowrap">{events.grandPrixDate}</p>
			<p>{events.grandPrixTime}</p>
		</div>
	);
};

export default RaceDateTime;
