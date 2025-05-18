import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function LayoutAddition() {
	return (
		<div className='left-0' style={{ position: 'relative', top: '-50px' }}>
			<ReactQueryDevtools buttonPosition='bottom-left' />
		</div>
	);
}
