import type { Race } from "~/utils/fetchers/raceList";
import { dateAndTimeEvents, getCountryFlagUrl } from "./helpers";
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
			name: "FP1",
			date: firstPracticeDate,
			time: firstPracticeTime,
		},
		{
			name: "FP2",
			date: secondPracticeDate,
			time: secondPracticeTime,
		},
		{
			name: "FP3",
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
			className="cursor-pointer p-2"
		>
			<div className="flex items-center gap-2">
				<img className="h-4" src={getCountryFlagUrl(race)} alt="country flag" />
				<h2 className="text-xl">{race.raceName}</h2>
			</div>
			<div className="flex justify-between gap-2">
				<div className="md:justify-center flex flex-col">
					<p>{`${grandPrixDate} ${grandPrixTime}`}</p>
					<h4>Starts in:</h4>
					<div className="md:self-end">
						<Countdown date={race.date} time={race.time} />
					</div>
				</div>
				<div className="flex flex-col gap-2 items-end">
					{sessions.map(
						(session) =>
							session.date && (
								<div key={session.name} className="flex text-sm gap-4 -mb-1">
									<p>{session.name}</p>
									<p>{session.date}</p>
									<p>{session.time}</p>
								</div>
							),
					)}
				</div>
			</div>
			<div className="border-b border-gray-500 w-full mt-4" />
		</div>
	);
};

export default SelectedRace;
