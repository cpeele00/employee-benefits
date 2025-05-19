import { TitleCard } from '@/common/components';
import { EmployeeTable } from './EmployeeTable';
import type { TEmployee } from '@/common/types';

interface IEmployeesProps {
	employees: TEmployee[] | undefined;
	isLoading: boolean;
}

export const Employees = ({ employees = [], isLoading = false }: IEmployeesProps) => {
	return (
		<>
			<TitleCard title='Employees' />
			<EmployeeTable employees={employees} isLoading={isLoading} />
		</>
	);
};
