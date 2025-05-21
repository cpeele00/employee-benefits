import { createFileRoute } from '@tanstack/react-router';
import { EmployeeView } from '@/features/employees/EmployeeView';
import { useGetEmployeeByIdQuery } from '@/features/employees/employees.query';
import { useGetAllDependentsByEmployeeIdQuery } from '@/features/dependents/dependents.query';
import {
	useCreateDepedent,
	useDeleteDependent,
	useUpdateDependent,
} from '@/features/dependents/dependents.mutation';
import { benefitsService } from '@/common/services/benefits.service';

/* 
 	Set up the route for the employee view.
*/
export const Route = createFileRoute('/_app/app/employees/$employeeId')({
	component: EmployeeViewRoute,
});

/* NOTE: This is a container component.
	 The React Container pattern is a way to keep your components clean and organized by separating concerns.
	 It splits components into two types: containers, which handle the logic like fetching data, managing state, and routing,
	 and presentational components, which just focus on displaying the UI.
	 
	 This allows us to decouple the UI from the data fetching, state management, and routing, 
	 making it easier to test and maintain.
*/
function EmployeeViewRoute() {
	const { employeeId } = Route.useParams();

	const { employee, isLoading: isEmployeeLoading } =
		useGetEmployeeByIdQuery(employeeId);

	const {
		dependents,
		isLoading: areDependentsLoading,
		isRefetching,
	} = useGetAllDependentsByEmployeeIdQuery({
		employeeId,
	});

	const { createDependent, isPending: isCreatingDependent } = useCreateDepedent();
	const { updateDependent, isPending: isUpdatingDependent } = useUpdateDependent();
	const { deleteDependent, isPending: isDeletingDependent } = useDeleteDependent();

	const benefitsServiceResults = benefitsService.calculateEmployeeBenefitsCost({
		employee: employee || null,
		dependents,
	});

	if (!employeeId) {
		return <div>Employee not found</div>;
	}

	return (
		<>
			<EmployeeView
				employee={employee || null}
				dependents={dependents}
				isRefetching={isRefetching}
				isEmployeeLoading={isEmployeeLoading}
				areDependentsLoading={areDependentsLoading}
				isCreatingDependent={isCreatingDependent}
				isUpdatingDependent={isUpdatingDependent}
				isDeletingDependent={isDeletingDependent}
				baseSalary={benefitsServiceResults.baseSalaryPerPaycheck}
				annualSalary={benefitsServiceResults.annualSalary}
				perPaycheckAmount={benefitsServiceResults.perPaycheckAmount}
				netPayPerPaycheck={benefitsServiceResults.netPayPerPaycheck}
				onCreateDependent={createDependent}
				onUpdateDependent={updateDependent}
				onDeleteDependent={deleteDependent}
			/>
		</>
	);
}
