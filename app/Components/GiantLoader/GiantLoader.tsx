interface GiantLoaderProps {
	text?: string;
	className?: string;
}

const GiantLoader = ({
	text = "Loading...",
	className = "",
}: GiantLoaderProps) => {
	return (
		<div
			className={`flex absolute top-[30%] left-0 items-center justify-center w-full ${className}`}
		>
			<div className="text-center">
				<div className="relative">
					<div className="w-32 h-32 border-t-4 border-b-4 border-primary rounded-full animate-spin" />

					<div className="absolute top-2 left-2 w-28 h-28 border-r-4 border-l-4 border-secondary rounded-full animate-spin-reverse" />
				</div>

				<div className="mt-4 text-xl font-bold">{text}</div>
			</div>
		</div>
	);
};

export default GiantLoader;
