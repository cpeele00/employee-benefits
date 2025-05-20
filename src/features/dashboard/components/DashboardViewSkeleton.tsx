import { SkeletonCard, SkeletonRow } from '@/common/components';

export const DashboardViewSkeleton = () => {
	return (
		<>
			<SkeletonRow count={1} />

			<section className='flex gap-4 mt-10'>
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
