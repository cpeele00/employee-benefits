interface ITitleCardProps {
	title: string;
}

export const TitleCard = ({ title }: ITitleCardProps) => {
	return (
		<div className='p-5 rounded-lg w-full mb-4 bg-[var(--flex-table-row)] shadow-sm text-card-foreground'>
			<h3 className='text-lg font-semibold'>{title}</h3>
		</div>
	);
};
