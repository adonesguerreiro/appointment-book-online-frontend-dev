export const formatDate = (date: string) => {
	const [datePart, timePart] = date.split("T");

	const [year, month, day] = datePart.split("-");
	const formattedDate = `${day}/${month}/${year}`;

	const [hours, minutes] = timePart.split(":");
	const formattedTime = `${hours}:${minutes}`;

	return `${formattedDate} às ${formattedTime}`;
};
