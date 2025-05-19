import type { TDependent, TEmployee } from '@/common/types';

/**
 * Constants for benefits calculations
 */
const EMPLOYEE_COST = 1000; // $1000 per year flat rate per employee
const DEPENDENT_COST = 500; // $500 per year flat rate per dependent
const DISCOUNT_RATE = 0.1; // 10% discount for names starting with 'A'
const PAYCHECKS_PER_YEAR = 26; // Bi-weekly pay schedule
const BASE_SALARY_PER_PAYCHECK = 2000; // $2000 per paycheck before deductions
const ANNUAL_SALARY = BASE_SALARY_PER_PAYCHECK * PAYCHECKS_PER_YEAR; // $52,000 annual salary

/**
 * Interface for the result of benefits cost calculation
 */
export interface ICalculateEmployeeBenefitsCost {
	employeeCost: number; // Annual cost for the employee's benefits
	dependentsCost: number; // Annual cost for all dependents' benefits
	discountAmount: number; // Total discount amount (for names starting with 'A')
	totalAnnualCost: number; // Total annual cost after discounts
	perPaycheckAmount: number; // Amount deducted per paycheck
	baseSalaryPerPaycheck: number; // Base salary per paycheck before deductions
	annualSalary: number; // Annual salary before deductions
	netPayPerPaycheck: number; // Net pay per paycheck after benefit deductions
}

/**
 * Type definition for the benefits service
 */
export type TEmployeeBenefitsService = {
	/**
	 * Calculates the cost of benefits for an employee and their dependents
	 * @param employee - The employee object
	 * @param dependents - Array of the employee's dependents
	 * @returns Detailed breakdown of benefits costs and salary information
	 */
	calculateEmployeeBenefitsCost: ({
		employee,
		dependents,
	}: {
		employee: TEmployee | null;
		dependents: TDependent[] | undefined;
	}) => ICalculateEmployeeBenefitsCost;
};

/**
 * Service for calculating employee benefits costs
 */
export const benefitsService: TEmployeeBenefitsService = {
	calculateEmployeeBenefitsCost: ({
		employee,
		dependents = [],
	}): ICalculateEmployeeBenefitsCost => {
		// Return zeros if employee or dependents are missing
		if (!employee || !dependents) {
			return {
				employeeCost: 0,
				dependentsCost: 0,
				discountAmount: 0,
				totalAnnualCost: 0,
				perPaycheckAmount: 0,
				baseSalaryPerPaycheck: 0,
				annualSalary: 0,
				netPayPerPaycheck: 0,
			};
		}

		let employeeCost = 0;
		let dependentsCost = 0;
		let discountAmount = 0;

		// Base cost for the employee
		const employeeBaseCost = EMPLOYEE_COST;

		// Calculate employee discount (10% if name starts with 'A')
		const employeeDiscount = employee.firstName.toLocaleLowerCase().startsWith('a')
			? employeeBaseCost * DISCOUNT_RATE
			: 0;

		employeeCost = employeeBaseCost;
		discountAmount = employeeDiscount;

		// Calculate costs for each dependent
		dependents.forEach((dependent: TDependent) => {
			const dependentBaseCost = DEPENDENT_COST;

			// Calculate dependent discount (10% if name starts with 'A')
			const dependentDiscount = dependent.firstName
				.toLocaleLowerCase()
				.startsWith('a')
				? dependentBaseCost * DISCOUNT_RATE
				: 0;

			dependentsCost += dependentBaseCost;
			discountAmount += dependentDiscount;
		});

		// Calculate total annual cost after discounts
		const totalAnnualCost = employeeCost + dependentsCost - discountAmount;

		// Calculate the per paycheck deduction amount
		const perPaycheckAmount = totalAnnualCost / PAYCHECKS_PER_YEAR;

		// Return the complete benefits cost breakdown
		return {
			baseSalaryPerPaycheck: BASE_SALARY_PER_PAYCHECK,
			annualSalary: ANNUAL_SALARY,
			employeeCost,
			dependentsCost,
			discountAmount,
			totalAnnualCost,
			perPaycheckAmount,
			netPayPerPaycheck: BASE_SALARY_PER_PAYCHECK - perPaycheckAmount,
		};
	},
};
