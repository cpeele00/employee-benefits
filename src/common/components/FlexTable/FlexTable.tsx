import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

// Context for column configuration
type ColumnConfig = {
	columns: { id: string; width?: string }[];
};

const FlexTableContext = createContext<ColumnConfig>({ columns: [] });

// Root component
interface FlexTableProps extends React.HTMLAttributes<HTMLDivElement> {
	columns: { id: string; width?: string }[];
}

export const FlexTable = ({ columns, className, children, ...props }: FlexTableProps) => {
	return (
		<FlexTableContext.Provider value={{ columns }}>
			<div className={cn('flex flex-col w-full', className)} {...props}>
				{children}
			</div>
		</FlexTableContext.Provider>
	);
};

// Header component
interface FlexTableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FlexTableHeader = ({
	className,
	children,
	...props
}: FlexTableHeaderProps) => {
	return (
		<div
			className={cn('flex w-full py-3 border-b border-border', className)}
			{...props}
		>
			{children}
		</div>
	);
};

// Header cell component
interface FlexTableHeaderCellProps extends React.HTMLAttributes<HTMLDivElement> {
	column: string;
}

export const FlexTableHeaderCell = ({
	column,
	className,
	children,
	...props
}: FlexTableHeaderCellProps) => {
	const { columns } = useContext(FlexTableContext);
	const columnConfig = columns.find((c) => c.id === column);

	return (
		<div
			className={cn(
				'px-4 font-medium text-muted-foreground text-sm',
				columnConfig?.width || 'flex-1',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

// Body component
interface FlexTableBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FlexTableBody = ({ className, children, ...props }: FlexTableBodyProps) => {
	return (
		<div className={cn('flex flex-col w-full space-y-4 mt-4', className)} {...props}>
			{children}
		</div>
	);
};

// Row component
interface FlexTableRowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FlexTableRow = ({ className, children, ...props }: FlexTableRowProps) => {
	return (
		<div
			className={cn(
				'flex w-full items-center rounded-lg p-4 shadow-sm text-card-foreground',
				'bg-[var(--flex-table-row)]',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

// Cell component
interface FlexTableCellProps extends React.HTMLAttributes<HTMLDivElement> {
	column: string;
}

export const FlexTableCell = ({
	column,
	className,
	children,
	...props
}: FlexTableCellProps) => {
	const { columns } = useContext(FlexTableContext);
	const columnConfig = columns.find((c) => c.id === column);

	return (
		<div
			className={cn('px-4', columnConfig?.width || 'flex-1', className)}
			{...props}
		>
			{children}
		</div>
	);
};
