import { Link, useLocation, useSearchParams } from "react-router";
import LinkWithSearchParams from "~/Components/LinkWithSearchParams/LinkWithSearchParams";
import { Expanded } from "~/Components/SVGs/SVGs";

const Header = () => {
	const location = useLocation();

	const [searchParams, setSearchParams] = useSearchParams();

	const currentPath = location.pathname;

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const year = e.target.value;
		setSearchParams({ year });
	};

	return (
		<div className="flex flex-col md:flex-row py-4 border-b whitespace-nowrap gap-4 gap-y-2 sticky top-0 bg-neutral-950 z-50">
			<div className="flex items-end gap-4">
				<Link to={"/"} reloadDocument>
					<h2 className="text-2xl font-extrabold">
						<span className="text-red-700">F</span>
						<span>1 Helper |</span>
						<span className="text-xl"> Schedule and stats</span>
					</h2>
				</Link>
			</div>
			<div className="flex justify-between w-full items-end">
				<div className="flex gap-2 md:order-1 order-2">
					<p>Select season</p>
					<div className="relative">
						<select
							className="appearance-none border-b border-white pr-4"
							value={searchParams.get("year") || "2025"}
							onChange={handleYearChange}
						>
							<option className="text-black text-base" value="2025">
								2025
							</option>
							<option className="text-black text-base" value="2024">
								2024
							</option>
							<option className="text-black text-base" value="2023">
								2023
							</option>
							<option className="text-black text-base" value="2022">
								2022
							</option>
						</select>
						<div className="absolute right-0 inset-y-0 items-center flex pointer-events-none">
							<Expanded />
						</div>
					</div>
				</div>
				<div className="flex gap-4 md:self-end md:order-2 order-1">
					<LinkWithSearchParams to={"/"}>
						<p
							className={`font-semibold ${currentPath === "/" && "border-b border-b-white"}`}
						>
							Home
						</p>
					</LinkWithSearchParams>

					<LinkWithSearchParams to={"/standings"}>
						<p
							className={`font-semibold ${currentPath === "/standings" ? "border-b border-b-white" : "opacity-75 hover:opacity-100"}`}
						>
							Standings
						</p>
					</LinkWithSearchParams>
				</div>
			</div>
		</div>
	);
};

export default Header;
