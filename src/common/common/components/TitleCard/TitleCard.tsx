interface ITitleCardProps {
	title: string;
}

export const TitleCard = ({ title }: ITitleCardProps) => {
	return (
		<div className='p-5 bg-white rounded-lg w-full mb-4'>
			<h3 className='text-lg font-semibold'>{title}</h3>
		</div>
	);
};
