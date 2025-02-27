import { differenceInDays, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

interface CountDownProps {
	date: string;
	time: string;
}

export const Countdown = ({ date, time }: CountDownProps) => {
	const [timeRemaining, setTimeRemaining] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		// Move the function here so that its dependencies (date and time)
		// are clearly tied to the effect itself.
		function calculateTimeRemaining() {
			const now = new Date();
			const futureTime = new Date(`${date}T${time}`);

			if (Number.isNaN(futureTime.getTime())) {
				console.error("Invalid date or time format");
				return { days: 0, hours: 0, minutes: 0, seconds: 0 };
			}

			if (futureTime <= now) {
				return { days: 0, hours: 0, minutes: 0, seconds: 0 };
			}

			const totalDays = differenceInDays(futureTime, now);
			const duration = intervalToDuration({
				start: now,
				end: futureTime,
			});

			return {
				days: totalDays,
				hours: duration.hours || 0,
				minutes: duration.minutes || 0,
				seconds: duration.seconds || 0,
			};
		}

		// Immediately update the state once with the calculation.
		setTimeRemaining(calculateTimeRemaining());

		const intervalId = setInterval(() => {
			setTimeRemaining(calculateTimeRemaining());
		}, 1000);

		return () => clearInterval(intervalId);
	}, [date, time]);

	const { days, hours, minutes, seconds } = timeRemaining;
	const formattedHours = String(hours).padStart(2, "0");
	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(seconds).padStart(2, "0");

	return (
		<div className="font-mono font-medium flex gap-4">
			<div className="flex flex-col">
				<p className="font-mono font-medium">{days}</p>
				<p className="text-xs">days</p>
			</div>
			<div className="flex flex-col">
				<p className="font-mono font-medium">{formattedHours}</p>
				<p className="text-xs">hours</p>
			</div>
			<div className="flex flex-col">
				<p className="font-mono font-medium">{formattedMinutes}</p>
				<p className="text-xs">min</p>
			</div>
			<div className="flex flex-col">
				<p className="font-mono font-medium">{formattedSeconds}</p>
				<p className="text-xs">sec</p>
			</div>
		</div>
	);
};
