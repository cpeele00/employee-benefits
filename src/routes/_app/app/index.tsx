import { DashboardView } from '@/features/dashboard/DashboardView';
import { useGetAllEmployeesWithDependentsQuery } from '@/features/dashboard/dashboard.query';
import {
	useCreateEmployee,
	useDeleteEmployee,
	useUpdateEmployee,
} from '@/features/employees/employees.mutation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/app/')({
	component: DashboardRoute,
});

function DashboardRoute() {
	const { employeesWithDependents, isLoading, isRefetching } =
		useGetAllEmployeesWithDependentsQuery();

	const { createEmployee, isPending: isCreatingEmployee } = useCreateEmployee();

	const { updateEmployee, isPending: isUpdatingEmployee } = useUpdateEmployee();

	const { deleteEmployee, isPending: isDeletingEmployee } = useDeleteEmployee();

	return (
		<>
			<DashboardView
				employeesWithDependents={employeesWithDependents}
				isLoading={isLoading}
				isRefetching={isRefetching}
				isCreatingEmployee={isCreatingEmployee}
				onCreateEmployee={createEmployee}
				isUpdatingEmployee={isUpdatingEmployee}
				onUpdateEmployee={updateEmployee}
				isDeletingEmployee={isDeletingEmployee}
				onDeleteEmployee={deleteEmployee}
			/>
		</>
	);
}
