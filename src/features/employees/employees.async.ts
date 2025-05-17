import type { TEmployee } from './employees.types';

export const getAllEmployees = async (): Promise<TEmployee[]> => {
	// simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const res: Response = await fetch('http://localhost:3000/employees');

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	const employees: TEmployee[] = await res.json();

	return employees;
};

export const getEmployee = async (id: string): Promise<TEmployee> => {
	const res: Response = await fetch(`http://localhost:3000/employees/${id}`);

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	const employee: TEmployee = await res.json();

	return employee;
};

export const createEmployee = async (employee: TEmployee) => {
	const res = await fetch('http://localhost:3000/employees', {
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
