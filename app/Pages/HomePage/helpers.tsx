import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useEffect, useState } from "react";

export const formatDateTime = (utcString: string) => {
	const [timeZone, setTimeZone] = useState<string>("");

	useEffect(() => {
		setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
	}, []);

	const date = parseISO(utcString);
	const zonedDate = toZonedTime(date, timeZone);

	const formattedDate = format(zonedDate, "d MMM");
	const formattedTime = format(zonedDate, "HH:mm");

	return { date: formattedDate, time: formattedTime };
};
