import { fetchRaceList } from "~/utils/fetchers/raceList";
import { HomePage } from "../homePage/HomePage";
import type { Route } from "./+types/home";

export const loader = async () => {
	const raceList = await fetchRaceList();
	return new Response(JSON.stringify({ raceList }), {
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=3600, s-maxage=3600",
		},
	});
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { raceList } = loaderData;

	return <HomePage raceList={raceList} />;
}
