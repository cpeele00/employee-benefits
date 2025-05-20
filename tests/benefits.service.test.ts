import { benefitsService } from '@/common/services/benefits.service';
import { describe, it, expect } from 'vitest';

describe('benefitsService', () => {
	describe('GIVEN an employee benefits calculation', () => {
		describe('WHEN employee or dependents are missing', () => {
			it('THEN should return zeros for all cost values', () => {
				const result = benefitsService.calculateEmployeeBenefitsCost({
					employee: null,
					dependents: undefined,
				});

				expect(result).toEqual({
					employeeCost: 0,
					dependentsCost: 0,
					discountAmount: 0,
					totalAnnualCost: 0,
					perPaycheckAmount: 0,
					baseSalaryPerPaycheck: 0,
					annualSalary: 0,
					netPayPerPaycheck: 0,
				});
			});
		});

		describe('WHEN employee has no dependents', () => {
			it('THEN should return correct cost values', () => {
				const result = benefitsService.calculateEmployeeBenefitsCost({
					employee: {
						id: '1',
						firstName: 'John',
						lastName: 'Doe',
						benefits: ['medical', 'dental'],
					},
					dependents: [],
				});

				expect(result).toEqual({
					employeeCost: 1000,
					dependentsCost: 0,
					discountAmount: 0,
					totalAnnualCost: 1000,
					perPaycheckAmount: 38.46153846153846,
					baseSalaryPerPaycheck: 2000,
					annualSalary: 52000,
					netPayPerPaycheck: 1961.5384615384614,
				});
			});
		});

		describe('WHEN employee has dependents', () => {
			it('THEN should return correct cost values', () => {
				const result = benefitsService.calculateEmployeeBenefitsCost({
					employee: {
						id: '1',
						firstName: 'John',
						lastName: 'Doe',
						benefits: ['medical', 'dental'],
					},
					dependents: [
						{
							id: '1',
							employeeId: '1',
							firstName: 'Jane',
							lastName: 'Doe',
							relationship: 'spouse',
							benefits: ['medical', 'dental'],
						},
					],
				});

				expect(result).toEqual({
					employeeCost: 1000,
					dependentsCost: 500,
					discountAmount: 0,
					totalAnnualCost: 1500,
					perPaycheckAmount: 57.69230769230769,
					baseSalaryPerPaycheck: 2000,
					annualSalary: 52000,
					netPayPerPaycheck: 1942.3076923076923,
				});
			});
		});

		describe('WHEN employee or dependents have names starting with "A"', () => {
			it('THEN should apply discount', () => {
				const result = benefitsService.calculateEmployeeBenefitsCost({
					employee: {
						id: '1',
						firstName: 'Alice',
						lastName: 'Doe',
						benefits: ['medical', 'dental'],
					},
					dependents: [
						{
							id: '1',
							employeeId: '1',
							firstName: 'Ava',
							lastName: 'Doe',
							relationship: 'spouse',
							benefits: ['medical', 'dental'],
						},
					],
				});

				expect(result).toEqual({
					employeeCost: 1000,
					dependentsCost: 500,
					discountAmount: 150,
					totalAnnualCost: 1350,
					perPaycheckAmount: 51.92307692307692,
					baseSalaryPerPaycheck: 2000,
					annualSalary: 52000,
					netPayPerPaycheck: 1948.076923076923,
				});
			});
		});
	});
});
