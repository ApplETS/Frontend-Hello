'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { formatDate } from '@/utils/formatDate';
import { HelloEvent } from '@/models/hello-event';
import Constants from '@/utils/constants';
import Avatar from '@/components/Avatar';

const columnHelper = createColumnHelper<HelloEvent>();

export const createApprobationColumnDefs = (
	t: (key: string) => string,
	locale: string,
	openModal: (event: HelloEvent) => void
): ColumnDef<HelloEvent, any>[] => {
	return [
		columnHelper.accessor((row) => row.organizer, {
			id: 'author',
			header: () => t('table.author'),
			cell: (info) => (
				<div className="text-base flex items-center space-x-2">
					<div className="avatar mr-3">
						<Avatar userProfile={info.getValue()} size="w-10 h-10" textSize="text-xl" color="bg-base-300" />
					</div>
					<div>
						<div>{info.getValue()?.organization}</div>
						<div className="text-secondary">{info.getValue()?.activityArea}</div>
					</div>
				</div>
			),
		}),
		columnHelper.accessor('title', {
			header: () => t('table.title'),
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('publicationDate', {
			header: () => t('table.release-date'),
			cell: (info) => formatDate(new Date(info.getValue()), locale),
		}),
		columnHelper.accessor('state', {
			header: () => t('table.status'),
			cell: (info) => (
				<div
					className={`py-4 px-4 badge ${Constants.newsStatuses[info.getValue()].color || 'badge-neutral'} text-black`}
				>
					{t(`filters.${Constants.newsStatuses[info.getValue()].label}`)}
				</div>
			),
		}),
		columnHelper.display({
			id: 'open',
			header: () => '',
			cell: (info) => <button className="btn btn-accent w-full">{t('table.open')}</button>,
		}),
	];
};
