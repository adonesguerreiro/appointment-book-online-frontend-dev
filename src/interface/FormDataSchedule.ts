export interface FormDataSchedule {
	id?: number;
	customerId: string;
	customerName?: string;
	serviceId: string;
	serviceName?: string;
	status: string;
	date: string;
	timeSlotAvailable: string;
	availableTimeSlot?: string[];
}
