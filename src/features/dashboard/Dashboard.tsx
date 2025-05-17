import { TitleCard } from '../../common/components';
import type { TEmployeeDependent } from './dashboard.types';
import { DashboardTable } from './DashboardTable';
import { Avatar, AvatarGroup } from '../../common/components/Avatar';
import type { TDependent } from '../dependents/dependents.types';

interface IDashboardProps {
	employeesWithDependents: TEmployeeDependent[] | undefined;
	isLoading: boolean;
}

export const DashBoard = ({
	employeesWithDependents = [],
	isLoading = false,
}: IDashboardProps) => {
	return (
		<>
			<TitleCard title='Employees & Dependents' />
			<DashboardTable
				employeesWithDependents={employeesWithDependents}
				isLoading={isLoading}
				renderDependents={(dependents: TDependent[]) => (
					<AvatarGroup max={2}>
						{dependents.map((dependent: TDependent) => (
							<Avatar
								key={dependent.id}
								name={`${dependent.firstName} ${dependent.lastName}`}
							/>
						))}
					</AvatarGroup>
				)}
			/>
		</>
	);
};
