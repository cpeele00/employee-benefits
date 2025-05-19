import type React from 'react';
import type { TEmployee } from '@/common/types';

interface IEmployeeViewProps {
	employee: TEmployee | undefined;
}

export const EmployeeView: React.FC<IEmployeeViewProps> = ({ employee }) => {
	return <div>Hello {employee?.firstName}!</div>;
};
