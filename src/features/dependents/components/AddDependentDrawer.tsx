import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
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
import type { TDependent } from '@/common/types';
import { useForm } from 'react-hook-form';
import {
	benefitTypes,
	dependentFormSchema,
	type TDependentFormValues,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shadcn/ui/select';

interface IAddDependentDrawerProps {
	isOpen: boolean;
	employeeId: string;
	dependent?: TDependent | null;
	isPending: boolean;
	onClose: () => void;
	onSave: (dependent: TDependent) => Promise<void>;
}

const benefitOptions = benefitTypes.map((benefit: TBenefitType) => ({
	label: benefit,
	value: benefit,
}));

const AddDependentDrawer: React.FC<IAddDependentDrawerProps> = ({
	isOpen,
	employeeId,
	dependent,
	isPending,
	onClose,
	onSave,
}) => {
	const form = useForm<TDependentFormValues>({
		resolver: zodResolver(dependentFormSchema),
		defaultValues: {
			id: dependent?.id,
			firstName: dependent?.firstName || '',
			lastName: dependent?.lastName || '',
			relationship: dependent?.relationship || 'spouse',
			benefits: dependent?.benefits || [],
		},
		disabled: isPending,
	});

	// Reset form when dependent changes
	useEffect(() => {
		if (dependent) {
			form.reset({
				id: dependent.id,
				firstName: dependent.firstName || '',
				lastName: dependent.lastName || '',
				relationship: dependent.relationship || 'spouse',
				benefits: dependent.benefits || [],
			});
		} else {
			form.reset({
				id: '',
				firstName: '',
				lastName: '',
				relationship: 'spouse',
				benefits: [],
			});
		}
	}, [dependent, form]);

	const onSubmit = (data: TDependentFormValues) => {
		const dependentToSave: TDependent = {
			id: data.id,
			employeeId,
			firstName: data.firstName,
			lastName: data.lastName,
			relationship: data.relationship,
			benefits: data.benefits,
		};

		onSave(dependentToSave)
			.then(() => {
				form.reset();
			})
			.catch((err) => {
				console.error('Failed to save dependent:', err);
			});
	};

	const isEditing = !!dependent;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='sm:max-w-md'>
				<SheetHeader>
					<SheetTitle>
						{isEditing ? 'Edit Dependent' : 'Add Dependent'}
					</SheetTitle>
					<SheetDescription>
						{isEditing
							? 'Update dependent information in the form below.'
							: 'Fill out the form below to add a new dependent.'}
					</SheetDescription>
				</SheetHeader>
				<section className='p-4 overflow-y-auto'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-6'
						>
							<div className='grid grid-cols-2 gap-3'>
								<FormField
									control={form.control}
									name={`firstName`}
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
									name={`lastName`}
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
								name={`relationship`}
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Relationship</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={isPending}
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
								name={`benefits`}
								disabled={isPending}
								render={({ field }) => (
									<FormItem className='w-full'>
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

export default AddDependentDrawer;
