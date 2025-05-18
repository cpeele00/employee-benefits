import React from 'react';
import { Button } from '@/common/shadcn/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/common/shadcn/ui/sheet';
import type { TEmployee } from '../../employees/employees.types';

interface IAddEmployeeDependentDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	employee?: TEmployee; // Optional - if provided, we're editing
	onSubmit: (employee: TEmployee) => void;
}

export const AddEmployeeDependentDrawer: React.FC<IAddEmployeeDependentDrawerProps> = ({
	isOpen,
	onClose,
	employee,
	onSubmit,
}) => {
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
				<div className='py-4'>{/* Form fields */}</div>

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
