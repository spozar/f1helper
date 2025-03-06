import type { Route } from "./+types/standings";
import {
	fetchConstructorStandings,
	fetchDriverStandings,
} from "~/utils/fetchers/standings";
import StandingsPage from "~/Pages/Standings/StandingsPage";
import { Await, type LoaderFunctionArgs } from "react-router";
import { Suspense } from "react";
import GiantLoader from "~/Components/GiantLoader/GiantLoader";

export function headers(_: Route.HeadersArgs) {
	return {
		"Content-Type": "application/json",
		"Cache-Control": "public, max-age=3600, s-maxage=3600",
	};
}

export const links: Route.LinksFunction = () => [
	{ rel: "canonical", href: "https://f1helper.com/standings" },
];

export function meta() {
	return [
		{ title: "Standings | F1 Helper" },
		{
			name: "description",
			content: "Standings for drivers and constructors in the F1 season",
		},
	];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);

	const currentDate = new Date();
	const march18Current = new Date(currentDate.getFullYear(), 2, 18); // Month is 0-indexed, so 2 = March

	let year = "";
	if (url.searchParams.get("year")) {
		year = url.searchParams.get("year") as string;
	} else if (currentDate > march18Current) {
		year = currentDate.getFullYear().toString();
	} else {
		year = "2024";
	}

	const driverStandings = fetchDriverStandings(year);
	const constructorStandings = fetchConstructorStandings(year);

	return {
		driverStandings,
		constructorStandings,
	};
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { driverStandings, constructorStandings } = loaderData;

	return (
		<Suspense fallback={<GiantLoader />}>
			<Await resolve={driverStandings}>
				{(resolvedDriverStandings) => (
					<Await resolve={constructorStandings}>
						{(resolvedConstructorStandings) => (
							<StandingsPage
								driverStandings={resolvedDriverStandings}
								constructorStandings={resolvedConstructorStandings}
							/>
						)}
					</Await>
				)}
			</Await>
		</Suspense>
	);
}
