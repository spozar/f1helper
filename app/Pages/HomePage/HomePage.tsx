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
			<div className="flex flex-col lg:w-[70%] mt-12">
				{raceList.Races.map((race, index) => {
					return (
						<React.Fragment key={race.round}>
							<div
								className={`${index % 2 === 0 && "bg-neutral-900"} flex gap-2`}
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
										className={`flex cursor-pointer w-full p-2 md:p-3 ${index === 0 && "text-amber-300"} ${hasRacePassed(race) && "line-through opacity-50"}`}
										key={race.round}
										onKeyDown={() => setSelectedRace(race.round)}
										onClick={() =>
											selectedRace === race.round
												? setSelectedRace("")
												: setSelectedRace(race.round)
										}
									>
										<div className="w-full">
											<h3 className="text-sm">
												{race.raceName.replace("Grand Prix", "GP")}
											</h3>
										</div>
										<div className="text-sm flex gap-2 md:gap-4 justify-end">
											{index === 0 && (
												<div className="bg-amber-300 text-black rounded-sm flex px-1 gap-1 w-fit items-center ">
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
									{selectedRace === race.round && (
										<div className="mb-4">
											<SelectedRace
												race={race}
												setSelectedRace={setSelectedRace}
											/>
										</div>
									)}
								</div>
							</div>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default HomePage;
