import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDependentAsync, deleteDependentAsync } from './dependents.async';
import type { TDependent } from '@/common/types';

export const useCreateDepedent = () => {
	const queryClient = useQueryClient();

	const mutationResult = useMutation({
		mutationFn: async (dependent: TDependent) => {
			return createDependentAsync(dependent);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['dependents'],
			});
			queryClient.invalidateQueries({
				queryKey: ['employeesWithDependents'],
			});
		},
	});

	const { mutateAsync: createDependent, ...rest } = mutationResult;

	return { createDependent, ...rest };
};

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
