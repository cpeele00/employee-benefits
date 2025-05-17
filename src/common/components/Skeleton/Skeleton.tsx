interface ISkeletonProps {
	count: number;
	height?: string;
	width?: string;
}

export const Skeleton: React.FC<ISkeletonProps> = ({ count, height = '3.8rem', width = 'w-full' }) => {
	return (
		<div role='status' className='w-full animate-pulse'>
			{Array.from({ length: count }).map(() => (
				<div className={`h-[${height}] bg-[#e2e2e2] rounded-sm ${width} mb-4`}></div>
			))}
		</div>
	);
};
