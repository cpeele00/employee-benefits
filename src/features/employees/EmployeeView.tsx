import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
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
import { EmployeeViewSkeleton } from './components/EmployeeViewSkeleton';
import { Badge } from '@/shadcn/ui/badge';
import { toast } from 'sonner';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/shadcn/ui/dialog';
import { ZeroState } from '@/common/components/ZeroState/ZeroState';

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

// Lazy load the AddDependentDrawer
const AddDependentDrawer = lazy(
	() =>
		import(
			/* @vite-chunk: "add-dependent-drawer" */ '../dependents/components/AddDependentDrawer'
		)
);

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

	const [isDeleteDependentDialogOpen, setIsDeleteDependentDialogOpen] =
		useState<boolean>(false);

	const [selectedDependent, setSelectedDependent] = useState<TDependent | null>(null);
	const [selectedDependentToDelete, setSelectedDependentToDelete] =
		useState<TDependent | null>(null);

	const isPending =
		isRefetching || isDeletingDependent || isUpdatingDependent || isCreatingDependent;

	useEffect(() => {
		// Open the dialog when a dependent is selected.
		// This ensures the value is set before opening the dialog.
		if (selectedDependentToDelete) {
			setIsDeleteDependentDialogOpen(true);
		}
	}, [selectedDependentToDelete]);

	const handleCreateSuccess = () => {
		setIsAddDependentDrawerOpen(false);
		setSelectedDependent(null);
		toast.success('Dependent created successfully!');
	};

	const handleUpdateSuccess = () => {
		setIsAddDependentDrawerOpen(false);
		setSelectedDependent(null);
		toast.success('Dependent updated successfully!');
	};

	const handleCreateFailure = () => {
		toast.error('Failed to create dependent. Please try again.');
	};

	const handleUpdateFailure = () => {
		toast.error('Failed to update dependent. Please try again.');
	};

	const handleDeleteSuccess = () => {
		setIsDeleteDependentDialogOpen(false);
		setSelectedDependentToDelete(null);
		setSelectedDependent(null);
		toast.success('Dependent deleted successfully!');
	};

	const handleDeleteFailure = () => {
		toast.error('Failed to delete dependent. Please try again.');
	};

	const handleDeleteDependent = useCallback(() => {
		if (selectedDependentToDelete?.id) {
			onDeleteDependent(selectedDependentToDelete?.id)
				.then(() => {
					handleDeleteSuccess();
				})
				.catch((err: unknown) => {
					if (err instanceof Error) {
						console.error(err.message);
						handleDeleteFailure();
					} else {
						handleDeleteFailure();
					}
				});
		}
	}, [onDeleteDependent, selectedDependentToDelete]);

	const handleSaveDependent = useCallback(
		(dependent: TDependent) => {
			if (dependent.id) {
				return onUpdateDependent(dependent)
					.then(() => {
						handleUpdateSuccess();
					})
					.catch((err: unknown) => {
						if (err instanceof Error) {
							console.error(err.message);
							handleUpdateFailure();
						} else {
							console.error(err);
							handleUpdateFailure();
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
							handleCreateFailure();
						} else {
							console.error(err);
							handleCreateFailure();
						}
					});
			}
		},
		[onCreateDependent, onUpdateDependent]
	);

	const employeeBenefitsCosts = {
		baseSalaryPerPaycheck: baseSalary,
		annualSalary: annualSalary,
		perPaycheckAmount: perPaycheckAmount,
		netPayPerPaycheck: netPayPerPaycheck,
	};

	return (
		<>
			{isEmployeeLoading || areDependentsLoading ? (
				<EmployeeViewSkeleton />
			) : (
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
								<span className='text-sm text-muted-foreground'>
									Employee ID: {employee?.id}
								</span>
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

						{dependents?.length === 0 ? (
							<ZeroState
								title='No Dependents'
								description='This employee has no dependents.'
								actionLabel='Add Dependent'
								icon={<UsersRound size={48} className='text-blue-500' />}
								onAction={() => {
									setIsAddDependentDrawerOpen(true);
								}}
							/>
						) : (
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
													<div className='flex flex-col gap-0'>
														<h3 className='text-md font-medium mb-0 capitalize'>
															{dependent.firstName}{' '}
															{dependent.lastName}
														</h3>
														<span className='text-sm text-muted-foreground capitalize'>
															{dependent.relationship}
														</span>
													</div>
												</div>
											</FlexTableCell>
											<FlexTableCell
												column='cost'
												className='text-right'
											>
												{/* $0 */}
											</FlexTableCell>
											<FlexTableCell
												column='actions'
												className='text-right'
											>
												<div className='flex justify-end space-x-2 items-center'>
													{dependent.firstName
														.toLocaleLowerCase()
														.startsWith('a') && (
														<Badge
															variant='outline'
															className='text-green-600 border-green-600 text-xs rounded-3xl h-6 bg-green-300'
														>
															10% Discount Applied
														</Badge>
													)}

													<Button
														variant='ghost'
														size='icon'
														className='ml-auto'
														disabled={isPending}
														onClick={() => {
															setSelectedDependent(
																dependent
															);
															setIsAddDependentDrawerOpen(
																true
															);
														}}
													>
														<Pencil className='h-4 w-4' />
														<span className='sr-only'>
															Edit
														</span>
													</Button>
													<Button
														variant='ghost'
														size='icon'
														className='ml-auto'
														disabled={isPending}
														onClick={() => {
															if (dependent.id) {
																setSelectedDependentToDelete(
																	dependent
																);
															}
														}}
													>
														<Trash2 className='h-4 w-4' />
														<span className='sr-only'>
															Delete
														</span>
													</Button>
												</div>
											</FlexTableCell>
										</FlexTableRow>
									))}
								</FlexTableBody>
							</FlexTable>
						)}
					</section>
					<Dialog
						open={isDeleteDependentDialogOpen}
						onOpenChange={() => {
							setSelectedDependentToDelete(null);
							setIsDeleteDependentDialogOpen(false);
						}}
					>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Delete {selectedDependentToDelete?.firstName}{' '}
									{selectedDependentToDelete?.lastName}?
								</DialogTitle>
								<DialogDescription>
									Are you sure you want to delete this dependent?
								</DialogDescription>
								<DialogDescription>
									This action cannot be undone. This will permanently
									delete the dependent.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<div className='flex justify-end gap-2 mt-8'>
									<Button
										type='button'
										variant='secondary'
										onClick={() => {
											setIsDeleteDependentDialogOpen(false);
										}}
									>
										Cancel
									</Button>
									<Button
										type='button'
										variant='default'
										onClick={handleDeleteDependent}
									>
										Delete
									</Button>
								</div>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</>
			)}

			{createPortal(
				<Suspense fallback={<div>Loading...</div>}>
					<AddDependentDrawer
						isOpen={isAddDependentDrawerOpen && !!employee}
						employeeId={employee?.id ?? ''}
						dependent={selectedDependent || null}
						isPending={isPending}
						onClose={() => {
							setIsAddDependentDrawerOpen(false);
							setSelectedDependent(null);
						}}
						onSave={(dependent: TDependent) => handleSaveDependent(dependent)}
					/>
				</Suspense>,
				document.body
			)}
		</>
	);
};
