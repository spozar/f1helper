import type { Race } from "~/utils/fetchers/raceList";

import { useEffect } from "react";
import { useFetcher } from "react-router";
import { FaQuestionCircle } from "react-icons/fa";

interface WeatherInfoProps {
	race: Race;
}

interface WeatherData {
	properties: {
		timeseries: Array<{
			data: {
				instant: {
					details: {
						air_temperature: number;
						// Add other properties as needed
					};
				};
				next_1_hours: {
					summary: {
						symbol_code: string;
					};
				};
				next_6_hours: {
					summary: {
						symbol_code: string;
					};
				};
			};
			time: string;
		}>;
	};
	error?: string;
}

const WeatherInfo = ({ race }: WeatherInfoProps) => {
	const weatherFetcher = useFetcher<WeatherData>();

	const lat = race.Circuit.Location.lat;
	const long = race.Circuit.Location.long;

	useEffect(() => {
		const isWithing7Days = () => {
			const raceDate = new Date(race.date);
			const currentDate = new Date();
			const tenDaysFromNow = new Date(
				currentDate.setDate(currentDate.getDate() + 18),
			);
			return raceDate < tenDaysFromNow;
		};
		if (
			weatherFetcher.state === "idle" &&
			!weatherFetcher.data &&
			isWithing7Days()
		) {
			weatherFetcher.load(`/api/weather?lat=${lat}&lon=${long}`);
		}
	}, [lat, long, weatherFetcher, race.date]);

	const isLoading = weatherFetcher.state === "loading";
	const weatherData = weatherFetcher.data;
	const hasError = weatherData?.error;

	const exactTimeSeries =
		weatherData?.properties?.timeseries?.find((timeSeries) => {
			return timeSeries.time === `${race.date}T${race.time}`;
		}) ||
		weatherData?.properties?.timeseries
			?.filter((timeSeries) => {
				const timeFromTimeseries = timeSeries.time.split("T")[1];
				return timeFromTimeseries === race.time;
			})
			.pop();

	const hasValidWeatherIcon =
		exactTimeSeries?.data.next_1_hours || exactTimeSeries?.data.next_6_hours;

	const getWeatherIcon = () => {
		const baseUrl = "https://api.met.no/images/weathericons/svg/";
		if (exactTimeSeries?.data.next_1_hours) {
			return `${baseUrl}${exactTimeSeries?.data.next_1_hours?.summary.symbol_code}.svg`;
		}
		if (exactTimeSeries?.data.next_6_hours) {
			return `${baseUrl}${exactTimeSeries?.data.next_6_hours?.summary.symbol_code}.svg`;
		}
		return "";
	};

	return (
		<div>
			{isLoading ? (
				<p>Loading weather data...</p>
			) : hasError ? (
				<p>Error loading weather data: {weatherData.error}</p>
			) : (
				<div className="flex flex-col h-full gap-2">
					<p className="text-sm pl-1">Forecast</p>
					<div className="flex justify-between items-center gap-2">
						{hasValidWeatherIcon ? (
							<img src={getWeatherIcon()} className="w-10" alt="Weather" />
						) : (
							<FaQuestionCircle size={20} />
						)}
						<p className="text-sm font-t">
							{exactTimeSeries?.data.instant.details.air_temperature || "--"}
							°C
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default WeatherInfo;
