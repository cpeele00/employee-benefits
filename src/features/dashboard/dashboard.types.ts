import type { TEmployeeDependent } from '@/common/types';

export type TEmployeeDependentWithCosts = TEmployeeDependent & {
	annualCost: number;
	perPaycheck: number;
};
