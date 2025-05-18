import { Dashboard } from '@/features/dashboard/Dashboard';
import { useGetAllEmployeesWithDependentsQuery } from '@/features/dashboard/dashboard.query';
import {
	useCreateEmployee,
	useUpdateEmployee,
} from '@/features/employees/employees.mutation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/app/')({
	component: DashboardRoute,
});

function DashboardRoute() {
	const { employeesWithDependents, isLoading } =
		useGetAllEmployeesWithDependentsQuery();

	const { createEmployee, isPending: isCreatingEmployee } = useCreateEmployee();

	const { updateEmployee, isPending: isUpdatingEmployee } = useUpdateEmployee();

	return (
		<>
			<Dashboard
				employeesWithDependents={employeesWithDependents}
				isLoading={isLoading}
				isCreatingEmployee={isCreatingEmployee}
				onCreateEmployee={createEmployee}
				isUpdatingEmployee={isUpdatingEmployee}
				onUpdateEmployee={updateEmployee}
			/>
		</>
	);
}
