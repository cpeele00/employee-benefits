import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import type { TEmployee } from '@/common/types';
import {
	createEmployeeAsync,
	deleteEmployeeAsync,
	updateEmployeeAsync,
} from './employees.async';
import { createDependentAsync } from '../dependents/dependents.async';

export const useCreateEmployee = () => {
	const queryClient = useQueryClient();

	const mutationResult = useMutation({
		mutationFn: (employee: TEmployee) => {
			// Generate a unique ID for the employee
			const employeeId = uuidv4();

			// Create a new employee object with the ID
			const employeeWithIds = {
				...employee,
				id: employeeId,
				// Remove dependents as they'll be created separately
				dependents: [],
			};

			return createEmployeeAsync(employeeWithIds);
		},
		onSuccess: (createdEmployee, originalEmployee) => {
			// If there are dependents, create them
			if (originalEmployee.dependents && originalEmployee.dependents.length > 0) {
				// Create each dependent with a reference to the employee
				const dependentPromises = originalEmployee.dependents.map((dependent) =>
					createDependentAsync({
						...dependent,
						id: uuidv4(),
						employeeId: createdEmployee.id,
					})
				);

				// Execute all dependent creations in parallel
				return Promise.all(dependentPromises).then(() => {
					// Invalidate ALL relevant queries after everything is created
					queryClient.invalidateQueries({
						queryKey: ['employeesWithDependents'],
					});
					queryClient.invalidateQueries({
						queryKey: ['employees'],
					});
					queryClient.invalidateQueries({
						queryKey: ['dependents'],
					});
				});
			} else {
				// If no dependents, still invalidate the main query
				queryClient.invalidateQueries({
					queryKey: ['employeesWithDependents'],
				});
			}
		},
	});

	const { mutateAsync: createEmployee, ...rest } = mutationResult;

	return { createEmployee, ...rest };
};

export const useUpdateEmployee = () => {
	const queryClient = useQueryClient();

	const mutationResult = useMutation({
		mutationFn: (employee: TEmployee) => {
			return updateEmployeeAsync(employee);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['employeesWithDependents', 'employees'],
			});
		},
	});

	const { mutateAsync: updateEmployee, ...rest } = mutationResult;

	return { updateEmployee, ...rest };
};

export const useDeleteEmployee = () => {
	const queryClient = useQueryClient();

	const mutationResult = useMutation({
		mutationFn: (id: string) => deleteEmployeeAsync(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['employeesWithDependents', 'employees'],
			});
		},
	});

	const { mutateAsync: deleteEmployee, ...rest } = mutationResult;

	return { deleteEmployee, ...rest };
};
