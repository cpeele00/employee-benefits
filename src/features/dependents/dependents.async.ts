import { API_URL } from '@/common/constants/app.constants';
import type { TDependent } from '@/common/types';

export const getAllDependentsAsync = async (): Promise<TDependent[]> => {
	// simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const res: Response = await fetch(`${API_URL}/dependents`);

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	const dependents: TDependent[] = await res.json();

	return dependents;
};

export const getAllDependentsByEmployeeIdAsync = async (
	employeeId: string
): Promise<TDependent[]> => {
	// simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const res: Response = await fetch(`${API_URL}/dependents?employeeId=${employeeId}`);

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	const dependents: TDependent[] = await res.json();

	return dependents;
};

export const getDependentAsync = async (id: string): Promise<TDependent> => {
	const res: Response = await fetch(`${API_URL}/dependents/${id}`);

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	const dependent: TDependent = await res.json();

	return dependent;
};

export const createDependentAsync = async (dependent: TDependent) => {
	// simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const res: Response = await fetch(`${API_URL}/dependents`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dependent),
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return res.json() as Promise<TDependent>;
};

export const updateDependentAsync = async (dependent: TDependent) => {
	// simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const res: Response = await fetch(`${API_URL}/dependents/${dependent.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dependent),
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return res.json() as Promise<TDependent>;
};

export const deleteDependentAsync = async (id: string) => {
	// simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 300));

	const res: Response = await fetch(`${API_URL}/dependents/${id}`, {
		method: 'DELETE',
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return true;
};
