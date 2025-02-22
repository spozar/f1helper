import type { Route } from "./+types/standings";
import {
	fetchConstructorStandings,
	fetchDriverStandings,
} from "~/utils/fetchers/standings";
import StandingsPage from "~/Pages/Standings/StandingsPage";

export function headers(_: Route.HeadersArgs) {
	return {
		"Content-Type": "application/json",
		"Cache-Control": "public, max-age=3600, s-maxage=3600",
	};
}

export function meta() {
	return [
		{ title: "Standings | F1 Helper" },
		{
			name: "description",
			content: "Standings for drivers and constructors in the F1 season",
		},
	];
}

export const loader = async () => {
	const driverStandings = await fetchDriverStandings("2024");

	const constructorStandings = await fetchConstructorStandings("2024");

	return {
		driverStandings,
		constructorStandings,
	};
};

export default function Home({ loaderData }: Route.ComponentProps) {
	const { driverStandings, constructorStandings } = loaderData;

	return (
		<StandingsPage
			driverStandings={driverStandings}
			constructorStandings={constructorStandings}
		/>
	);
}
