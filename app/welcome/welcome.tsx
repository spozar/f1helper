import type { RaceTable } from '~/utils/fetchers/raceList';
import { formatDateInUserTimezone } from './helpers';

interface WelcomeProps {
	raceList: RaceTable | null;
}

export const Welcome = ({ raceList }: WelcomeProps) => {
	return (
		<div className="container">
			<div className="flex flex-col gap-4">
				{raceList?.Races.map((race) => {
					return (
						<div>
							<h3 className="text-3xl">{race.raceName}</h3>
							<ul>
								<li>First practice: {race.FirstPractice.date}</li>
								{race.SecondPractice && (
									<li>
										Second practice: {race.SecondPractice.date} -{' '}
										{formatDateInUserTimezone(
											race.SecondPractice.date,
											race.SecondPractice.time
										)}
									</li>
								)}
								{race.ThirdPractice && (
									<li>Third practice: {race.ThirdPractice.date}</li>
								)}
								{race.SprintQualifying?.date && (
									<li>
										Sprint qualifying: {race.SprintQualifying.date}
									</li>
								)}
								{race.Sprint?.date && (
									<li>Sprint: {race.Sprint.date}</li>
								)}
								{race.Qualifying?.date && (
									<li>Qualifying: {race.Qualifying.date}</li>
								)}
								{race.date && (
									<li>
										<p className="font-semibold">
											Grand Prix: {race.date}
										</p>
									</li>
								)}
							</ul>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Welcome;
