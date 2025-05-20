import { Component, type ReactNode } from 'react';

interface IErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<
	{ children: ReactNode },
	IErrorBoundaryState
> {
	constructor(props: { children: ReactNode }) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: any) {
		console.error('React error boundary caught an error:', error, info);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='error-boundary p-4 m-4 border border-red-500 rounded'>
					<h2 className='text-xl font-bold text-red-500'>
						Oops! Something went wrong...
					</h2>
					<p>
						Please refresh the page or contact support if the issue persists.
					</p>
				</div>
			);
		}
		return this.props.children;
	}
}
