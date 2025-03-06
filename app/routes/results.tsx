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
	if (url.searchParams.get("year")) {
		year = url.searchParams.get("year") as string;
	} else if (currentDate > march18Current) {
		year = currentDate.getFullYear().toString();
	} else {
		year = "2024";
	}

	const results = resultsFetcher(year);

	return {
		results,
	};
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { results } = loaderData;

	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	if (isLoading) {
		return <HomePageSkeleton />;
	}

	return (
		<Suspense fallback={<HomePageSkeleton />}>
			<Await resolve={results}>
				{(results) => <ResultsPage results={results} />}
			</Await>
		</Suspense>
	);
}
