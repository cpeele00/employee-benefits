import { Skeleton } from '@/shadcn/ui/skeleton';

export function SkeletonCard() {
	return (
		<Skeleton className='h-[125px] w-full rounded-xl bg-[#e2e2e2] dark:bg-[var(--accent)]' />
	);
}
