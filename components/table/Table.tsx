'use client';

import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	SortingState,
	useReactTable,
	ColumnDef,
} from '@tanstack/react-table';
import React from 'react';
import Pagination from './Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

type TableProps<T> = {
	data: T[];
	columns: ColumnDef<T, any>[];
	currentPage: number;
	pageSize: number;
	orderBy: string;
	orderByDesc: boolean;
	totalItems: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
	onOrderChange: (id?: string) => void;
};

const Table = <T,>({
	data,
	columns,
	currentPage,
	pageSize,
	orderBy,
	orderByDesc,
	totalItems,
	onPageChange,
	onPageSizeChange,
	onOrderChange,
}: TableProps<T>) => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting,
		},
		onSortingChange: setSorting,
	});
	const headers = table.getFlatHeaders();
	const rows = table.getRowModel().rows;

	return (
		<div className="overflow-auto h-full">
			<table className="table rounded-lg my-4 w-full">
				<thead className="bg-base-300 rounded-t-lg h-17">
					<tr className="text-base-content text-base font-bold">
						{headers.map((header) => {
							const direction = header.column.columnDef.id === orderBy ? orderByDesc : null;
							let icon = header.column.columnDef.id != 'open' ? faCaretDown : null;

							if (direction != null) {
								icon = direction ? faCaretDown : faCaretUp;
							}

							return (
								<th key={header.id}>
									{header.isPlaceholder ? null : (
										<div
											onClick={() => {
												onOrderChange(header.column.columnDef.id);
											}}
											className={`cursor-pointer flex gap-4 items-center ${
												direction != null ? 'text-base-content' : 'text-base-content/50'
											}`}
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{icon && <FontAwesomeIcon icon={icon} />}
										</div>
									)}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row.id} className="border-b-2 border-base-300">
							{row.getVisibleCells().map((cell) => {
								return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
							})}
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				currentPage={currentPage}
				pageSize={pageSize}
				totalItems={totalItems}
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
				table={table}
			/>
		</div>
	);
};

export default Table;
