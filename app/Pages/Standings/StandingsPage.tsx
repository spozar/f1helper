import { motion } from "motion/react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSearchParams } from "react-router";

import type {
	ConstructorStandingsTable,
	DriverStandingsTable,
} from "~/utils/fetchers/standings";

interface StandingsProps {
	driverStandings: DriverStandingsTable | null;
	constructorStandings: ConstructorStandingsTable | null;
}

type StandingsType = "drivers" | "constructors";

const StandingsPage = ({
	driverStandings,
	constructorStandings,
}: StandingsProps) => {
	const [selectedStandings, setSelectedStandings] =
		useState<StandingsType>("drivers");

	const [searchParams, setSearchParams] = useSearchParams();

	const currentSeason = searchParams.get("year") || new Date().getFullYear();

	if (!driverStandings && !constructorStandings) {
		return <p>Something went wrong while fetching standings</p>;
	}

	const highestPointsDriver =
		driverStandings?.StandingsLists[0]?.DriverStandings[0]?.points || "0";

	const highestPointsConstructor =
		constructorStandings?.StandingsLists[0]?.ConstructorStandings[0]?.points ||
		"0";

	const driverStandingsList =
		driverStandings?.StandingsLists[0]?.DriverStandings;

	const percentageDifference = (points: string, standings: StandingsType) => {
		const percentage =
			(Number.parseInt(points) /
				Number.parseInt(
					standings === "drivers"
						? highestPointsDriver
						: highestPointsConstructor,
				)) *
			100;

		return percentage;
	};

	const constructorColors: Record<string, string> = {
		Mercedes: "#00A19B",
		"Red Bull": "#0600EF",
		Ferrari: "#DC0000",
		McLaren: "#FF8700",
		"Aston Martin": "#006F62",
		"Alpine F1 Team": "#0090FF",
		Williams: "#005AFF",
		"RB F1 Team": "#00293F",
		AlphaTauri: "#00293F",
		"Kick Sauber": "#900000",
		"Alfa Romeo": "#900000",
		"Haas F1 Team": "#FFFFFF",
	};

	if (
		driverStandings?.StandingsLists.length === 0 &&
		constructorStandings?.StandingsLists.length === 0
	) {
		return (
			<div className="mt-8">
				<p>
					No standings available for the {currentSeason} season. Please select
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
		<div className="mt-16">
			<div className="mb-6">
				<div className="flex md:hidden bg-neutral-900 rounded-md overflow-hidden border border-zinc-800 shadow-inner relative">
					<motion.div
						className="absolute h-full bg-zinc-800 z-0"
						initial={{
							width: "50%",
							x: selectedStandings === "drivers" ? 0 : "100%",
						}}
						animate={{
							x: selectedStandings === "drivers" ? 0 : "100%",
						}}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						style={{ width: "50%" }}
					/>
					<button
						type="button"
						className="flex-1 py-2 px-4 transition-colors z-10 relative"
						onClick={() => setSelectedStandings("drivers")}
					>
						Drivers
					</button>
					<button
						type="button"
						className="flex-1 py-2 px-4 transition-colors z-10 relative"
						onClick={() => setSelectedStandings("constructors")}
					>
						Constructors
					</button>
				</div>
			</div>

			<div className="flex md:flex-row flex-col gap-x-24 gap-y-8 w-full">
				<div
					className={`flex-1 ${selectedStandings === "drivers" ? "order-1" : "order-2"}`}
				>
					<h2 className="text-xl font-bold mb-4">Driver Standings</h2>
					<div className="space-y-1 mb-8">
						{driverStandingsList?.map((driver) => {
							return (
								<div
									key={driver.position}
									className="w-full bg-neutral-900 rounded-md overflow-hidden border border-zinc-800 shadow-inner"
								>
									<div className="flex flex-wrap gap-1 p-1">
										<p className="font-bold">{driver.position}</p>
										<p>{driver.Driver.givenName}</p>
										<p className="font-semibold">{driver.Driver.familyName}</p>
										<p className="ml-auto text-sm opacity-70 self-center">
											{driver.Constructors[0].name}
										</p>
										<p className="font-bold">{driver.points}</p>
									</div>
									<motion.div
										className="h-1 w-0"
										style={{
											backgroundColor:
												constructorColors[driver.Constructors[0].name] ||
												"#CCCCCC",
										}}
										animate={{
											width: `${percentageDifference(driver.points, "drivers")}%`,
											transition: {
												duration: 2,
											},
										}}
									/>
								</div>
							);
						})}
					</div>
				</div>

				<div
					className={`flex-1 ${selectedStandings === "constructors" ? "order-1" : "order-2"}`}
				>
					<h2 className="text-xl font-bold mb-4">Constructor Standings</h2>
					<div className="space-y-1">
						{constructorStandings?.StandingsLists[0]?.ConstructorStandings?.map(
							// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
							(constructor) => {
								return (
									<div
										key={constructor.position}
										className="w-full bg-neutral-900 rounded-md overflow-hidden border border-zinc-800 shadow-inner"
									>
										<div className="flex flex-wrap gap-1 p-1">
											<p className="font-bold">{constructor.position}</p>
											<p className="font-semibold">
												{constructor.Constructor.name}
											</p>
											<p className="ml-auto font-bold">{constructor.points}</p>
										</div>
										<motion.div
											className="h-1 w-0"
											style={{
												backgroundColor:
													constructorColors[constructor.Constructor.name] ||
													"#CCCCCC",
											}}
											animate={{
												width: `${percentageDifference(constructor.points, "constructors")}%`,
												transition: {
													duration: 2,
												},
											}}
										/>
									</div>
								);
							},
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StandingsPage;
