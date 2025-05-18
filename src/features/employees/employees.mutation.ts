import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { TEmployee } from '@/common/types';
import { createEmployeeAsync, updateEmployeeAsync } from './employees.async';

export const useCreateEmployeeMutation = () => {
	const queryClient = useQueryClient();

	const mutationResult = useMutation({
		mutationFn: async (employee: TEmployee) => {
			const result = await createEmployeeAsync(employee);

			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] });
		},
	});

	const { mutate: createEmployee, ...rest } = mutationResult;

	return { createEmployee, ...rest };
};

export const useUpdateEmployeeMutation = () => {
	const queryClient = useQueryClient();

	const mutationResult = useMutation({
		mutationFn: async (employee: TEmployee) => {
			const result = await updateEmployeeAsync(employee);

			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] });
		},
	});

	const { mutate: updateEmployee, ...rest } = mutationResult;

	return { updateEmployee, ...rest };
};
