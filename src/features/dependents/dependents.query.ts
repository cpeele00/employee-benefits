import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { TDependent } from '@/common/types';
import { getAllDependentsByEmployeeIdAsync } from './dependents.async';

// Create a custom query result type that uses our custom data type
type TDependentsQueryResult = Omit<UseQueryResult<TDependent[], unknown>, 'data'> & {
	dependents: TDependent[] | undefined;
};

export const useGetAllDependentsByEmployeeIdQuery = ({
	employeeId,
}: {
	employeeId: string;
}): TDependentsQueryResult => {
	const queryResult: UseQueryResult<TDependent[], unknown> = useQuery({
		queryKey: ['dependents', employeeId],
		queryFn: () => getAllDependentsByEmployeeIdAsync(employeeId),
		refetchOnWindowFocus: 'always',
	});

	const { data: dependents, ...rest } = queryResult;

	return { dependents, ...rest };
};
