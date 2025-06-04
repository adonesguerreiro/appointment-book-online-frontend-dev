export const formatMinutesInHours = (time: string) => {
	const [hours, minutes] = time.split(":").map(Number);

	if (hours && minutes) return `${hours}h ${minutes}min`;
	if (hours) return `${hours}h`;
	return `${minutes}min`;
};
