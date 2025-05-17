import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
} from 'flowbite-react';
import { Skeleton } from '../../common/components/Skeleton/Skeleton';
import type { TEmployeeDependent } from './dashboard.types';
import type { TDependent } from '../dependents/dependents.types';

interface IDashboardTableProps {
	employeesWithDependents: TEmployeeDependent[];
	isLoading: boolean;
	renderDependents?: (dependents: TDependent[]) => React.ReactNode;
}

export const DashboardTable = ({
	employeesWithDependents = [],
	isLoading = false,
	renderDependents,
}: IDashboardTableProps) => {
	if (isLoading) {
		return <Skeleton count={5} />;
	}

	return (
		<div className='overflow-x-auto w-full'>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeadCell className='text-gray-500'>Employee</TableHeadCell>
						<TableHeadCell className='text-gray-500'>
							# Dependents
						</TableHeadCell>
						<TableHeadCell className='text-gray-500'>
							Annual Cost
						</TableHeadCell>
						<TableHeadCell className='text-gray-500'>
							Per Paycheck
						</TableHeadCell>
						<TableHeadCell className='text-gray-500'>Actions</TableHeadCell>
					</TableRow>
				</TableHead>
				<TableBody className='space-y-3'>
					{employeesWithDependents.map((item) => (
						<>
							<TableRow
								key={item.employee.id}
								className='bg-white rounded-lg h-16'
							>
								<TableCell>
									{item.employee.firstName} {item.employee.lastName}
								</TableCell>
								<TableCell className='relative overflow-visible'>
									{renderDependents ? (
										<div className='w-[100px] overflow-visible'>
											{renderDependents(item.dependents)}
										</div>
									) : (
										item.dependents.length
									)}
								</TableCell>
								<TableCell>$0</TableCell>
								<TableCell>$0</TableCell>
								<TableCell>
									<a
										href='#'
										className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
									>
										Edit
									</a>
								</TableCell>
							</TableRow>
							<div className='p-1'></div>
						</>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
