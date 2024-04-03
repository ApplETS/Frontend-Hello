'use client';

import { Table } from '@tanstack/react-table';
import React from 'react';
import { useTranslations } from 'next-intl';

type Props = {
	table: Table<any>;
	currentPage: number;
	pageSize: number;
	totalItems: number;
	lastPage: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
};

const Pagination = ({ table, currentPage, pageSize, totalItems, onPageChange, lastPage, onPageSizeChange }: Props) => {
	const t = useTranslations('Pagination');
	const state = table.getState().pagination;
	const totalPages = Math.ceil(totalItems / pageSize);

	return (
		<div className="my-2">
			<div className="flex items-center gap-2">
				<div className="btn-group btn-sm">
					<button className="btn btn-sm" onClick={() => onPageChange(1)} disabled={!table.getCanPreviousPage()}>
						{'<<'}
					</button>
					<button className="btn btn-sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
						{'<'}
					</button>
					<button
						className="btn btn-sm"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage >= totalPages}
					>
						{'>'}
					</button>
					<button className="btn btn-sm" onClick={() => onPageChange(lastPage)} disabled={currentPage >= totalPages}>
						{'>>'}
					</button>
				</div>
				<span className="flex items-center gap-1">
					<div>{t('page')}</div>
					<strong>
						{state.pageIndex + 1} {t('of')} {table.getPageCount()}
					</strong>
				</span>
				<span className="flex items-center gap-1">
					<div>{t('goToPage')}:</div>
					<input
						defaultValue={state.pageIndex + 1}
						type="number"
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
						className="input input-bordered w-20 input-sm mx-2"
					/>
				</span>
				<select
					value={state.pageSize}
					onChange={(e) => onPageSizeChange(Number(e.target.value))}
					className="select select-sm select-bordered"
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							{t('show', { count: pageSize })}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Pagination;
