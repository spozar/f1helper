import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import type { Route } from "./+types/root";

import "./app.css";
import Header from "./Modules/Header/Header";
import Footer from "./Modules/Footer/Footer";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap",
	},
];

const schemaMarkup = {
	"@context": "https://schema.org",
	"@type": "SportsOrganization",
	name: "F1 Helper",
	url: "https://f1helper.com",
	logo: "https://f1helper.com/logo.png",
	sameAs: [
		"https://github.com/spozar",
		"https://www.linkedin.com/in/sandro-pozar/",
	],
	potentialAction: {
		"@type": "ViewAction",
		target: "https://f1helper.com/standings",
	},
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(schemaMarkup),
					}}
				/>

				<script
					data-name="BMC-Widget"
					data-cfasync="false"
					src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
					data-id="spozar"
					data-description="Support F1 Calendar on Buy me a coffee!"
					data-message=""
					data-color="#d10f1e"
					data-position="Right"
					data-x_margin="18"
					data-y_margin="18"
					defer
				/>
				<Links />
			</head>
			<body className="w-screen overflow-x-hidden">
				{children}
				<ScrollRestoration />
				<Scripts />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<div className="container flex flex-col min-h-svh">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
