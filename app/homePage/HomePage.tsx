import React, { useState } from "react";

import { FaFlagCheckered } from "react-icons/fa";

import SelectedRace from "~/Components/SelectedRace/SelectedRace";
import type { Race, RaceTable } from "~/utils/fetchers/raceList";
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

	const hasRacePassed = (race: Race) => {
		const currentDate = new Date();
		const raceDate = new Date(`${race.date}T${race.time}`);

		if (currentDate > raceDate) {
			return true;
		}

		return false;
	};

	return (
		<div className="container mt-12">
			<div className="flex flex-col gap-4">
				{raceList.Races.map((race, index) => {
					return (
						<React.Fragment key={race.round}>
							{selectedRace === race.round ? (
								<SelectedRace key={race.round} race={race} />
							) : (
								<div
									className={`cursor-pointer flex ${hasRacePassed(race) && "line-through opacity-50"}`}
									key={race.round}
									onKeyDown={() => setSelectedRace(race.round)}
									onClick={() => setSelectedRace(race.round)}
								>
									<div className="flex h-12 w-[40%]">
										<div className="flex gap-4">
											<div className="w-8">
												<img
													src={getCountryFlagUrl(race)}
													className="h-auto pt-1"
													alt="country flag"
												/>
											</div>
											<h3 className="text-xl">{race.raceName}</h3>
											{index === 0 && (
												<div className="bg-gray-600 text-white rounded-lg h-8 flex items-center px-2 gap-2">
													<p className="leading-none">Upcoming race</p>
													<FaFlagCheckered />
												</div>
											)}
										</div>
									</div>
									<div className="flex gap-4 w-32">
										<p>{dateAndTimeEvents(race).grandPrixDate}</p>
										<p>{dateAndTimeEvents(race).grandPrixTime}</p>
									</div>
								</div>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default HomePage;
