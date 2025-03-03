import HomePageSkeleton from "~/Pages/HomePage/HomePageSkeleton";
import type { Route } from "./+types/results";

import { useNavigation, type LoaderFunctionArgs } from "react-router";
import ResultsPage from "~/Pages/Results/ResultsPage";
import resultsFetcher from "~/utils/fetchers/results";

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

	const year =
		url.searchParams.get("year") || new Date().getFullYear().toString();

	const results = await resultsFetcher(year);

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

	return <ResultsPage results={results} />;
}
