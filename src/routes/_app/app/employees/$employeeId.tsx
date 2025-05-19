import { createFileRoute, useMatch } from '@tanstack/react-router';
import { EmployeeView } from '@/features/employees/EmployeeView';
import { useGetEmployeeByIdQuery } from '@/features/employees/employees.query';
import { useGetAllDependentsByEmployeeIdQuery } from '@/features/dependents/dependents.query';
import {
	useCreateDepedent,
	useDeleteDependent,
} from '@/features/dependents/dependents.mutation';
import { benefitsService } from '@/common/services/benefits.service';

export const Route = createFileRoute('/_app/app/employees/$employeeId')({
	component: EmployeeViewRoute,
});

function EmployeeViewRoute() {
	const { params } = useMatch('/app/employees/$employeeId/');
	const { employeeId } = params;
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
				onCreateDependent={createDependent}
				isCreatingDependent={isCreatingDependent}
				onDeleteDependent={deleteDependent}
				isDeletingDependent={isDeletingDependent}
				baseSalary={benefitsServiceResults.baseSalaryPerPaycheck}
				annualSalary={benefitsServiceResults.annualSalary}
				perPaycheckAmount={benefitsServiceResults.perPaycheckAmount}
				netPayPerPaycheck={benefitsServiceResults.netPayPerPaycheck}
			/>
		</>
	);
}
