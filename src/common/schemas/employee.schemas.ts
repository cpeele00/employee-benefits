import { z } from 'zod';
import type { TBenefitType } from '../types';

// Define the available benefit types
export const benefitTypes: TBenefitType[] = ['medical', 'dental', 'vision', 'life'];

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

export const dependentFormSchema = z.object({
	id: z.string().optional(),
	firstName: z.string().min(1, { message: 'First name is required.' }),
	lastName: z.string().min(1, { message: 'Last name is required.' }),
	relationship: z.enum(['spouse', 'child'], {
		required_error: 'Please select a relationship.',
	}),
	benefits: benefitsArraySchema,
});

export const employeeFormSchema = z.object({
	id: z.string().optional(),
	firstName: z.string().min(1, { message: 'First name is required.' }),
	lastName: z.string().min(1, { message: 'Last name is required.' }),
	benefits: benefitsArraySchema,
	dependents: z.array(dependentFormSchema),
});

export type TDependentFormValues = z.infer<typeof dependentFormSchema>;
export type TEmployeeFormValues = z.infer<typeof employeeFormSchema>;
