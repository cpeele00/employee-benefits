import { DashboardView } from '@/features/dashboard/DashboardView';
import { useGetAllEmployeesWithDependentsQuery } from '@/features/dashboard/dashboard.query';
import {
	useCreateEmployee,
	useDeleteEmployee,
	useUpdateEmployee,
} from '@/features/employees/employees.mutation';
import { createFileRoute } from '@tanstack/react-router';
import { benefitsService } from '@/common/services/benefits.service';

/* 
 	Set up the route for the dashboard view.
*/
export const Route = createFileRoute('/_app/app/')({
	component: DashboardRoute,
});

/* NOTE: This is a container component.
	 The React Container pattern is a way to keep your components clean and organized by separating concerns.
	 It splits components into two types: containers, which handle the logic like fetching data, managing state, and routing,
	 and presentational components, which just focus on displaying the UI.
	 
	 This allows us to decouple the UI from the data fetching, state management, and routing, 
	 making it easier to test and maintain.
*/
function DashboardRoute() {
	const { employeesWithDependents, isLoading, isRefetching } =
		useGetAllEmployeesWithDependentsQuery();

	const { createEmployee, isPending: isCreatingEmployee } = useCreateEmployee();

	const { updateEmployee, isPending: isUpdatingEmployee } = useUpdateEmployee();

	const { deleteEmployee, isPending: isDeletingEmployee } = useDeleteEmployee();

	const { totalBenefitsCost, totalDependents, totalEmployees } =
		benefitsService.calculateTotalEmployeeBenefitsCost(employeesWithDependents || []);

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
				totalBenefitsCost={totalBenefitsCost}
				totalDependents={totalDependents}
				totalEmployees={totalEmployees}
			/>
		</>
	);
}
