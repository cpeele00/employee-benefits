import { Skeleton } from '@/shadcn/ui/skeleton';

interface ISkeletonRowProps {
	count?: number;
}

export function SkeletonRow({ count = 1 }: ISkeletonRowProps) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<Skeleton
					key={index}
					className='h-[90px] w-full rounded-xl mb-4 bg-[#e2e2e2] dark:bg-[var(--accent)]'
				/>
			))}
		</>
	);
}
