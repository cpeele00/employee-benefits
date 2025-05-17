import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/app/employees/')({
	component: EmployeesRoute,
});

function EmployeesRoute() {
	return <div>Hello "/_app/app/employees/"!</div>;
}
