import { Dashboard } from '@/features/dashboard/Dashboard';
import { useGetAllEmployeesWithDependentsQuery } from '@/features/dashboard/dashboard.query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/app/')({
	component: DashboardRoute,
});

function DashboardRoute() {
	const { employeesWithDependents, isLoading } =
		useGetAllEmployeesWithDependentsQuery();

	return (
		<>
			<Dashboard
				employeesWithDependents={employeesWithDependents}
				isLoading={isLoading}
			/>
		</>
	);
}
