import { fetchRaceList } from "~/utils/fetchers/raceList";
import { HomePage } from "../homePage/HomePage";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "F1 Helper" },
		{
			name: "description",
			content: "F1 Helper brings you schedule and stats for the F1 seasons",
		},
	];
}

export const loader = async () => {
	const raceList = await fetchRaceList();

	return { raceList };
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { raceList } = loaderData;

	return <HomePage raceList={raceList} />;
}
