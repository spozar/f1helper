import type { Route } from "./+types/drivers";

import type { LoaderFunctionArgs } from "react-router";

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
		{ title: "Drivers | F1 Helper" },
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

	const currentDate = new Date();
	const march18Current = new Date(currentDate.getFullYear(), 2, 18); //First race of the season (2025)

	let year = "";
	if (url.searchParams.get("year")) {
		year = url.searchParams.get("year") as string;
	} else if (currentDate > march18Current) {
		year = currentDate.getFullYear().toString();
	} else {
		year = "2024";
	}

	const drivers = await fetchDrivers(year);

	return {
		drivers,
		driverId,
	};
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { drivers } = loaderData;

	return <></>;
}
