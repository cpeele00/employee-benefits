import { Dashboard } from '@/features/dashboard/Dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/app/')({
	component: DashboardRoute,
});

function DashboardRoute() {
	return (
		<>
			<Dashboard />
		</>
	);
}
