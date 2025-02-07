import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';
import { fetchRaceList } from '~/utils/fetchers/raceList';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'F1 Helper' },
		{
			name: 'description',
			content:
				'F1 Helper brings you schedule and stats for the F1 seasons',
		},
	];
}

export const loader = async ({
	params,
	request,
}: Route.LoaderArgs) => {
	const data = await fetchRaceList();

	return { data };
};

export default function Home({ loaderData }: Route.ComponentProps) {
	return <Welcome raceList={loaderData.data} />;
}
