import { fetchRaceList } from "~/utils/fetchers/raceList";
import { HomePage } from "../Pages/HomePage/HomePage";
import type { Route } from "./+types/home";

export function headers(_: Route.HeadersArgs) {
	return {
		"Content-Type": "application/json",
		"Cache-Control": "public, max-age=3600, s-maxage=3600",
	};
}

export const loader = async () => {
	const raceList = await fetchRaceList("2025");

	return {
		raceList,
	};
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { raceList } = loaderData;

	return <HomePage raceList={raceList} />;
}
