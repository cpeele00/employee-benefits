import React from 'react';
import { Divide, PlusCircle } from 'lucide-react';
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
	benefitTypes,
	employeeFormSchema,
	type TEmployeeFormValues,
} from '@/common/schemas/employee.schemas';
import type { TBenefitType } from '@/common/types';
import { MultiSelect } from '@/shadcn/ui/multi-select';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/shadcn/ui/form';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';

interface IAddEmployeeDependentDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	employee: TEmployee | null;
	onSave: (employee: TEmployee) => void;
}

const benefitOptions = benefitTypes.map((benefit: TBenefitType) => ({
	label: benefit,
	value: benefit,
}));

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
		try {
			const employeeToSave: TEmployee = {
				id: data.id || '',
				firstName: data.firstName,
				lastName: data.lastName,
				benefits: data.benefits,
				dependents: data.dependents,
			};

			onSave(employeeToSave);
		} catch (error: unknown) {
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
				<section className='p-4'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-6'
						>
							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='firstName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input
													placeholder='First name'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='lastName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input
													placeholder='Last name'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='benefits'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Benefits</FormLabel>
										<FormControl>
											<MultiSelect
												options={benefitOptions}
												selected={field.value}
												onChange={field.onChange}
												placeholder='Select benefits'
												emptyMessage='No benefits found.'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<Label>Dependents</Label>
									<Button
										variant='outline'
										size={'sm'}
										type='button'
										onClick={handleAddDependent}
										className='flex items-center gap-1'
									>
										Add Dependent
										<PlusCircle className='h-4 w-4' />
									</Button>
								</div>

								{/* Render dependents fields */}
								{fields.length === 0 ? (
									<p className='text-sm text-muted-foreground'>
										No dependents added.
									</p>
								) : (
									<div className='space-y-4'>
										{fields.map((field, index) => (
											<div key={field.id}>
												<div>
													<FormField
														control={form.control}
														name={`dependents.${index}.firstName`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>
																	First Name
																</FormLabel>
																<FormControl>
																	<Input
																		placeholder='First name'
																		{...field}
																	/>
																</FormControl>
															</FormItem>
														)}
													/>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</form>
					</Form>
				</section>

				<SheetFooter>
					<div className='flex justify-end gap-2'>
						<Button variant='outline' onClick={onClose}>
							Cancel
						</Button>
						<Button type='submit' onClick={form.handleSubmit(onSubmit)}>
							Save
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
