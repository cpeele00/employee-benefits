import React from 'react';
import type { TEmployeeDependent } from './dashboard.types';
import { Button } from '@/common/shadcn/ui/button';
import {
	FlexTable,
	FlexTableHeader,
	FlexTableHeaderCell,
	FlexTableBody,
	FlexTableRow,
	FlexTableCell,
} from '@/common/components/FlexTable/FlexTable';
import { Avatar, AvatarGroup } from '@/common/components';

interface IDashboardProps {
	employeesWithDependents: TEmployeeDependent[] | undefined;
	isLoading: boolean;
}

export const Dashboard: React.FC<IDashboardProps> = ({
	employeesWithDependents = [],
	isLoading = false,
}) => {
	// Sample data for demonstration
	const employees = [
		{ id: 1, name: 'Chris Peele', dependents: 2, annualCost: 1000, perPaycheck: 20 },
		{ id: 2, name: 'Steve Rogers', dependents: 0, annualCost: 1000, perPaycheck: 20 },
	];

	return (
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
				<FlexTableHeaderCell column='annualCost'>Annual Cost</FlexTableHeaderCell>
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
								{item.dependents.map((dependent) => (
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
							<Button variant='outline'>Edit</Button>
						</FlexTableCell>
					</FlexTableRow>
				))}
			</FlexTableBody>
		</FlexTable>
	);
};
