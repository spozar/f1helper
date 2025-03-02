import type { Race } from "~/utils/fetchers/raceList";
import { dateAndTimeEvents } from "./helpers";
import { Countdown } from "~/Components/Countdown/Countdown";

interface SelectedRaceProps {
	race: Race;
}

const SelectedRace = ({ race }: SelectedRaceProps) => {
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
		<div className="cursor-pointer px-2 md:px-3">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col">
					<h4 className="self-start">Starts in:</h4>
					<Countdown date={race.date} time={race.time} />
				</div>
				<div className="flex flex-col gap-2 items-end">
					{sessions.map(
						(session) =>
							session.date && (
								<div
									key={session.name}
									className="flex text-sm justify-between w-full pb-2 border-b border-gray-600"
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
