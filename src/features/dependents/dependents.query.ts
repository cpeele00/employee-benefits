import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { TDependent } from './dependents.types';
import { getAllDependents } from './dependents.async';

// Create a custom query result type that uses our custom data type
type TDependentsQueryResult = Omit<UseQueryResult<TDependent[], unknown>, 'data'> & {
	dependents: TDependent[] | undefined;
};

export const useGetAllDependentsQuery = (): TDependentsQueryResult => {
	const queryResult: UseQueryResult<TDependent[], unknown> = useQuery({
		queryKey: ['dependents'],
		queryFn: getAllDependents,
		refetchOnWindowFocus: 'always',
		staleTime: 1000 * 60 * 2, // Data considered stale after 2 minutes
	});

	const { data: dependents, ...rest } = queryResult;

	return { dependents, ...rest };
};
