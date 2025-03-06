import { Link, useLocation, useSearchParams } from "react-router";
import LinkWithSearchParams from "~/Components/LinkWithSearchParams/LinkWithSearchParams";
import { Expanded } from "~/Components/SVGs/SVGs";
import { useEffect, useState } from "react";

const Header = () => {
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPath = location.pathname;

	const [timeZone, setTimeZone] = useState<string>();

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSearchParams({ year: e.target.value });
	};

	return (
		<header className="sticky top-0 z-50 bg-neutral-950 shadow-md border-b border-neutral-800">
			<div className=" mx-auto">
				<div className="flex flex-col md:flex-row py-3 items-center justify-between">
					<div className="flex items-center">
						<Link
							to={"/"}
							reloadDocument
							className="hover:opacity-90 transition-opacity"
						>
							<h2 className="text-2xl font-extrabold tracking-tight">
								<span className="text-red-600">F1</span>
								<span className="mx-1 text-gray-300">Helper</span>
								<span className="text-sm font-normal text-gray-400 hidden sm:inline-block">
									| Schedule and stats
								</span>
							</h2>
						</Link>
					</div>

					{/* Navigation and season selector */}
					<div className="flex flex-col sm:flex-row items-center gap-6 mt-3 md:mt-0">
						{/* Nav links */}
						<nav className="flex gap-6">
							<LinkWithSearchParams to={"/"}>
								<p
									className={`font-medium transition-colors ${
										currentPath === "/"
											? "text-white border-b-2 border-red-600"
											: "text-gray-400 hover:text-white"
									}`}
								>
									Home
								</p>
							</LinkWithSearchParams>

							<LinkWithSearchParams to={"/standings"}>
								<p
									className={`font-medium transition-colors ${
										currentPath === "/standings"
											? "text-white border-b-2 border-red-600"
											: "text-gray-400 hover:text-white"
									}`}
								>
									Standings
								</p>
							</LinkWithSearchParams>

							<LinkWithSearchParams to={"/results"}>
								<p
									className={`font-medium transition-colors ${
										currentPath === "/results"
											? "text-white border-b-2 border-red-600"
											: "text-gray-400 hover:text-white"
									}`}
								>
									Results
								</p>
							</LinkWithSearchParams>
						</nav>

						{/* Season selector */}
						<div className="flex items-center gap-2 bg-neutral-800 px-3 py-1 rounded">
							<label htmlFor="seasonSelector" className="text-sm text-gray-400">
								Season:
							</label>
							<div className="relative">
								<select
									aria-label="Select season"
									id="seasonSelector"
									className="appearance-none bg-transparent text-white pr-6 cursor-pointer"
									value={searchParams.get("year") || "2025"}
									onChange={handleYearChange}
								>
									<option className="bg-neutral-800" value="2025">
										2025
									</option>
									<option className="bg-neutral-800" value="2024">
										2024
									</option>
									<option className="bg-neutral-800" value="2023">
										2023
									</option>
									<option className="bg-neutral-800" value="2022">
										2022
									</option>
								</select>
								<div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
									<Expanded />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
