import { differenceInDays, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

interface CountDownProps {
	date: string;
	time: string;
}

export function Countdown({ date, time }: CountDownProps) {
	const [timeRemaining, setTimeRemaining] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		setTimeRemaining(calculateTimeRemaining());

		const intervalId = setInterval(() => {
			setTimeRemaining(calculateTimeRemaining());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

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

	const { days = 0, hours = 0, minutes = 0, seconds = 0 } = timeRemaining;

	const formattedHours = String(hours).padStart(2, "0");
	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(seconds).padStart(2, "0");

	return (
		<div className="font-mono font-medium grid grid-cols-4 gap-4 justify-items-start">
			<div className="flex flex-col items-center flex-1">
				<p className="font-mono font-medium text-3xl">{days}</p>
				<p className="text-xs">days</p>
			</div>
			<div className="flex flex-col items-center flex-1">
				<p className="font-mono font-medium text-3xl">{formattedHours}</p>
				<p className="text-xs">hours</p>
			</div>
			<div className="flex flex-col items-center flex-1">
				<p className="font-mono font-medium text-3xl">{formattedMinutes}</p>
				<p className="text-xs">minutes</p>
			</div>
			<div className="flex flex-col items-center flex-1">
				<p className="font-mono font-medium text-3xl">{formattedSeconds}</p>
				<p className="text-xs">seconds</p>
			</div>
		</div>
	);
}
