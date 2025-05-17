import { useMemo } from 'react';

export const useGetInitials = (name?: string) => {
	// If name is provided, use the first letter of each word
	if (name && name.length) {
		const initials = name
			.split(' ')
			.map((i) => i[0])
			.join('')
			.toUpperCase();

		return initials;
	}

	// If no name is provided, generate a random double letter
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const randomIndex = Math.floor(Math.random() * alphabet.length);
	const randomLetter = alphabet[randomIndex];

	return randomLetter + randomLetter;
};

export const useGetRandomColor = () => {
	// We don't want the color to change on every re-render
	return useMemo(() => {
		const avatarColors = [
			'bg-red-500',
			'bg-orange-500',
			'bg-yellow-500',
			'bg-green-500',
			'bg-teal-500',
			'bg-blue-500',
			'bg-indigo-500',
			'bg-purple-500',
			'bg-pink-500',
		];

		const randomColorIndex = Math.floor(Math.random() * avatarColors.length);
		const randomColor = avatarColors[randomColorIndex];

		return randomColor;
	}, []);
};
