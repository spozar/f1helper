import { useState, useEffect } from "react";
import { parseISO } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";

export const formatDateTime = (utcString?: string) => {
	const [timeZone, setTimeZone] = useState("");
	const [formatted, setFormatted] = useState({ date: "", time: "" });

	// Hydration-safe: run this effect only on the client
	useEffect(() => {
		setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
	}, []);

	useEffect(() => {
		if (!utcString || !timeZone) {
			// Either there's no valid date string or timeZone hasn't been resolved yet.
			setFormatted({ date: "", time: "" });
			return;
		}
		const date = parseISO(utcString);
		const zonedDate = toZonedTime(date, timeZone);
		setFormatted({
			date: format(zonedDate, "d MMM"),
			time: format(zonedDate, "HH:mm"),
		});
	}, [utcString, timeZone]);

	return formatted;
};
