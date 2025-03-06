import type { Route } from "./+types/standings";
import {
	fetchConstructorStandings,
	fetchDriverStandings,
} from "~/utils/fetchers/standings";
import StandingsPage from "~/Pages/Standings/StandingsPage";
import { Await, type LoaderFunctionArgs, type MetaArgs } from "react-router";
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

export function meta({ data }: Route.MetaArgs) {
	const year = data?.year || new Date().getFullYear();

	return [
		{ title: `${year} F1 Driver and Constructor Standings | F1 Helper` },
		{
			name: "description",
			content: `Complete Formula 1 ${year} season standings for drivers and constructors. Track championship points, race positions, and team performances throughout the F1 season.`,
		},

		{
			property: "og:title",
			content: `${year} F1 Standings | Drivers & Constructors`,
		},
		{
			property: "og:description",
			content: `Complete Formula 1 ${year} season standings for drivers and constructors. Track championship points and performance.`,
		},
		{
			property: "og:image",
			content: "https://f1helper.com/og-image-standings.jpg",
		},
		{
			property: "og:url",
			content: `https://f1helper.com/standings?year=${year}`,
		},
		{ property: "og:type", content: "website" },

		{ name: "twitter:card", content: "summary_large_image" },

		{
			name: "keywords",
			content: `Formula 1, F1 Standings, ${year} F1, F1 Championship, F1 Points, Constructor Standings, Driver Championship`,
		},
	];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);

	const currentDate = new Date();
	const march18Current = new Date(currentDate.getFullYear(), 2, 18); // Month is 0-indexed, so 2 = March

	let showPreviousYear = false;

	let year = "";
	if (url.searchParams.get("year")) {
		year = url.searchParams.get("year") as string;
	} else if (currentDate > march18Current) {
		year = currentDate.getFullYear().toString();
	} else {
		year = "2024";
		showPreviousYear = true;
	}

	const driverStandings = fetchDriverStandings(year);
	const constructorStandings = fetchConstructorStandings(year);

	return {
		driverStandings,
		constructorStandings,
		showPreviousYear,
		year,
	};
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { driverStandings, constructorStandings, showPreviousYear } =
		loaderData;

	return (
		<Suspense fallback={<GiantLoader />}>
			<Await resolve={driverStandings}>
				{(resolvedDriverStandings) => (
					<Await resolve={constructorStandings}>
						{(resolvedConstructorStandings) => (
							<>
								{showPreviousYear && (
									<div className="w-full p-4 mb-6 bg-gray-800 border-l-4 border-amber-500 rounded-md shadow-sm mt-2">
										<h3 className="text-xl font-medium text-amber-300">
											<span className="mr-2">⚠️</span>
											Displaying previous season's standings
										</h3>
										<p className="mt-1 text-amber-200">
											The current Formula 1 season has not officially begun yet.
											Data shown is from the previous season.
										</p>
									</div>
								)}
								<StandingsPage
									driverStandings={resolvedDriverStandings}
									constructorStandings={resolvedConstructorStandings}
								/>
							</>
						)}
					</Await>
				)}
			</Await>
		</Suspense>
	);
}
