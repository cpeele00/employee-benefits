import type React from 'react';
import type { TDependent, TEmployee } from '@/common/types';
import { Avatar } from '@/common/components';
import { Button } from '@/shadcn/ui/button';
import {
	Banknote,
	DollarSign,
	HeartPulse,
	Pencil,
	Trash2,
	UsersRound,
} from 'lucide-react';
import { BenefitsCard } from '@/common/components/BenefitsCard/BenefitsCard';
import { FlexTable } from '@/common/components/FlexTable/FlexTable';
import {
	FlexTableBody,
	FlexTableCell,
	FlexTableRow,
} from '@/common/components/FlexTable/FlexTable';

interface IEmployeeViewProps {
	employee: TEmployee | undefined;
	dependents: TDependent[];
}

export const EmployeeView: React.FC<IEmployeeViewProps> = ({ employee, dependents }) => {
	return (
		<div>
			<section className='flex justify-between items-center mb-4'>
				<div className='flex items-center gap-4'>
					<Avatar
						size='lg'
						name={employee?.firstName + ' ' + employee?.lastName}
					></Avatar>
					<div className='flex flex-col items-start'>
						<h2 className='text-2xl font-bold'>
							{employee?.firstName} {employee?.lastName}
						</h2>
						<span className='text-sm'>Employee ID: {employee?.id}</span>
					</div>
				</div>
				<Button>Add Dependent</Button>
			</section>

			<section className='flex gap-4 mt-10'>
				<BenefitsCard
					title='Base Salary'
					text={`$${2000}`}
					subtext='per paycheck'
					icon={<Banknote className='text-green-600' size={30} />}
				/>
				<BenefitsCard
					title='Benefits Cost'
					text={`$${96.15}`}
					subtext='per paycheck'
					icon={<HeartPulse className='text-red-500' size={30} />}
				/>

				<BenefitsCard
					title='Total Dependents'
					text={2}
					subtext='family members'
					icon={<UsersRound className='text-blue-500' size={30} />}
				/>

				<BenefitsCard
					title='Net Pay'
					text={`$${1033.85}`}
					subtext='per paycheck'
					icon={<DollarSign className='text-yellow-500' size={30} />}
				/>
			</section>

			<section>
				<h2 className='text-2xl font-semibold mt-10'>Dependents</h2>

				<FlexTable
					columns={[
						{ id: 'depdentName', width: 'w-full' },
						{ id: 'cost', width: 'text-right' },
						{ id: 'actions', width: 'text-right' },
					]}
				>
					<FlexTableBody>
						{dependents.map((dependent) => (
							<FlexTableRow key={dependent.id}>
								<FlexTableCell column='depdentName'>
									<div className='flex items-center gap-3'>
										<Avatar
											size='lg'
											name={
												dependent.firstName +
												' ' +
												dependent.lastName
											}
										/>
										{dependent.firstName} {dependent.lastName}
									</div>
								</FlexTableCell>
								<FlexTableCell column='cost' className='text-right'>
									$0
								</FlexTableCell>
								<FlexTableCell column='actions' className='text-right'>
									<div className='flex justify-end space-x-2'>
										<Button
											variant='ghost'
											size='icon'
											className='ml-auto'
										>
											<Pencil className='h-4 w-4' />
											<span className='sr-only'>Edit</span>
										</Button>
										<Button
											variant='ghost'
											size='icon'
											className='ml-auto'
										>
											<Trash2 className='h-4 w-4' />
											<span className='sr-only'>Delete</span>
										</Button>
									</div>
								</FlexTableCell>
							</FlexTableRow>
						))}
					</FlexTableBody>
				</FlexTable>
			</section>
		</div>
	);
};
