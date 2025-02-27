import { Link, useLocation } from "react-router";

const Header = () => {
	const location = useLocation();

	const currentPath = location.pathname;

	return (
		<div className="flex flex-col md:flex-row py-4 border-b gap-y-2 sticky top-0 bg-neutral-950 justify-between md:items-end z-50">
			<div>
				<Link to={"/"} reloadDocument>
					<h2 className="text-2xl font-extrabold">
						<span className="text-red-700">F</span>
						<span>1 Helper |</span>
						<span className="text-xl"> Schedule and stats</span>
					</h2>
				</Link>
			</div>
			<div className="flex gap-4">
				<Link to={"/"}>
					<p
						className={`font-semibold ${currentPath === "/" && "border-b border-b-white"}`}
					>
						Home
					</p>
				</Link>

				<Link to={"/standings"}>
					<p
						className={`font-semibold ${currentPath === "/standings" && "border-b border-b-white"}`}
					>
						Standings
					</p>
				</Link>
			</div>
		</div>
	);
};

export default Header;
