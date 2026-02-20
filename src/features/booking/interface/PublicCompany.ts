import { AvaliableTimeSlot } from "@/features/schedule/interface/AvailableTimeSlot";
import { FormDataService } from "@/features/services/interface/FormDataService";
import { FormDataUser } from "@/features/users/interface/FormDataUser";

export interface PublicCompany {
	avaliableTimeSlots: AvaliableTimeSlot[];
	services: FormDataService[];
	user: FormDataUser;
}
