'use client';

import { Table } from '@tanstack/react-table';
import React from 'react';
import { useTranslations } from 'next-intl';

type Props = {
	table: Table<any>;
	currentPage: number;
	pageSize: number;
	totalItems: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
};

const Pagination = ({ table, currentPage, pageSize, totalItems, onPageChange, onPageSizeChange }: Props) => {
	const t = useTranslations('Pagination');
	const totalPages = Math.ceil(totalItems / pageSize);

	return (
		<div className="my-2">
			<div className="flex flex-row justify-between items-center gap-2">
				<span className="flex items-center gap-1">
					<div>{t('page')}</div>
					<strong>
						{currentPage} {t('of')} {totalPages}
					</strong>
				</span>
				<div className="flex flex-row items-center">
					<span className="flex items-center gap-1">
						<div>{t('goToPage')}:</div>
						<input
							defaultValue={currentPage}
							type="number"
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) : 0;
								if (page > 0 && page <= totalPages) {
									onPageChange(page);
								}
							}}
							className="input input-bordered w-20 input-sm mx-2"
						/>
					</span>
					<select
						value={pageSize}
						onChange={(e) => onPageSizeChange(Number(e.target.value))}
						className="select select-sm select-bordered"
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{t('show', { count: pageSize })}
							</option>
						))}
					</select>
					<div className="join btn-group btn-sm">
						<button className="join-item  btn btn-sm" onClick={() => onPageChange(1)} disabled={currentPage <= 1}>
							{'<<'}
						</button>
						<button
							className="join-item btn btn-sm"
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage <= 1}
						>
							{'<'}
						</button>
						<button
							className="join-item btn btn-sm"
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage >= totalPages}
						>
							{'>'}
						</button>
						<button
							className="join-item btn btn-sm"
							onClick={() => onPageChange(totalPages)}
							disabled={currentPage >= totalPages}
						>
							{'>>'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
