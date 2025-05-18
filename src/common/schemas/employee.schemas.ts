import { z } from 'zod';
import type { TBenefitType } from '../types';

// Define the available benefit types
export const benefitTypes: TBenefitType[] = ['Medical', 'Dental', 'Vision', 'Life'];

const noDuplicateBenefits = (benfits: TBenefitType[]) => {
	const uniqueBenefits = new Set(benfits);

	// If the size of the set is the same as the length of the array,
	// there are no duplicates
	return uniqueBenefits.size === benfits.length;
};

export const benefitsArraySchema = z
	.array(z.enum(benefitTypes as [TBenefitType, ...TBenefitType[]]))
	.min(1, { message: 'At least one benefit is required.' })
	.refine(noDuplicateBenefits, { message: 'Cannot select the same benefit twice.' });

export const dependentSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required.' }),
	relationship: z.enum(['Spouse', 'Child'], {
		required_error: 'Please select a relationship.',
	}),
	benefits: benefitsArraySchema,
});

export const employeeFormSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required.' }),
	lastName: z.string().min(1, { message: 'Last name is required.' }),
	benefits: benefitsArraySchema,
	dependents: z.array(dependentSchema),
});

export type TDependentFormValues = z.infer<typeof dependentSchema>;
export type TEmployeeFormValues = z.infer<typeof employeeFormSchema>;
