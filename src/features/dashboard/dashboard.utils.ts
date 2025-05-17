import type { TDependent } from '../dependents/dependents.types';
import type { TEmployee } from '../employees/employees.types';
import type { TEmployeeDependent } from './dashboard.types';

export const mapEmployeesToDependents = (
	employees: TEmployee[],
	dependents: TDependent[]
) => {
	return employees.map((employee): TEmployeeDependent => {
		const employeeDependents: TEmployeeDependent = {
			employee,
			dependents: dependents.filter(
				(dependent) => dependent.employeeId === employee.id
			),
		};
		return employeeDependents;
	});
};
