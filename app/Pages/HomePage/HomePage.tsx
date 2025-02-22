import React, { useCallback, useState } from "react";

import { FaFlagCheckered } from "react-icons/fa";

import SelectedRace from "~/Components/SelectedRace/SelectedRace";
import type { Race, RaceTable } from "~/utils/fetchers/raceList";
import {
	dateAndTimeEvents,
	getCountryFlagUrl,
} from "~/Components/SelectedRace/helpers";
import Header from "~/Modules/Header/Header";

interface WelcomeProps {
	raceList: RaceTable | null;
}

export const HomePage = ({ raceList }: WelcomeProps) => {
	const [selectedRace, setSelectedRace] = useState<string>("");

	if (!raceList) {
		return <>Something went wrong while fetching the Formula 1 data</>;
	}

	const hasRacePassed = useCallback((race: Race) => {
		const currentDate = new Date();
		const raceDate = new Date(`${race.date}T${race.time}`);

		if (currentDate > raceDate) {
			return true;
		}

		return false;
	}, []);

	return (
		<div className="container">
			<Header />
			<div className="flex flex-col lg:w-[50%] mt-12">
				{raceList.Races.map((race, index) => {
					return (
						<React.Fragment key={race.round}>
							{selectedRace === race.round ? (
								<SelectedRace
									key={race.round}
									race={race}
									setSelectedRace={setSelectedRace}
								/>
							) : (
								<>
									<div
										className={`cursor-pointer w-full p-2 md:p-3 ${index === 0 && "text-amber-300"} ${index % 2 === 0 && "bg-neutral-900"} flex ${hasRacePassed(race) && "line-through opacity-50"}`}
										key={race.round}
										onKeyDown={() => setSelectedRace(race.round)}
										onClick={() => setSelectedRace(race.round)}
									>
										<div className="flex w-full items-center justify-between">
											<div className="flex md:flex-row flex-col gap-4">
												<div className="flex gap-4">
													<div className=" w-6 md:w-8">
														<img
															src={getCountryFlagUrl(race)}
															className="h-auto pt-1"
															alt="country flag"
														/>
													</div>

													<h3 className="text-sm md:text-xl">
														{race.raceName.replace("Grand Prix", "GP")}
													</h3>
												</div>
											</div>
										</div>
										<div className="text-sm flex gap-4 justify-end items-center">
											{index === 0 && (
												<div className="bg-amber-300 text-black rounded-lg flex items-center py-0.5 px-2 gap-2 w-fit">
													<p className="text-[8px] md:text-[12px] font-medium">
														Next
													</p>
													<FaFlagCheckered size={12} />
												</div>
											)}
											<p className="text-right text-nowrap">
												{dateAndTimeEvents(race).grandPrixDate}
											</p>
											<p>{dateAndTimeEvents(race).grandPrixTime}</p>
										</div>
									</div>
									<div className="border-b border-gray-500 w-full" />
								</>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default HomePage;
