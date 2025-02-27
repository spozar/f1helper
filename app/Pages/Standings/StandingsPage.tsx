import { motion } from "motion/react";

import type {
	ConstructorStandingsTable,
	DriverStandingsTable,
} from "~/utils/fetchers/standings";

interface StandingsProps {
	driverStandings: DriverStandingsTable | null;
	constructorStandings: ConstructorStandingsTable | null;
}

const StandingsPage = ({
	driverStandings,
	constructorStandings,
}: StandingsProps) => {
	if (!driverStandings && !constructorStandings) {
		return <p>Something went wrong while fetching standings</p>;
	}

	const highestPoints =
		driverStandings?.StandingsLists[0]?.DriverStandings[0]?.points || "0";

	const driverStandingsList =
		driverStandings?.StandingsLists[0]?.DriverStandings;

	const percentageDifference = (points: string) => {
		const percentage =
			(Number.parseInt(points) / Number.parseInt(highestPoints)) * 100;

		return percentage;
	};

	return (
		<>
			{driverStandings?.StandingsLists.length === 0 && (
				<p>
					No standings available for the selected season. Please select another
					season.
				</p>
			)}
			{driverStandingsList?.map((driver) => {
				return (
					<div key={driver.position} className="w-full md:w-[40%]">
						<div className="flex flex-wrap gap-2" key={driver.position}>
							<p>{driver.position}</p>
							<p>{driver.Driver.givenName}</p>
							<p>{driver.Driver.familyName}</p>
							<p>{driver.points}</p>
							<p>{driver.Constructors[0].name}</p>
						</div>
						<motion.div
							className="h-1 bg-yellow-300 w-0"
							animate={{
								width: `${percentageDifference(driver.points)}%`,
								transition: {
									duration: 2,
								},
							}}
						/>
					</div>
				);
			})}
		</>
	);
};

export default StandingsPage;
