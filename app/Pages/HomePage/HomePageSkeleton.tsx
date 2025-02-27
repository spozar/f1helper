import { NotExpanded } from "~/Components/SVGs/SVGs";

const HomePageSkeleton = () => {
	// Create an array to simulate races; adjust the length as needed
	const skeletonArray = Array.from({ length: 10 });

	return (
		<div className="flex flex-col lg:w-[70%] mt-4">
			{skeletonArray.map((_, index) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					className={`${index % 2 === 0 ? "bg-neutral-900" : ""} flex gap-2`}
				>
					<div className="w-6 min-w-6 md:w-8 pt-2 md:pt-3 ml-2">
						<div className="h-5 w-8 rounded bg-gray-700 animate-pulse" />
					</div>

					<div className="flex flex-col w-full">
						<div className="flex w-full p-2 md:p-3">
							<div className="relative w-full flex items-center gap-2">
								<div className="h-5 w-24 md:w-36 rounded bg-gray-700 animate-pulse" />

								<div className="opacity-70">
									<NotExpanded />
								</div>
							</div>

							<div className="text-sm flex flex-wrap-reverse gap-2 md:gap-4 justify-end w-full">
								{Math.random() > 0.8 && (
									<div className="h-5 w-12 rounded bg-gray-700 animate-pulse" />
								)}

								<div className="h-5 w-20 md:w-24 rounded bg-gray-700 animate-pulse" />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default HomePageSkeleton;
