import { fetchRaceList } from "~/utils/fetchers/raceList";
import type { Route } from "./+types/home";
import { Await, useNavigation, type LoaderFunctionArgs } from "react-router";
import { Suspense } from "react";
import HomePageSkeleton from "~/Pages/HomePage/HomePageSkeleton";
import HomePage2 from "~/Pages/HomePage/HomePage2";

export function headers(_: Route.HeadersArgs) {
	return {
		"Content-Type": "application/json",
		"Cache-Control": "public, max-age=3600, s-maxage=3600",
	};
}

export function meta() {
	const url = new URL(
		typeof window !== "undefined"
			? window.location.href
			: "https://f1helper.com",
	);
	const year =
		url.searchParams.get("year") || new Date().getFullYear().toString();

	return [
		{ title: `Formula 1 Schedule ${year} | F1 Helper | Complete F1 Calendar` },
		{
			name: "description",
			content: `Get the latest Formula 1 race schedules, live timing, standings, and results for the ${year} F1 season. Track every Grand Prix race and follow your favorite drivers and teams.`,
		},
		// Open Graph tags
		{
			property: "og:title",
			content: `Formula 1 ${year} Schedule and Calendar | F1 Helper`,
		},
		{
			property: "og:description",
			content: `Complete ${year} F1 racing calendar, live timing, standings and results for the Formula 1 season. Track all Grand Prix races and championship battles.`,
		},
		{
			property: "og:image",
			content: "https://f1helper.com/og-image-home.jpg",
		},
		{
			property: "og:url",
			content: `https://f1helper.com${url.search}`,
		},
		{
			property: "og:type",
			content: "website",
		},
		// Twitter Card tags
		{
			name: "twitter:card",
			content: "summary_large_image",
		},
		{
			name: "twitter:title",
			content: `Formula 1 ${year} Schedule | F1 Helper`,
		},
		{
			name: "twitter:description",
			content: `Complete ${year} F1 racing calendar with dates, times, circuits, and countdown to the next race. Follow the entire Formula 1 season.`,
		},
		{
			name: "twitter:image",
			content: "https://f1helper.com/og-image-home.jpg",
		},
		// Keywords with year-specific terms
		{
			name: "keywords",
			content: `F1, Formula 1, ${year} F1 Schedule, ${year} F1 Calendar, Grand Prix, F1 Standings, F1 Results, F1 Timing, Formula 1 ${year}, F1 Race Dates, F1 Season`,
		},
	];
}

export const links: Route.LinksFunction = () => [
	{ rel: "canonical", href: "https://f1helper.com" },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);

	const year =
		url.searchParams.get("year") || new Date().getFullYear().toString();

	const raceList = fetchRaceList(year);

	return {
		raceList,
	};
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { raceList } = loaderData;

	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	if (isLoading) {
		return <HomePageSkeleton />;
	}

	return (
		<Suspense fallback={<HomePageSkeleton />}>
			<Await resolve={raceList}>
				{(raceList) => <HomePage2 raceList={raceList} />}
			</Await>
		</Suspense>
	);
}
