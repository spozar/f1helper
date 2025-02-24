import type { Race } from "~/utils/fetchers/raceList";
import { dateAndTimeEvents } from "./helpers";
import { Countdown } from "../Countdown/Countdown";

interface SelectedRaceProps {
	race: Race;
	setSelectedRace: (race: string) => void;
}

const SelectedRace = ({ race, setSelectedRace }: SelectedRaceProps) => {
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
		grandPrixDate,
		grandPrixTime,
	} = dateAndTimeEvents(race);

	const sessions = [
		{
			name: "Free practice 1",
			date: firstPracticeDate,
			time: firstPracticeTime,
		},
		{
			name: "Free practice 2",
			date: secondPracticeDate,
			time: secondPracticeTime,
		},
		{
			name: "Free practice 3",
			date: thirdPracticeDate,
			time: thirdPracticeTime,
		},
		{
			name: "Sprint Qualifying",
			date: sprintQualifyingDate,
			time: sprintQualifyingTime,
		},
		{ name: "Sprint", date: sprintDate, time: sprintTime },
		{ name: "Qualifying", date: qualifyingDate, time: qualifyingTime },
	];

	return (
		<div
			onKeyDown={() => setSelectedRace("")}
			onClick={() => setSelectedRace("")}
			className="cursor-pointer px-2 md:px-3"
		>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col">
					<div>
						<h4>Starts in:</h4>
						<Countdown date={race.date} time={race.time} />
					</div>
				</div>
				<div className="flex flex-col gap-2 items-end">
					{sessions.map(
						(session) =>
							session.date && (
								<div
									key={session.name}
									className="flex text-sm justify-between w-full"
								>
									<p>{session.name}</p>
									<p className="flex gap-2 md:gap-4">
										<span>{session.date}</span>
										<span>{session.time}</span>
									</p>
								</div>
							),
					)}
				</div>
			</div>
		</div>
	);
};

export default SelectedRace;
