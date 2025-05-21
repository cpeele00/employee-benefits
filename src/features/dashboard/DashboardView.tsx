import React, { lazy, Suspense, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { TEmployee } from '@/common/types';
import { BenefitsCard, TitleCard } from '@/common/components';
import { Button } from '@/shadcn/ui/button';
import {
	FlexTable,
	FlexTableHeader,
	FlexTableHeaderCell,
	FlexTableBody,
	FlexTableRow,
	FlexTableCell,
} from '@/common/components/FlexTable/FlexTable';
import { Avatar, AvatarGroup } from '@/common/components';
// import { AddEmployeeDependentDrawer } from './components/AddEmployeeDependentDrawer';
import { HeartPulse, Plus, Pencil, Trash2, UsersRound } from 'lucide-react';
import { CircularProgress } from '@/common/components/CircularProgress/CircularProgress';
import { Link } from '@tanstack/react-router';
import type { TEmployeeDependentWithCosts } from './dashboard.types';
import { DashboardViewSkeleton } from './components/DashboardViewSkeleton';
import { Badge } from '@/shadcn/ui/badge';
import { toast } from 'sonner';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/shadcn/ui/dialog';
import { ZeroState } from '@/common/components/ZeroState/ZeroState';

interface IDashboardProps {
	employeesWithDependents: TEmployeeDependentWithCosts[] | undefined;
	isLoading: boolean;
	isRefetching: boolean;
	isCreatingEmployee: boolean;
	isDeletingEmployee: boolean;
	isUpdatingEmployee: boolean;
	onCreateEmployee: (employee: TEmployee) => Promise<TEmployee>;
	onUpdateEmployee: (employee: TEmployee) => Promise<TEmployee>;
	onDeleteEmployee: (id: string) => Promise<boolean>;
	totalBenefitsCost: number;
	totalDependents: number;
	totalEmployees: number;
}

// Lazy load the AddEmployeeDependentDrawer
const AddEmployeeDependentDrawer = lazy(
	() =>
		import(
			/* @vite-chunk: "add-employee-dependent-drawer" */ './components/AddEmployeeDependentDrawer'
		)
);

export const DashboardView: React.FC<IDashboardProps> = ({
	employeesWithDependents = [],
	isLoading = false,
	isRefetching = false,
	isCreatingEmployee = false,
	isDeletingEmployee = false,
	isUpdatingEmployee = false,
	onCreateEmployee,
	onUpdateEmployee,
	onDeleteEmployee,
	totalBenefitsCost,
	totalDependents,
	totalEmployees,
}) => {
	const [isAddEmployeeDrawerOpen, setIsAddEmployeeDrawerOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<TEmployee | null>(null);
	const [selectedEmployeeToDelete, setSelectedEmployeeToDelete] =
		useState<TEmployee | null>(null);
	const [isDeleteEmployeeDialogOpen, setIsDeleteEmployeeDialogOpen] = useState(false);

	const isPending =
		isRefetching || isDeletingEmployee || isUpdatingEmployee || isCreatingEmployee;

	useEffect(() => {
		// Open the dialog when an employee is selected.
		// This ensures the value is set before opening the dialog.
		if (selectedEmployeeToDelete) {
			setIsDeleteEmployeeDialogOpen(true);
		}
	}, [selectedEmployeeToDelete]);

	const handleCreateSuccess = () => {
		setIsAddEmployeeDrawerOpen(false);
		setSelectedEmployee(null);
		toast.success('Employee updated successfully!');
	};

	const handleUpdateSuccess = () => {
		setIsAddEmployeeDrawerOpen(false);
		setSelectedEmployee(null);
		toast.success('Employee updated successfully!');
	};

	const handleCreateFailure = () => {
		toast.error('Failed to create employee. Please try again.');
	};

	const handleUpdateFailure = () => {
		toast.error('Failed to update employee. Please try again.');
	};

	return (
		<>
			{isLoading ? (
				<DashboardViewSkeleton />
			) : (
				<>
					<TitleCard title='Dashboard' />

					<section className='flex gap-4 mt-10'>
						<BenefitsCard
							title='Total Employees'
							text={totalEmployees}
							subtext='employees'
							icon={<UsersRound className='text-blue-500' size={30} />}
						/>
						<BenefitsCard
							title='Total Dependents'
							text={totalDependents}
							subtext='family members'
							icon={<UsersRound className='text-blue-500' size={30} />}
						/>
						<BenefitsCard
							title='Total Benefits Cost'
							text={totalBenefitsCost.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
							subtext='per year'
							icon={<HeartPulse className='text-red-500' size={30} />}
						/>
					</section>

					<div className='flex justify-between w-full mb-4 mt-12'>
						{isPending ? <CircularProgress /> : <div></div>}
						<Button
							className='flex items-center gap-1'
							disabled={isPending || isLoading}
							onClick={() => setIsAddEmployeeDrawerOpen(true)}
						>
							<Plus />
							Add Employee
						</Button>
					</div>

					{employeesWithDependents.length === 0 ? (
						<ZeroState
							title='No Employees'
							icon={<UsersRound size={48} className='text-blue-500' />}
							description='There are no employees to display at this time.'
							actionLabel='Add Employee'
							onAction={() => setIsAddEmployeeDrawerOpen(true)}
						/>
					) : (
						<FlexTable
							columns={[
								{ id: 'employee', width: 'w-1/4' },
								{ id: 'dependents', width: 'w-1/4' },
								{ id: 'annualCost', width: 'w-1/6' },
								{ id: 'perPaycheck', width: 'w-1/6' },
								{ id: 'actions', width: 'w-1/6 text-right' },
							]}
						>
							<FlexTableHeader>
								<FlexTableHeaderCell column='employee'>
									Employee
								</FlexTableHeaderCell>
								<FlexTableHeaderCell column='dependents'>
									# Dependents
								</FlexTableHeaderCell>
								<FlexTableHeaderCell column='annualCost'>
									Annual Cost
								</FlexTableHeaderCell>
								<FlexTableHeaderCell column='perPaycheck'>
									Per Paycheck
								</FlexTableHeaderCell>
								<FlexTableHeaderCell column='actions'>
									Actions
								</FlexTableHeaderCell>
							</FlexTableHeader>

							<FlexTableBody>
								{employeesWithDependents.map((item) => (
									<FlexTableRow key={item.employee.id}>
										<FlexTableCell column='employee'>
											<div className='flex items-center gap-3'>
												<Avatar
													size='lg'
													name={`${item.employee.firstName} ${item.employee.lastName}`}
												/>
												<Link
													to={`/app/employees/$employeeId`}
													params={{
														employeeId:
															item.employee.id || '',
													}}
													className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
												>
													{item.employee.firstName}{' '}
													{item.employee.lastName}
												</Link>
											</div>
										</FlexTableCell>
										<FlexTableCell column='dependents'>
											<AvatarGroup max={3}>
												{(item.dependents || []).map(
													(dependent) => (
														<Avatar
															key={dependent.id}
															name={`${dependent.firstName} ${dependent.lastName}`}
														/>
													)
												)}
											</AvatarGroup>
										</FlexTableCell>
										<FlexTableCell column='annualCost'>
											{item?.annualCost.toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</FlexTableCell>
										<FlexTableCell column='perPaycheck'>
											{item?.perPaycheck.toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</FlexTableCell>
										<FlexTableCell column='actions'>
											<div className='flex justify-end space-x-2 items-center'>
												{item.employee.firstName
													.toLocaleLowerCase()
													.startsWith('a') && (
													<Badge
														variant='outline'
														className='text-green-600 border-green-600 text-xs rounded-3xl h-6 bg-green-300'
													>
														10% Discount Applied
													</Badge>
												)}

												<Button
													variant='ghost'
													size='icon'
													disabled={isPending}
													onClick={() => {
														const employeeWithDependents = {
															...item.employee,
															dependents:
																item.dependents || [],
														};

														setSelectedEmployee(
															employeeWithDependents
														);
														setIsAddEmployeeDrawerOpen(true);
													}}
												>
													<Pencil className='h-4 w-4' />
													<span className='sr-only'>Edit</span>
												</Button>
												<Button
													variant='ghost'
													size='icon'
													type='button'
													disabled={isPending}
													onClick={(e) => {
														e.preventDefault();
														if (item.employee.id) {
															setSelectedEmployeeToDelete(
																item.employee
															);
														}
													}}
												>
													<Trash2 className='h-4 w-4' />
													<span className='sr-only'>
														Delete
													</span>
												</Button>
											</div>
										</FlexTableCell>
									</FlexTableRow>
								))}
							</FlexTableBody>
						</FlexTable>
					)}

					<Dialog
						open={isDeleteEmployeeDialogOpen}
						onOpenChange={() => {
							setIsDeleteEmployeeDialogOpen(false);
							setSelectedEmployeeToDelete(null);
						}}
					>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Delete {selectedEmployee?.firstName}{' '}
									{selectedEmployee?.lastName}?
								</DialogTitle>
								<DialogDescription>
									Are you sure you want to delete this dependent?
								</DialogDescription>
								<DialogDescription>
									This action cannot be undone. This will permanently
									delete the employee and all of their dependents.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<div className='flex justify-end gap-2 mt-8'>
									<Button
										type='button'
										variant='secondary'
										onClick={() => {
											setIsDeleteEmployeeDialogOpen(false);
										}}
									>
										Cancel
									</Button>
									<Button
										type='button'
										variant='default'
										onClick={() => {
											if (selectedEmployee?.id) {
												onDeleteEmployee(selectedEmployee.id);
												setIsDeleteEmployeeDialogOpen(false);
												setSelectedEmployeeToDelete(null);
											}
										}}
									>
										Delete
									</Button>
								</div>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</>
			)}

			{createPortal(
				<Suspense fallback={<div>Loading...</div>}>
					<AddEmployeeDependentDrawer
						isOpen={isAddEmployeeDrawerOpen}
						employee={selectedEmployee}
						isPending={isPending}
						onSave={(employee: TEmployee) => {
							if (employee.id) {
								return onUpdateEmployee(employee)
									.then(() => {
										handleUpdateSuccess();
									})
									.catch((err: unknown) => {
										if (err instanceof Error) {
											console.error(err.message);
											handleUpdateFailure();
										} else {
											console.error(err);
										}
									});
							} else {
								return onCreateEmployee(employee)
									.then(() => {
										handleCreateSuccess();
									})
									.catch((err: unknown) => {
										if (err instanceof Error) {
											console.error(err.message);
											handleCreateFailure();
										} else {
											console.error(err);
										}
									});
							}
						}}
						onClose={() => {
							setIsAddEmployeeDrawerOpen(false);
						}}
					/>
				</Suspense>,
				document.body
			)}
		</>
	);
};
