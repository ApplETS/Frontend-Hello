import { Table } from '@tanstack/react-table';
import React from 'react';
import { useTranslations } from 'next-intl';

type Props = {
	table: Table<any>;
};

const Pagination = ({ table }: Props) => {
	const t = useTranslations('Pagination');
	const state = table.getState().pagination;
	const goLastPage = () => table.setPageIndex(table.getPageCount() - 1);

	return (
		<div className="my-2">
			<div className="flex items-center gap-2">
				<div className="btn-group btn-sm">
					<button className="btn btn-sm" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
						{'<<'}
					</button>
					<button className="btn btn-sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						{'<'}
					</button>
					<button className="btn btn-sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						{'>'}
					</button>
					<button className="btn btn-sm" onClick={goLastPage} disabled={!table.getCanNextPage()}>
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
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
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
