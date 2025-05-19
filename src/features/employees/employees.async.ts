import { API_URL } from '@/common/constants/app.constants';
import type { TEmployee } from '@/common/types';

export const getAllEmployeesAsync = async (): Promise<TEmployee[]> => {
	// simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const res: Response = await fetch(`${API_URL}/employees`);

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	const employees: TEmployee[] = await res.json();

	return employees;
};

export const getEmployeeAsync = async (id: string): Promise<TEmployee> => {
	const res: Response = await fetch(`${API_URL}/employees/${id}`);

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	const employee: TEmployee = await res.json();

	return employee;
};

export const createEmployeeAsync = async (employee: TEmployee) => {
	// simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 5000));

	const res = await fetch(`${API_URL}/employees`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(employee),
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return res.json() as Promise<TEmployee>;
};

export const updateEmployeeAsync = async (employee: TEmployee) => {
	// simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const res = await fetch(`${API_URL}/employees/${employee.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(employee),
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return res.json() as Promise<TEmployee>;
};

export const deleteEmployeeAsync = async (id: string) => {
	// simulate network latency
	// await new Promise((resolve) => setTimeout(resolve, 1000));

	const res = await fetch(`${API_URL}/employees/${id}`, {
		method: 'DELETE',
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return true;
};
