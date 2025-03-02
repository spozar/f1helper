import { fetchRaceList } from "~/utils/fetchers/raceList";
import { HomePage } from "../Pages/HomePage/HomePage";
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);

	const year =
		url.searchParams.get("year") || new Date().getFullYear().toString();

	const raceList = await fetchRaceList(year);

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
				{(raceList) => <HomePage raceList={raceList} />}
			</Await>
		</Suspense>
	);
}
