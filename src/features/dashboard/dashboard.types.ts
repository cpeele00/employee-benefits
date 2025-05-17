import type { TDependent } from '../dependents/dependents.types';
import type { TEmployee } from '../employees/employees.types';

export type TEmployeeDependent = {
	employee: TEmployee;
	dependents: TDependent[];
};
