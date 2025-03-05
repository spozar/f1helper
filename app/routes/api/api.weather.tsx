import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/api.weather";

export function headers(_: Route.HeadersArgs) {
	return {
		"Content-Type": "application/json",
		"Cache-Control": "public, max-age=86400, s-maxage=86400",
	};
}

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const lat = url.searchParams.get("lat");
	const lon = url.searchParams.get("lon");

	if (!lat || !lon) {
		return { error: "Missing latitude or longitude", status: 400 };
	}

	try {
		const response = await fetch(
			`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
			{
				headers: {
					"User-Agent": "F1Helper/1.0 (sandrodanpozar@gmail.com)",
				},
			},
		);

		if (!response.ok) {
			throw new Error(`Weather API responded with ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Weather fetch error:", error);
		return { error: "Failed to fetch weather data", status: 500 };
	}
}
