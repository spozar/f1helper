import { motion } from "motion/react";
import { Link } from "react-router";

import {
	constructorColors,
	driverInfo,
	countryFlags,
} from "~/utils/constants/constants";
import type { DriversApIResponse } from "~/utils/fetchers/drivers";
import { convertCounstrctorIdToName } from "~/utils/helpers/general";

interface DriversPageProps {
	drivers: DriversApIResponse[];
	year: string;
}

const DriversPage = ({ drivers, year }: DriversPageProps) => {
	const sortedDrivers = [...drivers].sort((a, b) => {
		const constructorA =
			driverInfo.find((d) => d.driverId === a.driverId)?.constructor || "";
		const constructorB =
			driverInfo.find((d) => d.driverId === b.driverId)?.constructor || "";
		return constructorA.localeCompare(constructorB);
	});

	const preparedDrivers = sortedDrivers.map((driver) => {
		const driverData = driverInfo.find((d) => d.driverId === driver.driverId);
		const constructorColor =
			constructorColors[driverData?.constructor || "Red Bull"];
		const flagUrl =
			countryFlags.find((flag) => flag.name === driver.nationality)?.flag || "";

		return {
			driver,
			driverData,
			constructorColor,
			flagUrl,
		};
	});

	return (
		<div className="mx-auto">
			<div className="flex flex-wrap gap-4">
				{preparedDrivers.map(
					({ driver, driverData, constructorColor, flagUrl }) => (
						<Link
							to={`/drivers/${driver.driverId}`}
							key={driver.driverId}
							className="block"
						>
							<motion.div
								className=" rounded-lg overflow-hidden bg-neutral-950  hover:shadow-lg transition-shadow duration-300"
								whileHover="hover"
								initial="initial"
							>
								<div className="relative">
									<div
										className="h-1"
										style={{ backgroundColor: constructorColor }}
									/>
									<motion.img
										alt={`${driver.givenName} ${driver.familyName}`}
										src={driverData?.imageUrl || "/defaultF1ProfileImage.avif"}
										className="object-contain h-48 origin-bottom"
										variants={{
											hover: {
												scale: 1.05,
												filter:
													"drop-shadow(8px -2px 3px rgba(255,255,255,0.1))",
												zIndex: 100,
											},
											initial: {
												scale: 1,
												filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0.5))",
											},
										}}
									/>
									<div className="absolute p-2 z-50 bottom-0 left-0 w-full bg-neutral-900/80">
										<h4 className="font-bold">
											{driver.givenName} <span>{driver.familyName}</span>
										</h4>
										<div className="flex justify-between items-center mt-0">
											<span className="text-sm">
												{convertCounstrctorIdToName(driverData?.constructor) ||
													"Unknown Team"}
											</span>
											<img
												src={flagUrl}
												alt={`${driver.nationality} flag`}
												className="h-5 rounded"
											/>
										</div>
									</div>
								</div>
							</motion.div>
						</Link>
					),
				)}
			</div>
		</div>
	);
};

export default DriversPage;
