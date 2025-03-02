const RaceListSkeleton = () => {
	const skeletonItems = Array.from({ length: 10 }, (_, index) => index);

	return (
		<div className="mx-auto py-4">
			<div className="bg-neutral-800 rounded-lg shadow-lg animate-pulse">
				{skeletonItems.map((item, index) => (
					<div
						key={item}
						className={`border-b border-neutral-700 ${index === skeletonItems.length - 1 && "border-b-0"}`}
					>
						<div
							className={`w-full transition-colors ${
								index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800"
							}`}
						>
							<div className="flex items-center p-3 md:p-4">
								{/* Flag placeholder */}
								<div className="flex-shrink-0 w-8 h-6 mr-3 flex items-center justify-center">
									<div className="bg-gray-600 rounded w-6 h-4" />
								</div>

								{/* Race name and circuit */}
								<div className="flex-grow">
									<div className="h-4 bg-gray-600 rounded w-40 mb-2" />
									<div className="h-3 bg-gray-700 rounded w-56 hidden md:block" />
								</div>

								{/* Date/time and expand icon */}
								<div className="flex items-center space-x-3">
									<div className="h-4 bg-gray-600 rounded w-16 md:w-24" />
									<div className="h-4 w-4 bg-gray-600 rounded-full" />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RaceListSkeleton;
