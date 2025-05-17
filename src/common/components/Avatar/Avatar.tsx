import type React from 'react';
import clsx from 'clsx';
import { useGetInitials, useGetRandomColor } from './avatar.hooks';

interface IAvatarProps {
	className?: string;
	name: string;
	size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<IAvatarProps> = ({ className, name, size = 'md' }) => {
	const initials = useGetInitials(name);
	const randomColor = useGetRandomColor();

	return (
		<div
			className={clsx(
				'rounded-full ring-2 ring-gray-300 flex items-center justify-center overflow-hidden',
				randomColor,
				className,
				size === 'sm' && 'h-8 w-8 text-xs',
				size === 'md' && 'h-10 w-10 text-sm',
				size === 'lg' && 'h-12 w-12 text-base'
			)}
		>
			<span className='font-medium text-white'>{initials}</span>
		</div>
	);
};
