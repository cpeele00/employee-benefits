import React from 'react';

interface ISkeletonProps {
	count: number;
	height?: string;
	width?: string;
}

export const Skeleton: React.FC<ISkeletonProps> = ({
	count,
	height = '4.5rem',
	width = 'w-full',
}) => {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					style={{ height }}
					className={`bg-[#e2e2e2] rounded-sm ${width} mb-4 animate-pulse`}
				></div>
			))}
		</>
	);
};
