export const minutesToTime = (minutes: number) => {
	const h = String(Math.floor(minutes / 60)).padStart(2, "0");
	const m = String(minutes % 60).padStart(2, "0");
	return `${h}${m}`;
};
