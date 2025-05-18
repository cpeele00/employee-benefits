import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shadcn/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/shadcn/ui/sheet';
import type { TEmployee } from '@/common/types';
import { useFieldArray, useForm } from 'react-hook-form';
import {
	employeeFormSchema,
	type TEmployeeFormValues,
} from '@/common/schemas/employee.schemas';
import type { TBenefitType } from '@/common/types';

interface IAddEmployeeDependentDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	employee: TEmployee | null;
	onSave: (employee: TEmployee) => void;
}

export const AddEmployeeDependentDrawer: React.FC<IAddEmployeeDependentDrawerProps> = ({
	isOpen,
	onClose,
	employee,
	onSave,
}) => {
	// Initialize the react-hook-form with zod validation
	const form = useForm<TEmployeeFormValues>({
		resolver: zodResolver(employeeFormSchema),
		defaultValues: {
			id: employee?.id || '',
			firstName: employee?.firstName || '',
			lastName: employee?.lastName || '',
			benefits: employee?.benefits || [],
			dependents: employee?.dependents || [],
		},
	});

	// Setup field array for dependents
	const { fields, append, remove } = useFieldArray({
		name: 'dependents',
		control: form.control,
	});

	const handleAddDependent = () => {
		// Add a new dependent to the field array
		append({
			firstName: '',
			lastName: '',
			relationship: 'Spouse',
			benefits: [],
		});
	};

	const handleRemoveDependent = (index: number) => {
		// Remove the last dependent from the field array
		remove(index);
	};

	const onSubmit = async (data: TEmployeeFormValues) => {
		// Submit the form data
		// Simulate API call with delay
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const employeeToSave = {
			id: data.id || '',
			firstName: data.firstName,
			lastName: data.lastName,
			benefits: data.benefits,
			dependents: data.dependents,
		};

		try {
			onSave(employeeToSave);
		} catch (error) {
			console.error(error);
		}
	};

	const isEditing = !!employee;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='sm:max-w-md'>
				<SheetHeader>
					<SheetTitle>
						{isEditing ? 'Edit Employee' : 'Add Employee'}
					</SheetTitle>
					<SheetDescription>
						{isEditing
							? 'Update employee information in the form below.'
							: 'Fill out the form below to add a new employee.'}
					</SheetDescription>
				</SheetHeader>
				{/* Form will go here */}
				<div className='py-4'></div>

				<SheetFooter>
					<div className='flex justify-end gap-2'>
						<Button variant='outline' onClick={onClose}>
							Cancel
						</Button>
						<Button type='submit'>Save</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
