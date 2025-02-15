import type { Race } from "~/utils/fetchers/raceList";
import { dateAndTimeEvents, getCountryFlagUrl } from "./helpers";
import { Countdown } from "../Countdown/Countdown";

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
		<div>
			<div className="flex items-center gap-2">
				<img className="h-8" src={getCountryFlagUrl(race)} alt="country flag" />
				<h1 className="text-4xl">{race.raceName}</h1>
			</div>
			<div className="flex flex-col md:flex-row gap-8">
				<div className="md:justify-center flex flex-col">
					<p>{`${grandPrixDate} ${grandPrixTime}`}</p>
					<h4>Starts in:</h4>
					<div className="self-end">
						<Countdown date={race.date} time={race.time} />
					</div>
				</div>
				<div className="items-end flex gap-4">
					{sessions.map(
						(session) =>
							session.date && (
								<div key={session.name} className="flex flex-col -mb-1">
									<p>{session.name}</p>
									<p>{session.date}</p>
									<p>{session.time}</p>
								</div>
							),
					)}
				</div>
			</div>
		</div>
	);
};

export default SelectedRace;
