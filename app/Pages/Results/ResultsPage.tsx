import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import { FaArrowLeft } from "react-icons/fa";
import { useSearchParams } from "react-router";
import { Expanded, NotExpanded } from "~/Components/SVGs/SVGs";
import { getCountryFlagUrl } from "~/Modules/SelectedRace/helpers";
import type { RaceTableResultAPI } from "~/utils/fetchers/results";

interface ResultsPageProps {
	results: RaceTableResultAPI | null;
}

const ResultsPage = ({ results }: ResultsPageProps) => {
	const [expandedRaces, setExpandedRaces] = useState<string[]>([]);

	const toggleRace = (id: string) => {
		if (expandedRaces.includes(id)) {
			setExpandedRaces(expandedRaces.filter((raceId) => raceId !== id));
		} else {
			setExpandedRaces([...expandedRaces, id]);
		}
	};

	const [searchParams, setSearchParams] = useSearchParams();

	const currentSeason = searchParams.get("year") || new Date().getFullYear();

	if (results === null) {
		return (
			<div className="flex justify-center items-center p-8 text-red-400">
				Something went wrong while fetching the Formula 1 data
			</div>
		);
	}

	if (results?.Races.length === 0) {
		return (
			<div className="mt-16">
				<p>
					No results available for the {currentSeason} season. Please select
					another season.
				</p>
				<button
					type="button"
					onClick={() => setSearchParams({ year: `${+currentSeason - 1}` })}
					className="flex items-center gap-2 mt-4 cursor-pointer"
				>
					<FaArrowLeft />
					Go to previous season
				</button>
			</div>
		);
	}
	return (
		<div className="mx-auto py-4">
			<div className="bg-neutral-800 rounded-lg shadow-lg">
				{results.Races.map((race, index) => {
					const raceId = race.round;

					const isExpanded = expandedRaces.includes(raceId);

					return (
						<React.Fragment key={raceId}>
							<div
								className={`cursor-pointer border-b border-neutral-700 ${index === results.Races.length - 1 && "border-b-0"}`}
								onClick={() => toggleRace(raceId)}
								onKeyDown={() => null}
							>
								<button
									type="button"
									className={`cursor-pointer w-full text-left transition-colors ${
										index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800"
									} hover:bg-neutral-700`}
									onClick={() => toggleRace(raceId)}
								>
									<div className="flex items-center p-3 md:p-4">
										<div className="flex-shrink-0 w-8 h-6 mr-3 flex items-center justify-center">
											<img
												src={getCountryFlagUrl(race)}
												className="max-h-5 max-w-full rounded shadow-sm"
												alt={`${race.Circuit.Location.country} flag`}
											/>
										</div>

										<div className="flex-grow">
											<h3 className="text-sm font-medium">{race.raceName}</h3>
											<p className="text-xs hidden md:block text-gray-400">
												{race.Circuit.circuitName}
											</p>
										</div>

										<div className="flex items-center space-x-3">
											<div className="text-sm text-gray-300">{race.date}</div>
											<div className="text-gray-400">
												{isExpanded ? <Expanded /> : <NotExpanded />}
											</div>
										</div>
									</div>
								</button>

								<AnimateHeight
									height={isExpanded ? "auto" : 0}
									duration={300}
									easing="ease-out"
								>
									<div
										className={`bg-neutral-850 border-t border-neutral-700 px-4 py-3 ${
											index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800"
										}`}
									>
										<div className="space-y-3">
											<h4 className="font-medium">Race Results - Top 10</h4>
											<div className="overflow-x-auto">
												<table className="min-w-full text-sm">
													<thead>
														<tr className="border-b border-neutral-700">
															<th className="py-2 px-4 text-left">Pos</th>
															<th className="py-2 px-4 text-left">Driver</th>
															<th className="py-2 px-4 text-left">
																Constructor
															</th>
															<th className="py-2 px-4 text-left">
																Time/Status
															</th>
															<th className="py-2 px-4 text-left">Points</th>
														</tr>
													</thead>
													<tbody>
														{race.Results.slice(0, 10).map((result) => (
															<tr
																key={result.position}
																className="border-b border-neutral-700 hover:bg-neutral-700"
															>
																<td className="py-2 px-4">{result.position}</td>
																<td className="py-2 px-4">{`${result.Driver.givenName} ${result.Driver.familyName}`}</td>
																<td className="py-2 px-4">
																	{result.Constructor.name}
																</td>
																<td className="py-2 px-4">
																	{result.Time?.time || result.status}
																</td>
																<td className="py-2 px-4">{result.points}</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>

											{/* Fastest Lap Section */}
											<div className="mt-4 bg-neutral-700 rounded-md p-3">
												<h4 className="font-medium mb-2">Fastest Lap</h4>
												{race.Results.find(
													(r) => r.FastestLap?.rank === "1",
												) ? (
													<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
														<div>
															<p className="text-xs text-gray-400">Driver</p>
															<p className="font-medium">
																{(() => {
																	const fastestLapDriver = race.Results.find(
																		(r) => r.FastestLap?.rank === "1",
																	);
																	return fastestLapDriver
																		? `${fastestLapDriver.Driver.givenName} ${fastestLapDriver.Driver.familyName}`
																		: "N/A";
																})()}
															</p>
														</div>
														<div>
															<p className="text-xs text-gray-400">Time</p>
															<p className="font-medium">
																{(() => {
																	const fastestLapDriver = race.Results.find(
																		(r) => r.FastestLap?.rank === "1",
																	);
																	return (
																		fastestLapDriver?.FastestLap?.Time?.time ||
																		"N/A"
																	);
																})()}
															</p>
														</div>
														<div>
															<p className="text-xs text-gray-400">Lap</p>
															<p className="font-medium">
																{(() => {
																	const fastestLapDriver = race.Results.find(
																		(r) => r.FastestLap?.rank === "1",
																	);
																	return (
																		fastestLapDriver?.FastestLap?.lap || "N/A"
																	);
																})()}
															</p>
														</div>
														<div>
															<p className="text-xs text-gray-400">Avg Speed</p>
															<p className="font-medium">
																{(() => {
																	const fastestLapDriver = race.Results.find(
																		(r) => r.FastestLap?.rank === "1",
																	);
																	return fastestLapDriver?.FastestLap
																		?.AverageSpeed
																		? `${fastestLapDriver.FastestLap.AverageSpeed.speed} ${fastestLapDriver.FastestLap.AverageSpeed.units}`
																		: "N/A";
																})()}
															</p>
														</div>
													</div>
												) : (
													<p className="text-sm text-gray-400">
														No fastest lap data available
													</p>
												)}
											</div>
										</div>
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

export default ResultsPage;
