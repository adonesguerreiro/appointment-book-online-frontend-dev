export interface FormDataSchedule {
  id?: number;
  customerId: string;
  serviceId: string;
  date: string;
  timeSlotAvaliable: string;
  avaliableTimeSlot?: string[];
  status: string;
}
