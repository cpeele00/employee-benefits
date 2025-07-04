import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/ui/card';

interface IBenefitsCardProps {
	title: string;
	text: string | number;
	subtext: string;
	icon: React.ReactNode;
}

const BenefitsCardComponent: React.FC<IBenefitsCardProps> = ({
	title,
	text,
	subtext,
	icon,
}) => {
	return (
		<Card className='w-full gap-2 bg-[var(--flex-table-row)] shadow-sm'>
			<CardHeader className='flex items-center justify-between mb-0 '>
				<CardTitle>{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<h3 className='text-3xl font-bold mt-0'>{text}</h3>
				<span>{subtext}</span>
			</CardContent>
		</Card>
	);
};

const BenefitsCard = memo(BenefitsCardComponent);

export { BenefitsCard };
