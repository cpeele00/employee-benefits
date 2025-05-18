import { API_URL } from '@/common/constants/app.constants';
import type { TDependent } from './dependents.types';

export const getAllDependents = async (): Promise<TDependent[]> => {
	// simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const res: Response = await fetch(`${API_URL}/dependents`);

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	const dependents: TDependent[] = await res.json();

	return dependents;
};

export const getDependent = async (id: string): Promise<TDependent> => {
	const res: Response = await fetch(`${API_URL}/dependents/${id}`);

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	const dependent: TDependent = await res.json();

	return dependent;
};

export const createDependent = async (dependent: TDependent) => {
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
