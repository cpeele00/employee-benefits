import React, { useEffect } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shadcn/ui/select';

interface IAddEmployeeDependentDrawerProps {
	isOpen: boolean;
	employee: TEmployee | null;
	isPending: boolean;
	onClose: () => void;
	onSave: (employee: TEmployee) => Promise<void>;
}

const benefitOptions = benefitTypes.map((benefit: TBenefitType) => ({
	label: benefit,
	value: benefit,
}));

export const AddEmployeeDependentDrawer: React.FC<IAddEmployeeDependentDrawerProps> = ({
	isOpen,
	employee,
	isPending,
	onClose,
	onSave,
}) => {
	// Initialize the react-hook-form with zod validation
	const form = useForm<TEmployeeFormValues>({
		resolver: zodResolver(employeeFormSchema),
		defaultValues: {
			id: employee?.id,
			firstName: employee?.firstName || '',
			lastName: employee?.lastName || '',
			benefits: employee?.benefits || [],
			dependents: employee?.dependents || [],
		},
		disabled: isPending,
	});

	// Setup field array for dependents
	const { fields, append, remove } = useFieldArray({
		name: 'dependents',
		control: form.control,
	});

	useEffect(() => {
		if (employee) {
			form.reset({
				id: employee.id,
				firstName: employee.firstName || '',
				lastName: employee.lastName || '',
				benefits: employee.benefits || [],
				dependents: employee.dependents || [],
			});
		} else {
			form.reset({
				id: '',
				firstName: '',
				lastName: '',
				benefits: [],
				dependents: [],
			});
		}
	}, [employee]);

	const handleAddDependent = () => {
		// Add a new dependent to the field array
		append({
			firstName: '',
			lastName: '',
			relationship: 'spouse',
			benefits: [],
		});
	};

	const handleRemoveDependent = (index: number) => {
		// Remove the last dependent from the field array
		remove(index);
	};

	// Handle form submission
	const onSubmit = (data: TEmployeeFormValues) => {
		const employeeToSave: TEmployee = {
			id: data.id || '',
			firstName: data.firstName,
			lastName: data.lastName,
			benefits: data.benefits,
			dependents: data.dependents,
		};

		onSave(employeeToSave)
			.then(() => {
				form.reset();
			})
			.catch((err) => {
				console.error('Failed to save employee:', err);
			});
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
				<section className='p-4 overflow-y-auto'>
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
										disabled={isPending}
										className='flex items-center gap-1'
									>
										<Plus />
										Add Dependent
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
											<div
												key={field.id}
												className='rounded-md border border-dashed p-4 space-y-4'
											>
												<div className='grid grid-cols-2 gap-3'>
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

													<FormField
														control={form.control}
														name={`dependents.${index}.lastName`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>
																	Last Name
																</FormLabel>
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
													name={`dependents.${index}.relationship`}
													render={({ field }) => (
														<FormItem className='w-full'>
															<FormLabel>
																Relationship
															</FormLabel>
															<Select
																onValueChange={
																	field.onChange
																}
																defaultValue={field.value}
																disabled={false}
															>
																<FormControl>
																	<SelectTrigger className='w-full'>
																		<SelectValue placeholder='Select relationship' />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<SelectItem value='spouse'>
																		Spouse
																	</SelectItem>
																	<SelectItem value='child'>
																		Child
																	</SelectItem>
																</SelectContent>
															</Select>
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name={`dependents.${index}.benefits`}
													render={({ field }) => (
														<FormItem className='w-full'>
															<FormLabel>
																Benefits
															</FormLabel>
															<FormControl>
																<MultiSelect
																	options={
																		benefitOptions
																	}
																	selected={field.value}
																	onChange={
																		field.onChange
																	}
																	placeholder='Select benefits'
																	emptyMessage='No benefits found.'
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<Button
													type='button'
													variant='ghost'
													size='sm'
													disabled={isPending}
													onClick={() =>
														handleRemoveDependent(index)
													}
													className='ml-auto flex items-center gap-1 text-violet-600'
												>
													<Trash2 className='h-4 w-4 mr-1' />
													Remove Dependent
												</Button>
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
						<Button
							variant='outline'
							disabled={isPending}
							onClick={() => {
								form.reset();

								if (onClose) onClose();
							}}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							onClick={form.handleSubmit(onSubmit)}
							disabled={isPending}
						>
							Save
							{isPending ? <Loader2 className='animate-spin' /> : null}
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
