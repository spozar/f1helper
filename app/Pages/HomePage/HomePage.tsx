import React, { useCallback, useEffect, useState } from "react";

import { FaFlagCheckered } from "react-icons/fa";

import SelectedRace from "~/Components/SelectedRace/SelectedRace";
import type { Race, RaceTable } from "~/utils/fetchers/raceList";
import {
	dateAndTimeEvents,
	getCountryFlagUrl,
} from "~/Components/SelectedRace/helpers";
import { Expanded, NotExpanded } from "~/Components/SVGs/SVGs";
import AnimateHeight from "react-animate-height";
import { addHours } from "date-fns";

interface WelcomeProps {
	raceList: RaceTable | null;
}

export const HomePage = ({ raceList }: WelcomeProps) => {
	const [selectedRace, setSelectedRace] = useState<string[]>([]);

	const [nextRace, setNextRace] = useState<string>("");

	if (!raceList) {
		return <>Something went wrong while fetching the Formula 1 data</>;
	}

	const handleClick = (raceRound: string) => {
		if (selectedRace.includes(raceRound)) {
			setSelectedRace([
				...selectedRace.filter((selectedRace) => selectedRace !== raceRound),
			]);
		} else {
			setSelectedRace([...selectedRace, raceRound]);
		}
	};

	useEffect(() => {
		const currentDatePlusOneHour = addHours(new Date(), 1);
		const nextRace = raceList.Races.find(
			(race) => currentDatePlusOneHour < new Date(`${race.date}T${race.time}`),
		);

		setNextRace(nextRace?.round || "");
	}, [raceList]);

	const hasRacePassed = useCallback((race: Race) => {
		const currentDate = new Date();
		const raceDate = new Date(`${race.date}T${race.time}`);

		if (currentDate > raceDate) {
			return true;
		}

		return false;
	}, []);

	return (
		<div className="flex flex-col lg:w-[70%] mt-4">
			{raceList.Races.map((race, index) => {
				return (
					<React.Fragment key={race.round}>
						<button
							type="button"
							className={`${index % 2 === 0 && "bg-neutral-900"} flex gap-2 cursor-pointer`}
							onClick={() => handleClick(race.round)}
						>
							<div className="w-6 min-w-6 md:w-8 pt-2 md:pt-3 ml-2">
								<img
									src={getCountryFlagUrl(race)}
									className="pt-1 max-h-6"
									alt="country flag"
								/>
							</div>

							<div className="flex flex-col w-full">
								<div
									className={`flex w-full p-2 md:p-3 ${nextRace === race.round && "text-amber-300"} ${hasRacePassed(race) && "line-through opacity-50"}`}
									key={race.round}
								>
									<div className="relative w-full flex items-center gap-2">
										<h3 className="text-sm">
											{race.raceName.replace("Grand Prix", "GP")}
										</h3>
										<div className="opacity-70">
											{selectedRace.includes(race.round) ? (
												<Expanded />
											) : (
												<NotExpanded />
											)}
										</div>
									</div>

									<div className="text-sm flex flex-wrap-reverse gap-2 md:gap-4 justify-end w-full">
										{nextRace === race.round && (
											<div className="bg-amber-300 text-black rounded-sm flex px-1 gap-1 w-fit items-center ">
												<p className="text-[8px] md:text-[12px] font-medium">
													Next
												</p>
												<FaFlagCheckered size={12} />
											</div>
										)}
										<div className="flex gap-2 md:gap-4">
											<p className="text-right text-nowrap">
												{dateAndTimeEvents(race).grandPrixDate}
											</p>
											<p>{dateAndTimeEvents(race).grandPrixTime}</p>
										</div>
									</div>
								</div>
								<AnimateHeight
									height={selectedRace.includes(race.round) ? "auto" : 0}
									duration={300}
									easing="ease-out"
								>
									<div className="mb-4">
										<SelectedRace race={race} />
									</div>
								</AnimateHeight>
							</div>
						</button>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default HomePage;
