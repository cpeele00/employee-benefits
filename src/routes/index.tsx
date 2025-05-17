import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/shadcn-components/ui/button';

export const Route = createFileRoute('/')({
	component: App,
});

function App() {
	return (
		<div className='text-center'>
			<Button onClick={() => alert('Hello World')}>Hello World</Button>
		</div>
	);
}
