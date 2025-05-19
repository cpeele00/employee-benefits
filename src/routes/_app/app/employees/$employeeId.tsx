import { createFileRoute, useMatch } from '@tanstack/react-router';
import { EmployeeView } from '@/features/employees/EmployeeView';
import { useGetEmployeeByIdQuery } from '@/features/employees/employees.query';
import { useGetAllDependentsByEmployeeIdQuery } from '@/features/dependents/dependents.query';

export const Route = createFileRoute('/_app/app/employees/$employeeId')({
	component: EmployeeViewRoute,
});

function EmployeeViewRoute() {
	const { params } = useMatch('/app/employees/$employeeId/');
	const { employeeId } = params;
	const { employee } = useGetEmployeeByIdQuery(employeeId);
	const { dependents } = useGetAllDependentsByEmployeeIdQuery({ employeeId });

	return (
		<>
			<EmployeeView employee={employee} dependents={dependents} />
		</>
	);
}
