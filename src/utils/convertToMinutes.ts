export const convertToMinutes = (duration: string) => {
	const [hours, minutes] = duration.split(":").map(Number);
	return hours * 60 + minutes;
};
