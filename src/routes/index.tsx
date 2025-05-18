import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/shadcn/ui/button';

export const Route = createFileRoute('/')({
	component: App,
});

function App() {
	return (
		<div className='text-center'>
			<h1>Landing Page</h1>
			<Button onClick={() => alert('Hello World')}>Hello World</Button>
		</div>
	);
}
