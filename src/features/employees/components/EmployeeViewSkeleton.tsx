import { SkeletonCard, SkeletonRow } from '@/common/components';
import { Skeleton } from '@/shadcn/ui/skeleton';

export const EmployeeViewSkeleton = () => {
	return (
		<>
			<div className='flex items-center space-x-4'>
				<Skeleton className='h-12 w-12 rounded-full bg-[#e2e2e2] dark:bg-[var(--accent)]' />
				<div className='space-y-2'>
					<Skeleton className='h-4 w-[250px] bg-[#e2e2e2] dark:bg-[var(--accent)]' />
					<Skeleton className='h-4 w-[200px] bg-[#e2e2e2] dark:bg-[var(--accent)]' />
				</div>
			</div>
			<section className='flex gap-4 mt-10'>
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</section>

			<section className='flex flex-col gap-1 mt-30'>
				<SkeletonRow count={3} />
			</section>
		</>
	);
};
