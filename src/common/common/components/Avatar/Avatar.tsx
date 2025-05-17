import type React from 'react';
import clsx from 'clsx';
import { useGetInitials, useGetRandomColor } from './avatar.hooks';

interface IAvatarProps {
	className?: string;
	name: string;
}

export const Avatar: React.FC<IAvatarProps> = ({ className, name }) => {
	const initials = useGetInitials(name);
	const randomColor = useGetRandomColor();

	return (
		<div
			className={clsx(
				'rounded-full h-10 w-10 ring-2 ring-gray-300 flex items-center justify-center overflow-hidden',
				randomColor,
				className
			)}
		>
			<span className='font-medium text-white'>{initials}</span>
		</div>
	);
};
