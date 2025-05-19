import { createFileRoute, useMatch } from '@tanstack/react-router';
import { EmployeeView } from '@/features/employees/EmployeeView';
import { useGetEmployeeByIdQuery } from '@/features/employees/employees.query';
import { useGetAllDependentsByEmployeeIdQuery } from '@/features/dependents/dependents.query';
import { useDeleteDependent } from '@/features/dependents/depedents.mutation';

export const Route = createFileRoute('/_app/app/employees/$employeeId')({
	component: EmployeeViewRoute,
});

function EmployeeViewRoute() {
	const { params } = useMatch('/app/employees/$employeeId/');
	const { employeeId } = params;
	const { employee, isLoading: isEmployeeLoading } =
		useGetEmployeeByIdQuery(employeeId);

	const {
		dependents,
		isLoading: areDependentsLoading,
		isRefetching,
	} = useGetAllDependentsByEmployeeIdQuery({
		employeeId,
	});

	const { deleteDependent, isPending: isDeletingDependent } = useDeleteDependent();

	return (
		<>
			<EmployeeView
				employee={employee}
				dependents={dependents}
				isRefetching={isRefetching}
				isEmployeeLoading={isEmployeeLoading}
				areDependentsLoading={areDependentsLoading}
				onDeleteDependent={deleteDependent}
				isDeletingDependent={isDeletingDependent}
			/>
		</>
	);
}
