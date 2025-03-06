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

export function meta() {
	return [
		{ title: "Results | F1 Helper" },
		{
			name: "description",
			content:
				"Race results for the F1 season - Drivers, constructors and fastest LAP",
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
