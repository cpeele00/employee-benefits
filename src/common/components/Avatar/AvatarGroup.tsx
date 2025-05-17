import React, { type ReactElement } from 'react';
import { Avatar } from './Avatar';
import clsx from 'clsx';

interface IAvatarGroupProps {
	max: number;
	children: ReactElement<typeof Avatar> | ReactElement<typeof Avatar>[];
}

const AvatarCounter = ({ count }: { count: number }) => {
	return (
		<div className='rounded-full h-10 w-10 ring-2 ring-gray-300 flex items-center justify-center overflow-hidden bg-gray-500'>
			<span className='font-medium text-white'>+{count}</span>
		</div>
	);
};

export const AvatarGroup: React.FC<IAvatarGroupProps> = ({ max = 4, children }) => {
	// Get an array of children (exclude falsy values)
	const childrenArray = React.Children.toArray(children).filter(Boolean);

	// Validate that all children are Avatar components
	React.Children.forEach(children, (child) => {
		if (React.isValidElement(child) && child.type !== Avatar) {
			throw new Error('Invalid child type. Expected Avatar component.');
		}
	});

	const visibleAvatars = childrenArray.slice(0, max);
	const extraAvatarCount = childrenArray.length - max;

	return (
		<div className='relative flex items-center group hover:space-x-1'>
			{visibleAvatars.map((child, i) => (
				<div
					key={i}
					className={clsx(
						'transition-all duration-200 ease-in-out',
						i !== 0 && '-ml-4 group-hover:ml-0'
					)}
				>
					{React.cloneElement(child as ReactElement)}
				</div>
			))}
			{extraAvatarCount > 0 && (
				<div className='-ml-4 group-hover:ml-0 transition-all duration-200 ease-in-out'>
					<AvatarCounter count={extraAvatarCount} />
				</div>
			)}
		</div>
	);
};
