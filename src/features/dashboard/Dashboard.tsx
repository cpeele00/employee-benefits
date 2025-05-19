import React from 'react';
import { createPortal } from 'react-dom';
import type { TEmployee, TEmployeeDependent } from '@/common/types';
import { TitleCard } from '@/common/components';
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

interface IDashboardProps {
	employeesWithDependents: TEmployeeDependent[] | undefined;
	isLoading: boolean;
	isCreatingEmployee: boolean;
	onCreateEmployee: (employee: TEmployee) => Promise<TEmployee>;
	isUpdatingEmployee: boolean;
	onUpdateEmployee: (employee: TEmployee) => Promise<TEmployee>;
	isDeletingEmployee: boolean;
	onDeleteEmployee: (id: string) => Promise<boolean>;
}

export const Dashboard: React.FC<IDashboardProps> = ({
	employeesWithDependents = [],
	isLoading = false,
	isCreatingEmployee = false,
	onCreateEmployee,
	isUpdatingEmployee = false,
	onUpdateEmployee,
	isDeletingEmployee = false,
	onDeleteEmployee,
}) => {
	const [isAddEmployeeDrawerOpen, setIsAddEmployeeDrawerOpen] = React.useState(false);

	const handleCreateSuccess = () => {
		// Close the drawer
		setIsAddEmployeeDrawerOpen(false);
	};

	const handleUpdateSuccess = () => {
		// Close the drawer
		setIsAddEmployeeDrawerOpen(false);
	};

	return (
		<>
			<TitleCard title='Dashboard' />
			<div className='flex justify-end w-full mb-4'>
				<Button onClick={() => setIsAddEmployeeDrawerOpen(true)}>
					Add Employee
				</Button>
			</div>
			<FlexTable
				columns={[
					{ id: 'employee' },
					{ id: 'dependents' },
					{ id: 'annualCost' },
					{ id: 'perPaycheck', width: 'text-right' },
					{ id: 'actions', width: 'w-24' },
				]}
			>
				<FlexTableHeader>
					<FlexTableHeaderCell column='employee'>Employee</FlexTableHeaderCell>
					<FlexTableHeaderCell column='dependents'>
						# Dependents
					</FlexTableHeaderCell>
					<FlexTableHeaderCell column='annualCost'>
						Annual Cost
					</FlexTableHeaderCell>
					<FlexTableHeaderCell column='perPaycheck' className='text-right'>
						Per Paycheck
					</FlexTableHeaderCell>
					<FlexTableHeaderCell column='actions'>Actions</FlexTableHeaderCell>
				</FlexTableHeader>

				<FlexTableBody>
					{employeesWithDependents.map((item) => (
						<FlexTableRow key={item.employee.id}>
							<FlexTableCell column='employee'>
								{item.employee.firstName} {item.employee.lastName}
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
							<FlexTableCell column='annualCost'>$0</FlexTableCell>
							<FlexTableCell column='perPaycheck' className='text-right'>
								$0
							</FlexTableCell>
							<FlexTableCell column='actions'>
								<Button
									variant='outline'
									onClick={() => {
										setIsAddEmployeeDrawerOpen(true);
									}}
								>
									Edit
								</Button>
								<Button
									variant='outline'
									type='button'
									onClick={(e) => {
										e.preventDefault();
										if (item.employee.id) {
											onDeleteEmployee(item.employee.id);
										}
									}}
								>
									Delete
								</Button>
							</FlexTableCell>
						</FlexTableRow>
					))}
				</FlexTableBody>
			</FlexTable>
			{createPortal(
				<AddEmployeeDependentDrawer
					isOpen={isAddEmployeeDrawerOpen}
					employee={null}
					isCreatingEmployee={isCreatingEmployee}
					onSave={(employee: TEmployee) => {
						onCreateEmployee(employee)
							.then(handleCreateSuccess)
							.catch((err) => {
								console.error(err);
							});
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
