import { benefitsService } from '@/common/services/benefits.service';
import type { TDependent, TEmployee } from '@/common/types';
import type { TEmployeeDependentWithCosts } from './dashboard.types';

export const mapEmployeesToDependents = (
	employees: TEmployee[],
	dependents: TDependent[]
) => {
	return employees.map((employee): TEmployeeDependentWithCosts => {
		const employeeDependents: TEmployeeDependentWithCosts = {
			employee,
			dependents: dependents.filter(
				(dependent) => dependent.employeeId === employee.id
			),
			annualCost: 0,
			perPaycheck: 0,
		};

		const { totalAnnualCost, perPaycheckAmount } =
			benefitsService.calculateEmployeeBenefitsCost({
				employee,
				dependents: employeeDependents.dependents,
			});

		employeeDependents.annualCost = totalAnnualCost;
		employeeDependents.perPaycheck = perPaycheckAmount;

		return employeeDependents;
	});
};
