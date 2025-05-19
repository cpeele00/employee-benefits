import type { TDependent, TEmployee, TEmployeeDependent } from '@/common/types';

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
