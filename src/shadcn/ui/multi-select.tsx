import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Badge } from '@/shadcn/ui/badge';
import { Button, buttonVariants } from '@/shadcn/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover';
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
	const [open, setOpen] = React.useState(false);

	const handleUnselect = (item: string) => {
		onChange(selected.filter((i) => i !== item));
	};

	const handleSelect = (value: string) => {
		// Don't allow selecting the same item twice
		if (selected.includes(value)) {
			onChange(selected.filter((i) => i !== value));
		} else {
			onChange([...selected, value]);
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<div
					className={cn(
						buttonVariants({ variant: 'outline' }),
						'w-full justify-between h-auto min-h-10 cursor-pointer'
					)}
					role='combobox'
					aria-expanded={open}
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
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === ' ') {
													e.preventDefault();
													handleUnselect(item);
												}
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
				</div>
			</PopoverTrigger>
			<PopoverContent className='w-full p-0' align='start'>
				<Command>
					<CommandInput placeholder='Search...' />
					<CommandList>
						<CommandEmpty>{emptyMessage}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selected.includes(option.value);
								return (
									<CommandItem
										key={option.value}
										value={option.value}
										onSelect={() => handleSelect(option.value)}
									>
										<div
											className={cn(
												'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
												isSelected
													? 'bg-primary text-primary-foreground'
													: 'opacity-50'
											)}
										>
											{isSelected && <Check className='h-3 w-3' />}
										</div>
										{option.label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
