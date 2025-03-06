import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("standings", "routes/standings.tsx"),
	route("results", "routes/results.tsx"),
	route("api/weather", "routes/api/api.weather.tsx"),
	route("drivers", "routes/drivers.tsx"),
	route("drivers/:driverId", "routes/driverResults.tsx"),
] satisfies RouteConfig;
