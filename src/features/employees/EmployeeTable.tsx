import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
} from 'flowbite-react';
import type { TEmployee } from './employees.types';
import { Skeleton } from '../../common/components/Skeleton/Skeleton';

interface IEmployeeTableProps {
	employees: TEmployee[];
	isLoading: boolean;
}

export const EmployeeTable = ({
	employees = [],
	isLoading = false,
}: IEmployeeTableProps) => {
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
					{employees.map((employee) => (
						<>
							<TableRow
								key={employee.id}
								className='bg-white rounded-lg h-16'
							>
								<TableCell>
									{employee.firstName} {employee.lastName}
								</TableCell>
								<TableCell>0</TableCell>
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
