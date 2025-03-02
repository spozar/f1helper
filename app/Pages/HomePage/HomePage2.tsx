import React, { useEffect, useState } from "react";
import { FaFlagCheckered } from "react-icons/fa";
import AnimateHeight from "react-animate-height";

import SelectedRace from "~/Modules/SelectedRace/SelectedRace";
import type { RaceTable } from "~/utils/fetchers/raceList";
import { getCountryFlagUrl } from "~/Modules/SelectedRace/helpers";
import { Expanded, NotExpanded } from "~/Components/SVGs/SVGs";
import { addHours } from "date-fns";
import { hasRacePassed } from "~/utils/helpers/general";
import RaceDateTime from "./Components/RaceDateTime";

interface HomePageProps {
	raceList: RaceTable | null;
}

export const HomePage2 = ({ raceList }: HomePageProps) => {
	const [selectedRace, setSelectedRace] = useState<string[]>([]);
	const [nextRace, setNextRace] = useState<string>("");

	const handleClick = (raceRound: string) => {
		if (selectedRace.includes(raceRound)) {
			setSelectedRace(selectedRace.filter((race) => race !== raceRound));
		} else {
			setSelectedRace([...selectedRace, raceRound]);
		}
	};

	useEffect(() => {
		const currentDatePlusOneHour = addHours(new Date(), 1);
		const nextRace = raceList?.Races.find(
			(race) => currentDatePlusOneHour < new Date(`${race.date}T${race.time}`),
		);

		setNextRace(nextRace?.round || "");
	}, [raceList?.Races]);

	if (!raceList) {
		return (
			<div className="flex justify-center items-center p-8 text-red-400">
				Something went wrong while fetching the Formula 1 data
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-6">
			<h2 className="text-2xl font-bold mb-6 text-gray-100">
				F1 Race Calendar
			</h2>
			<div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
				{raceList.Races.map((race, index) => {
					const isSelected = selectedRace.includes(race.round);
					const isNextRace = nextRace === race.round;
					const isPastRace = hasRacePassed(race);

					return (
						<React.Fragment key={race.round}>
							<div
								className={`border-b border-neutral-700 ${index === raceList.Races.length - 1 && "border-b-0"}`}
							>
								<button
									type="button"
									className={`w-full text-left transition-colors ${
										isNextRace
											? "bg-amber-900/30"
											: index % 2 === 0
												? "bg-neutral-900"
												: "bg-neutral-800"
									} hover:bg-neutral-700`}
									onClick={() => handleClick(race.round)}
								>
									<div className="flex items-center p-3 md:p-4">
										<div className="flex-shrink-0 w-8 h-6 mr-3 flex items-center justify-center">
											<img
												src={getCountryFlagUrl(race)}
												className="max-h-5 max-w-full rounded shadow-sm"
												alt={`${race.Circuit.Location.country} flag`}
											/>
										</div>

										<div
											className={`flex-grow ${isPastRace && "line-through opacity-50"}`}
										>
											<h3 className="text-sm font-medium">
												{race.raceName.replace("Grand Prix", "GP")}
											</h3>
											<p className="text-xs text-gray-400">
												{race.Circuit.circuitName}
											</p>
										</div>

										<div className="flex items-center space-x-3">
											<RaceDateTime race={race} />

											{isNextRace && (
												<div className="bg-amber-300 text-black rounded px-2 py-0.5 flex items-center gap-1">
													<span className="text-xs font-medium">Next</span>
													<FaFlagCheckered size={12} />
												</div>
											)}

											<div className="text-gray-400" />
											{isSelected ? <Expanded /> : <NotExpanded />}
										</div>
									</div>
								</button>

								<AnimateHeight
									height={isSelected ? "auto" : 0}
									duration={300}
									easing="ease-out"
								>
									<div className="bg-neutral-850 border-t border-neutral-700 px-4 py-3">
										<SelectedRace race={race} />
									</div>
								</AnimateHeight>
							</div>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default HomePage2;
