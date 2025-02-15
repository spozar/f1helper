import { format, parseISO } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export const formatDateInUserTimezone = (
	dateString: string,
	timeString: string,
) => {
	try {
		const combinedString = `${dateString}T${timeString}`;

		const utcDate = parseISO(combinedString);

		if (Number.isNaN(utcDate.getTime())) {
			console.error("Invalid combined string:", combinedString);
			return "Invalid Date";
		}

		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		if (!timeZone) {
			console.warn(
				"Could not determine user timezone.  Using UTC as fallback.",
			);
			return format(utcDate, "yyyy-MM-dd HH:mm:ss UTC");
		}

		const zonedDate = toZonedTime(utcDate, timeZone);

		const formattedDate = formatInTimeZone(
			zonedDate,
			timeZone,
			"yyyy-MM-dd HH:mm:ss",
		);

		return formattedDate;
	} catch (error) {
		console.error("Error formatting date:", error);
		return "Error formatting date";
	}
};

export const formatDateTime = (utcString: string) => {
	const date = parseISO(utcString);
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const zonedDate = toZonedTime(date, timeZone);

	const formattedDate = format(zonedDate, "d MMM");
	const formattedTime = format(zonedDate, "HH:mm");

	return { date: formattedDate, time: formattedTime };
};
