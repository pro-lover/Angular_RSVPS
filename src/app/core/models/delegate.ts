
export class Delegate {
	id!: string;
	designation!: string;
	firstName!: string;
	lastName!: string;
	passportNumber!: string;
	email!: string;
	mobileno!: string;
    medicalcondition?: string;
    allergies?: string;
    additionalDiet!: string;
    shoesize!: string;
	otherOffice!: string;
	emergencies!: any;
    visaRequired!: boolean;
    rsvp!: boolean;
	created!: Date;
	updated!: Date;
	deletedAt!: Date | null;
	version!: number;
	status!: boolean;
	lastEditedBy!: number;
	history!: any[];
	diet!: any;
	dietId!: number;
	office!: any;
	officeId!: number;
	travels!: any;
	country!: any;
	countryId!: number;
	shirtsize!: any;
	shirtsizeId!: number;
	//
	get fullname() {
		return `${this.firstName} ${this.lastName}`;
	}
}
