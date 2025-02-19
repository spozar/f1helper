import SelectedRace from "~/Components/SelectedRace/SelectedRace";
import type { RaceTable } from "~/utils/fetchers/raceList";

import { useState } from "react";
import {
	dateAndTimeEvents,
	getCountryFlagUrl,
} from "~/Components/SelectedRace/helpers";

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
					return (
						<>
							{selectedRace === race.round ? (
								<SelectedRace key={race.round} race={race} />
							) : (
								<div
									className="cursor-pointer flex"
									key={race.round}
									onKeyDown={() => setSelectedRace(race.round)}
									onClick={() => setSelectedRace(race.round)}
								>
									<div className="flex h-12 w-[40%]">
										<div className="flex gap-4">
											<div className="w-8">
												<img
													className="h-auto pt-1"
													src={getCountryFlagUrl(race)}
													alt="country flag"
												/>
											</div>
											<h3 className="text-xl">{race.raceName}</h3>
										</div>
									</div>
									<div className="flex gap-4 w-32">
										<p>{dateAndTimeEvents(race).grandPrixDate}</p>
										<p>{dateAndTimeEvents(race).grandPrixTime}</p>
									</div>
								</div>
							)}
						</>
					);
				})}
			</div>
		</div>
	);
};

export default HomePage;
