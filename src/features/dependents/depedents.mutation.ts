import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDependentAsync } from './dependents.async';

export const useDeleteDependent = () => {
	const queryClient = useQueryClient();

	const mutationResult = useMutation({
		mutationFn: async (id: string) => deleteDependentAsync(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['dependents'],
			});
			queryClient.invalidateQueries({
				queryKey: ['employeesWithDependents'],
			});
		},
	});

	const { mutateAsync: deleteDependent, ...rest } = mutationResult;

	return { deleteDependent, ...rest };
};
