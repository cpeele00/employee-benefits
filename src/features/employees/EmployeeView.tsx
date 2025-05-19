import React, { useState } from 'react';
import type { TDependent, TEmployee } from '@/common/types';
import { Avatar } from '@/common/components';
import { Button } from '@/shadcn/ui/button';
import {
	Banknote,
	DollarSign,
	HeartPulse,
	Plus,
	Pencil,
	Trash2,
	UsersRound,
} from 'lucide-react';
import { BenefitsCard } from '@/common/components';
import {
	FlexTable,
	FlexTableBody,
	FlexTableCell,
	FlexTableRow,
} from '@/common/components/FlexTable/FlexTable';
import { CircularProgress } from '@/common/components/CircularProgress/CircularProgress';
import { createPortal } from 'react-dom';
import { AddDependentDrawer } from '../dependents/components/AddDependentDrawer';

interface IEmployeeViewProps {
	employee: TEmployee | null;
	dependents?: TDependent[];
	isEmployeeLoading: boolean;
	areDependentsLoading: boolean;
	isRefetching: boolean;
	isCreatingDependent: boolean;
	isUpdatingDependent: boolean;
	isDeletingDependent: boolean;
	baseSalary: number;
	annualSalary: number;
	perPaycheckAmount: number;
	netPayPerPaycheck: number;
	onDeleteDependent: (id: string) => Promise<boolean>;
	onCreateDependent: (dependent: TDependent) => Promise<TDependent>;
	onUpdateDependent: (dependent: TDependent) => Promise<TDependent>;
}

export const EmployeeView: React.FC<IEmployeeViewProps> = ({
	employee,
	dependents,
	isEmployeeLoading,
	areDependentsLoading,
	isRefetching,
	isDeletingDependent,
	isCreatingDependent,
	isUpdatingDependent,
	baseSalary,
	annualSalary,
	perPaycheckAmount,
	netPayPerPaycheck,
	onCreateDependent,
	onUpdateDependent,
	onDeleteDependent,
}) => {
	const [isAddDependentDrawerOpen, setIsAddDependentDrawerOpen] =
		useState<boolean>(false);

	const [selectedDependent, setSelectedDependent] = useState<TDependent | null>(null);

	const isPending =
		isRefetching || isDeletingDependent || isUpdatingDependent || isCreatingDependent;

	const handleCreateSuccess = () => {
		// Close the drawer
		setIsAddDependentDrawerOpen(false);
		setSelectedDependent(null);
	};

	const handleUpdateSuccess = () => {
		// Close the drawer
		setIsAddDependentDrawerOpen(false);
		setSelectedDependent(null);
	};

	const employeeBenefitsCosts = {
		baseSalaryPerPaycheck: baseSalary,
		annualSalary: annualSalary,
		perPaycheckAmount: perPaycheckAmount,
		netPayPerPaycheck: netPayPerPaycheck,
	};

	return (
		<>
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
			</section>

			<section className='flex gap-4 mt-10'>
				<BenefitsCard
					title='Base Salary'
					text={employeeBenefitsCosts.baseSalaryPerPaycheck.toLocaleString(
						'en-US',
						{
							style: 'currency',
							currency: 'USD',
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}
					)}
					subtext='per paycheck'
					icon={<Banknote className='text-green-600' size={30} />}
				/>
				<BenefitsCard
					title='Benefits Cost'
					text={employeeBenefitsCosts.perPaycheckAmount.toLocaleString(
						'en-US',
						{
							style: 'currency',
							currency: 'USD',
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}
					)}
					subtext='per paycheck'
					icon={<HeartPulse className='text-red-500' size={30} />}
				/>

				<BenefitsCard
					title='Total Dependents'
					text={dependents?.length || 0}
					subtext='family members'
					icon={<UsersRound className='text-blue-500' size={30} />}
				/>

				<BenefitsCard
					title='Net Pay'
					text={employeeBenefitsCosts.netPayPerPaycheck.toLocaleString(
						'en-US',
						{
							style: 'currency',
							currency: 'USD',
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}
					)}
					subtext='per paycheck'
					icon={<DollarSign className='text-yellow-500' size={30} />}
				/>
			</section>

			<section>
				<div className='flex justify-between items-center w-full mb-2 mt-12'>
					{isPending ? <CircularProgress /> : <div></div>}
					<Button
						className='flex items-center gap-1'
						disabled={isPending || areDependentsLoading}
						onClick={() => {
							setIsAddDependentDrawerOpen(true);
						}}
					>
						<Plus />
						Add Dependent
					</Button>
				</div>

				<FlexTable
					columns={[
						{ id: 'depdentName', width: 'w-full' },
						{ id: 'cost', width: 'text-right' },
						{ id: 'actions', width: 'text-right' },
					]}
				>
					<FlexTableBody>
						{dependents?.map((dependent) => (
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
									{/* $0 */}
								</FlexTableCell>
								<FlexTableCell column='actions' className='text-right'>
									<div className='flex justify-end space-x-2'>
										<Button
											variant='ghost'
											size='icon'
											className='ml-auto'
											disabled={isPending}
											onClick={() => {
												setSelectedDependent(dependent);
												setIsAddDependentDrawerOpen(true);
											}}
										>
											<Pencil className='h-4 w-4' />
											<span className='sr-only'>Edit</span>
										</Button>
										<Button
											variant='ghost'
											size='icon'
											className='ml-auto'
											disabled={isPending}
											onClick={() => {
												if (dependent.id) {
													onDeleteDependent(dependent.id);
												}
											}}
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

			{createPortal(
				<AddDependentDrawer
					isOpen={isAddDependentDrawerOpen && !!employee}
					employeeId={employee?.id ?? ''}
					dependent={selectedDependent || null}
					isPending={isPending}
					onClose={() => {
						setIsAddDependentDrawerOpen(false);
						setSelectedDependent(null);
					}}
					onSave={(dependent: TDependent) => {
						if (dependent.id) {
							return onUpdateDependent(dependent)
								.then(() => {
									handleUpdateSuccess();
								})
								.catch((err: unknown) => {
									if (err instanceof Error) {
										console.error(err.message);
									} else {
										console.error(err);
									}
								});
						} else {
							return onCreateDependent(dependent)
								.then(() => {
									handleCreateSuccess();
								})
								.catch((err: unknown) => {
									if (err instanceof Error) {
										console.error(err.message);
									} else {
										console.error(err);
									}
								});
						}
					}}
				/>,
				document.body
			)}
		</>
	);
};
