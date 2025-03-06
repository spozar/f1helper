import HomePageSkeleton from "~/Pages/HomePage/HomePageSkeleton";
import type { Route } from "./+types/results";

import { Await, useNavigation, type LoaderFunctionArgs } from "react-router";
import ResultsPage from "~/Pages/Results/ResultsPage";
import resultsFetcher from "~/utils/fetchers/results";
import { Suspense } from "react";

export function headers(_: Route.HeadersArgs) {
	return {
		"Content-Type": "application/json",
		"Cache-Control": "public, max-age=3600, s-maxage=3600",
	};
}

export const links: Route.LinksFunction = () => [
	{ rel: "canonical", href: "https://f1helper.com/results" },
];

export function meta({ data }: Route.MetaArgs) {
	const year = data?.year || new Date().getFullYear().toString();
	const showPreviousYear = data?.showPreviousYear;
	const displayYear = showPreviousYear ? "2024" : year;

	return [
		{ title: `${displayYear} Formula 1 Race Results | F1 Helper` },
		{
			name: "description",
			content: `Complete ${displayYear} Formula 1 race results including qualifying, race positions, fastest laps, and points for every Grand Prix of the F1 season.`,
		},
		// Open Graph tags
		{
			property: "og:title",
			content: `${displayYear} F1 Race Results | Grand Prix Outcomes`,
		},
		{
			property: "og:description",
			content: `Complete ${displayYear} Formula 1 race results for all Grand Prix events. View positions, lap times, and race outcomes for each F1 event.`,
		},
		{
			property: "og:image",
			content: "https://f1helper.com/og-image-results.jpg",
		},
		{
			property: "og:url",
			content: `https://f1helper.com/results?year=${displayYear}`,
		},
		{ property: "og:type", content: "website" },
		// Twitter Card tags
		{ name: "twitter:card", content: "summary_large_image" },
		{
			name: "twitter:title",
			content: `${displayYear} Formula 1 Race Results | F1 Helper`,
		},
		{
			name: "twitter:description",
			content: `Complete ${displayYear} Formula 1 race results for all Grand Prix events.`,
		},
		{
			name: "twitter:image",
			content: "https://f1helper.com/og-image-results.jpg",
		},
		// Keywords
		{
			name: "keywords",
			content: `F1 Results, Formula 1 Results, ${displayYear} F1, Grand Prix Results, F1 Race Outcomes, F1 Qualifying Results, F1 Fastest Lap`,
		},
	];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);

	const currentDate = new Date();
	const march18Current = new Date(currentDate.getFullYear(), 2, 18); // Month is 0-indexed, so 2 = March

	let year = "";

	let showPreviousYear = false;

	if (url.searchParams.get("year")) {
		year = url.searchParams.get("year") as string;
	} else if (currentDate > march18Current) {
		year = currentDate.getFullYear().toString();
	} else {
		showPreviousYear = true;
		year = "2024";
	}

	const results = resultsFetcher(year);

	return {
		results,
		showPreviousYear,
		year,
	};
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { results, showPreviousYear } = loaderData;

	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	if (isLoading) {
		return <HomePageSkeleton />;
	}

	return (
		<Suspense fallback={<HomePageSkeleton />}>
			<Await resolve={results}>
				{(results) => (
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
						<ResultsPage results={results} />
					</>
				)}
			</Await>
		</Suspense>
	);
}
