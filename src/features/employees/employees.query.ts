import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { TEmployee } from '@/common/types';
import { getAllEmployeesAsync, getEmployeeByIdAsync } from './employees.async';

// Create a custom query result type that uses our custom data type
type TEmployeesQueryResult = Omit<UseQueryResult<TEmployee[], unknown>, 'data'> & {
	employees: TEmployee[] | undefined;
};

type TEmployeeQueryResult = Omit<UseQueryResult<TEmployee, unknown>, 'data'> & {
	employee: TEmployee | undefined;
};

export const useGetAllEmployeesQuery = (): TEmployeesQueryResult => {
	const queryResult: UseQueryResult<TEmployee[], unknown> = useQuery({
		queryKey: ['employees'], // Query key
		queryFn: getAllEmployeesAsync,
		refetchOnWindowFocus: 'always', // Refetch when window regains focus to ensure "freshness"
		staleTime: 1000 * 60 * 2, // Data considered stale after 2 minutes
	});

	const { data: employees, ...rest } = queryResult;

	return { employees, ...rest };
};

export const useGetEmployeeByIdQuery = (employeeId: string): TEmployeeQueryResult => {
	const queryResult: UseQueryResult<TEmployee, unknown> = useQuery({
		queryKey: ['employee'],
		queryFn: () => getEmployeeByIdAsync(employeeId),
		refetchOnWindowFocus: 'always',
	});

	const { data: employee, ...rest } = queryResult;

	return { employee, ...rest };
};
