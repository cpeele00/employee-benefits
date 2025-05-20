import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import * as TanStackQueryProvider from '../src/integrations/tanstack-query/root-provider.tsx';
import reportWebVitals from './reportWebVitals.ts';
import { ThemeProvider } from './common/components/ThemeProvider.tsx';
import { routeTree } from './routeTree.gen';
import { ErrorBoundary as AppErrorBoundary } from './common/ErrorBoundaries/AppErrorBoundary';
import './styles.css';

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		...TanStackQueryProvider.getContext(),
	},
	defaultPreload: 'intent',
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

// Render the app
const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<AppErrorBoundary>
				<TanStackQueryProvider.Provider>
					<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
						<RouterProvider router={router} />
					</ThemeProvider>
				</TanStackQueryProvider.Provider>
			</AppErrorBoundary>
		</StrictMode>
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
