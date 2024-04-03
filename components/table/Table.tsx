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

type TableProps<T> = {
	data: T[];
	columns: ColumnDef<T, any>[];
	currentPage: number;
	pageSize: number;
	totalItems: number;
	lastPage: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
};

const Table = <T,>({
	data,
	columns,
	currentPage,
	pageSize,
	totalItems,
	lastPage,
	onPageChange,
	onPageSizeChange,
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
							const direction = header.column.getIsSorted();
							const arrow: any = {
								asc: '🔼',
								desc: '🔽',
							};
							const sort_indicator = direction && arrow[direction];

							return (
								<th key={header.id}>
									{header.isPlaceholder ? null : (
										<div onClick={header.column.getToggleSortingHandler()} className="cursor-pointer flex gap-4">
											{flexRender(header.column.columnDef.header, header.getContext())}
											{direction && <span>{sort_indicator}</span>}
										</div>
									)}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row.id} className="border-b-2 border-base-300 cursor-pointer">
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
				lastPage={lastPage}
			/>
		</div>
	);
};

export default Table;
