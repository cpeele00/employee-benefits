import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { TEmployeeDependent } from '@/common/types';
import { getAllEmployeesAsync } from '../employees/employees.async';
import { getAllDependentsAsync } from '../dependents/dependents.async';
import type { TDependent } from '@/common/types';
import type { TEmployee } from '@/common/types';
import { mapEmployeesToDependents } from './dashboard.utils';
import type { TEmployeeDependentWithCosts } from './dashboard.types';

// Create a custom query result type that uses our custom data type
type TEmployeeDependentsQueryResult = Omit<
	UseQueryResult<TEmployeeDependent[], unknown>,
	'data'
> & {
	employeesWithDependents: TEmployeeDependentWithCosts[] | undefined;
};

export const useGetAllEmployeesWithDependentsQuery =
	(): TEmployeeDependentsQueryResult => {
		const queryResult = useQuery({
			queryKey: ['employeesWithDependents'],
			queryFn: async () => {
				// Fetch employees and dependents in parallel
				const [employees, dependents] = await Promise.all([
					getAllEmployeesAsync(),
					getAllDependentsAsync(),
				]);

				// Return both datasets in a structured format
				return {
					employees,
					dependents,
				};
			},
			select: (data: { employees: TEmployee[]; dependents: TDependent[] }) => {
				const { employees, dependents } = data;

				// Transform the raw data into the format we want to display
				return mapEmployeesToDependents(employees, dependents);
			},
			refetchOnWindowFocus: 'always',
			staleTime: 1000 * 60 * 2, // Data considered stale after 2 minutes
		});

		const { data: employeesWithDependents, ...rest } = queryResult;

		return {
			employeesWithDependents,
			...rest,
		} as unknown as TEmployeeDependentsQueryResult;
	};
