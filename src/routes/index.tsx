import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: App,
	beforeLoad: () => {
		// Redirect to the dashboard view
		throw redirect({ to: '/app' });
	},
});

function App() {
	// NOTE: I have plans for an awesome landing page here...time permitting.
	return null;
}
