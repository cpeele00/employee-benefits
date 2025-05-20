import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: App,
	beforeLoad: () => {
		// Redirect to the dashboard view
		throw redirect({ to: '/app' });
	},
});

function App() {
	// This won't be rendered due to the redirect
	return null;
}
