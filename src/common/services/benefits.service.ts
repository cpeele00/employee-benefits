import type { TDependent, TEmployee } from '../types';

const EMPLOYEE_COST = 1000; // $1000 per year flat rate per employee
const DEPENDENT_COST = 500; // $500 per year flat rate per dependent
const DISCOUNT_RATE = 0.1; // 10% discount
const PAYCHECKS_PER_YEAR = 26;

export const benefitsService = {
	calculateEmployeeBenefitsCost: (employee: TEmployee) => {
		let employeeCost = 0;
		let dependentsCost = 0;
		let discountAmount = 0;

		const employeeBaseCost = EMPLOYEE_COST;

		// Calculate employee discount
		const employeeDiscount = employee.firstName.toLocaleLowerCase().startsWith('a')
			? employeeBaseCost * DISCOUNT_RATE
			: 0;

		employeeCost = employeeBaseCost;
		discountAmount = employeeDiscount;

		// Calculate dependents cost
		employee.dependents.forEach((dependent: TDependent) => {
			const dependentBaseCost = DEPENDENT_COST;
			const dependentDiscount = dependent.firstName
				.toLocaleLowerCase()
				.startsWith('a')
				? dependentBaseCost * DISCOUNT_RATE
				: 0;

			dependentsCost += dependentBaseCost;
			discountAmount += dependentDiscount;
		});

		// Calculate total annual cost
		const totalAnnualCost = employeeCost + dependentsCost - discountAmount;

		// Calculate the per paycheck amount
		const perPaycheckAmount = totalAnnualCost / PAYCHECKS_PER_YEAR;

		return {
			employeeCost,
			dependentsCost,
			discountAmount,
			totalAnnualCost,
			perPaycheckAmount,
		};
	},
};
