import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Badge } from '@/shadcn/ui/badge';
import { buttonVariants } from '@/shadcn/ui/button';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
	options: { label: string; value: string }[];
	selected: string[];
	onChange: (selected: string[]) => void;
	placeholder?: string;
	emptyMessage?: string;
}

export function MultiSelect({
	options,
	selected,
	onChange,
	placeholder = 'Select options',
	emptyMessage = 'No options found.',
}: MultiSelectProps) {
	// Use a ref for the dropdown element
	const dropdownRef = React.useRef<HTMLDivElement>(null);
	const [open, setOpen] = React.useState(false);

	// Close dropdown when clicking outside
	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	const handleUnselect = (item: string) => {
		onChange(selected.filter((i) => i !== item));
	};

	const handleSelect = (value: string) => {
		// Update selection without closing dropdown
		if (selected.includes(value)) {
			onChange(selected.filter((i) => i !== value));
		} else {
			onChange([...selected, value]);
		}
		// Don't close the dropdown
	};

	return (
		<div className='relative w-full' ref={dropdownRef}>
			{/* Trigger button */}
			<button
				type='button'
				onClick={() => setOpen(!open)}
				className={cn(
					buttonVariants({ variant: 'outline' }),
					'w-full justify-between h-auto min-h-10 cursor-pointer'
				)}
			>
				<div className='flex flex-wrap gap-1 py-1'>
					{selected.length > 0 ? (
						selected.map((item) => {
							const option = options.find((o) => o.value === item);
							return (
								<Badge
									key={item}
									variant='secondary'
									className='rounded-sm px-1 font-normal'
								>
									{option?.label}
									<span
										role='button'
										tabIndex={0}
										className='ml-1 rounded-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer'
										onClick={(e) => {
											e.stopPropagation();
											handleUnselect(item);
										}}
									>
										<X className='h-3 w-3' />
										<span className='sr-only'>Remove</span>
									</span>
								</Badge>
							);
						})
					) : (
						<span className='text-muted-foreground'>{placeholder}</span>
					)}
				</div>
				<ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
			</button>

			{/* Dropdown content */}
			{open && (
				<div className='absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md'>
					<div className='p-2'>
						<input
							type='text'
							placeholder='Search...'
							className='w-full p-2 border rounded-md mb-2'
						/>
						<div className='max-h-60 overflow-auto'>
							{options.length === 0 ? (
								<div className='p-2 text-center text-muted-foreground'>
									{emptyMessage}
								</div>
							) : (
								options.map((option) => {
									const isSelected = selected.includes(option.value);
									return (
										<div
											key={option.value}
											className='flex items-center p-2 cursor-pointer hover:bg-accent rounded-md'
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												handleSelect(option.value);
											}}
										>
											<div
												className={cn(
													'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
													isSelected
														? 'bg-primary text-primary-foreground'
														: 'opacity-50'
												)}
											>
												{isSelected && (
													<Check className='h-3 w-3' />
												)}
											</div>
											{option.label}
										</div>
									);
								})
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
