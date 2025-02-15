import SelectedRace from "~/Components/SelectedRace/SelectedRace";
import type { RaceTable } from "~/utils/fetchers/raceList";
import { formatDateInUserTimezone } from "./helpers";
import { useState } from "react";
import { getCountryFlagUrl } from "~/Components/SelectedRace/helpers";

interface WelcomeProps {
	raceList: RaceTable | null;
}

export const HomePage = ({ raceList }: WelcomeProps) => {
	const [selectedRace, setSelectedRace] = useState<string>("");
	if (!raceList) {
		return <></>;
	}

	return (
		<div className="container">
			<div className="flex flex-col gap-4">
				{raceList.Races.map((race) => {
					return selectedRace === race.round ? (
						<SelectedRace key={race.round} race={race} />
					) : (
						<div
							key={race.round}
							onKeyDown={() => setSelectedRace(race.round)}
							onClick={() => setSelectedRace(race.round)}
						>
							<div className="flex items-center gap-2">
								<img
									className="h-8"
									src={getCountryFlagUrl(race)}
									alt="country flag"
								/>
								<h3 className="text-4xl">{race.raceName}</h3>
							</div>
							<ul>
								<li>First practice: {race.FirstPractice.date}</li>
								{race.SecondPractice && (
									<li>
										Second practice: {race.SecondPractice.date} -
										{formatDateInUserTimezone(
											race.SecondPractice.date,
											race.SecondPractice.time,
										)}
									</li>
								)}
								{race.ThirdPractice && (
									<li>Third practice: {race.ThirdPractice.date}</li>
								)}
								{race.SprintQualifying?.date && (
									<li>Sprint qualifying: {race.SprintQualifying.date}</li>
								)}
								{race.Sprint?.date && <li>Sprint: {race.Sprint.date}</li>}
								{race.Qualifying?.date && (
									<li>Qualifying: {race.Qualifying.date}</li>
								)}
								{race.date && (
									<li>
										<p className="font-semibold">Grand Prix: {race.date}</p>
									</li>
								)}
							</ul>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default HomePage;
