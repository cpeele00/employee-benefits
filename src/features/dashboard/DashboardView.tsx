import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import type { TEmployee, TEmployeeDependent } from '@/common/types';
import { SkeletonRow, TitleCard } from '@/common/components';
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
import { AddEmployeeDependentDrawer } from './components/AddEmployeeDependentDrawer';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { CircularProgress } from '@/common/components/CircularProgress/CircularProgress';
import { Link } from '@tanstack/react-router';
import type { TEmployeeDependentWithCosts } from './dashboard.types';
import { toast } from 'sonner';

interface IDashboardProps {
	employeesWithDependents: TEmployeeDependentWithCosts[] | undefined;
	isLoading: boolean;
	isRefetching: boolean;
	isCreatingEmployee: boolean;
	onCreateEmployee: (employee: TEmployee) => Promise<TEmployee>;
	isUpdatingEmployee: boolean;
	onUpdateEmployee: (employee: TEmployee) => Promise<TEmployee>;
	isDeletingEmployee: boolean;
	onDeleteEmployee: (id: string) => Promise<boolean>;
}

export const DashboardView: React.FC<IDashboardProps> = ({
	employeesWithDependents = [],
	isLoading = false,
	isRefetching = false,
	isCreatingEmployee = false,
	onCreateEmployee,
	isUpdatingEmployee = false,
	onUpdateEmployee,
	isDeletingEmployee = false,
	onDeleteEmployee,
}) => {
	const [isAddEmployeeDrawerOpen, setIsAddEmployeeDrawerOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<TEmployee | null>(null);

	const handleCreateSuccess = () => {
		// Close the drawer
		setIsAddEmployeeDrawerOpen(false);
		setSelectedEmployee(null);
		toast.success('Employee updated successfully!');
	};

	const handleUpdateSuccess = () => {
		// Close the drawer
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

	const isPending =
		isRefetching || isDeletingEmployee || isUpdatingEmployee || isCreatingEmployee;

	return (
		<>
			<TitleCard title='Dashboard' />
			<div className='flex justify-between w-full mb-4 mt-10'>
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

			{isLoading ? (
				<SkeletonRow count={5} />
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
									<Link
										to={`/app/employees/$employeeId`}
										params={{ employeeId: item.employee.id || '' }}
										className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
									>
										{item.employee.firstName} {item.employee.lastName}
									</Link>
								</FlexTableCell>
								<FlexTableCell column='dependents'>
									<AvatarGroup max={3}>
										{(item.dependents || []).map((dependent) => (
											<Avatar
												key={dependent.id}
												name={`${dependent.firstName} ${dependent.lastName}`}
											/>
										))}
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
									<div className='flex justify-end space-x-2'>
										<Button
											variant='ghost'
											size='icon'
											disabled={isPending}
											onClick={() => {
												const employeeWithDependents = {
													...item.employee,
													dependents: item.dependents || [],
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
													onDeleteEmployee(item.employee.id);
												}
											}}
										>
											<Trash2 className='h-4 w-4' />
											<span className='sr-only'>Delete</span>
										</Button>
									</div>
								</FlexTableCell>
							</FlexTableRow>
						))}
					</FlexTableBody>
				</FlexTable>
			)}

			{createPortal(
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
				/>,
				document.body
			)}
		</>
	);
};
