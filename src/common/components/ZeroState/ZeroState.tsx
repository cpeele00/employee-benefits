import React from 'react';
import { FileX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/shadcn/ui/button';

interface ZeroStateProps {
	title?: string;
	description?: string;
	icon?: React.ReactNode;
	actionLabel?: string;
	onAction?: () => void;
	className?: string;
}

export function ZeroState({
	title = 'No records found',
	description = 'There are no items to display at this time.',
	icon = <FileX size={48} />,
	actionLabel,
	onAction,
	className,
}: ZeroStateProps) {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20',
				className
			)}
		>
			<div className='text-muted-foreground mb-4'>{icon}</div>
			<h3 className='text-lg font-medium mb-2'>{title}</h3>
			<p className='text-muted-foreground max-w-md mb-6'>{description}</p>
			{actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
		</div>
	);
}
