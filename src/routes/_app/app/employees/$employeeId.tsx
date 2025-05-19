import { createFileRoute, useMatch } from '@tanstack/react-router';
import { EmployeeView } from '@/features/employees/EmployeeView';
import { useGetEmployeeByIdQuery } from '@/features/employees/employees.query';

export const Route = createFileRoute('/_app/app/employees/$employeeId')({
	component: EmployeeViewRoute,
});

function EmployeeViewRoute() {
	const { params } = useMatch('/_app/app/employees/$employeeId');
	const { employeeId } = params;
	const { employee } = useGetEmployeeByIdQuery(employeeId);

	return (
		<>
			<EmployeeView employee={employee} />
		</>
	);
}
