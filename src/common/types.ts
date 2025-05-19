export type TBenefitType = 'medical' | 'dental' | 'vision' | 'life';
export type TRelationShipType = 'spouse' | 'child';

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
