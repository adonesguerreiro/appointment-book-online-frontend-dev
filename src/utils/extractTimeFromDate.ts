export const extractTimeFromDate = (dateTime: string) => {
	const timePart = dateTime.split("T")[1];
	const time = timePart.split(":").slice(0, 2).join(":");
	return time;
};
