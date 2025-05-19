import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/ui/card';

interface IBenefitsCardProps {
	title: string;
	text: string | number;
	subtext: string;
	icon: React.ReactNode;
}

export const BenefitsCard: React.FC<IBenefitsCardProps> = ({
	title,
	text,
	subtext,
	icon,
}) => {
	return (
		<Card className='w-full gap-2'>
			<CardHeader className='flex items-center justify-between mb-0'>
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
