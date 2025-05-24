export interface FormDataSchedule {
	id?: number;
	customerId?: string;
	customerName?: string;
	customerPhone?: string;
	serviceId: string;
	serviceName?: string;
	status?: string;
	date: string | Date;
	timeSlotAvaliable: string;
	avaliableTimeSlot?: string[];
}
