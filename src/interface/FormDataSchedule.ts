export interface FormDataSchedule {
	id?: number;
	customerId: string;
	serviceId: string;
	status: string;
	date: string;
	timeSlotAvaliable: string;
	avaliableTimeSlot?: string[];
}
