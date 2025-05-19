import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import {
	createDependentAsync,
	deleteDependentAsync,
	updateDependentAsync,
} from './dependents.async';
import type { TDependent } from '@/common/types';

export const useCreateDepedent = () => {
	const queryClient = useQueryClient();

	const mutationResult = useMutation({
		mutationFn: async (dependent: TDependent) => {
			// Generate a UUID for the dependent if not provided
			const dependentWithId = {
				...dependent,
				id: dependent.id || uuidv4(),
			};
			return createDependentAsync(dependentWithId);
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

export const useUpdateDependent = () => {
	const queryClient = useQueryClient();

	const mutationResult = useMutation({
		mutationFn: async (dependent: TDependent) => updateDependentAsync(dependent),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['dependents'],
			});
			queryClient.invalidateQueries({
				queryKey: ['employeesWithDependents'],
			});
		},
	});

	const { mutateAsync: updateDependent, ...rest } = mutationResult;

	return { updateDependent, ...rest };
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
