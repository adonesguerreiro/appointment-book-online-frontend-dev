export const formatMinutesInHours = (minutes: number) => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;

	if (hours && mins) return `${hours}h ${mins}min`;
	if (hours) return `${hours}h`;
	return `${mins}min`;
};
