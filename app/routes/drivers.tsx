import type { Route } from "./+types/drivers";

import type { LoaderFunctionArgs } from "react-router";
import DriversPage from "~/Pages/DriversPage/DriversPage";

import fetchDrivers from "~/utils/fetchers/drivers";

export function headers(_: Route.HeadersArgs) {
	return {
		"Content-Type": "application/json",
		"Cache-Control": "public, max-age=3600, s-maxage=3600",
	};
}

export const links: Route.LinksFunction = () => [
	{ rel: "canonical", href: "https://f1helper.com/drivers" },
];

export function meta() {
	return [
		{ title: "Formula 1 Drivers | F1 Helper" },
		{
			name: "description",
			content:
				"Race results for the F1 season - Drivers, constructors and fastest LAP",
		},
	];
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const { driverId } = params;

	const url = new URL(request.url);

	const year =
		url.searchParams.get("year") || new Date().getFullYear().toString();
	const drivers = await fetchDrivers(year);

	return {
		drivers,
		driverId,
		year,
	};
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { drivers, year } = loaderData;

	return (
		<>
			<h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8">
				F1 Drivers {year}
			</h2>
			<DriversPage drivers={drivers} year={year} />
		</>
	);
}
