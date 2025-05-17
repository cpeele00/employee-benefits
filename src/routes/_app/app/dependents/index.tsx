import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/app/dependents/')({
	component: DependentsRoute,
});

function DependentsRoute() {
	return <div>Hello "/_app/app/dependents/"!</div>;
}
