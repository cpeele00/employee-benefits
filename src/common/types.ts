export type TBenefitType = 'Medical' | 'Dental' | 'Vision' | 'Life';
export type TRelationShipType = 'Spouse' | 'Child';

export type TEmployee = {
	id?: string;
	firstName: string;
	lastName: string;
	benefits: TBenefitType[];
	dependents: TDependent[];
};

export type TDependent = {
	id?: string;
	employeeId?: string;
	firstName: string;
	lastName: string;
	relationship: TRelationShipType;
	benefits: TBenefitType[];
};

export type TEmployeeDependent = {
	employee: TEmployee;
	dependents?: TDependent[];
};
