'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { formatDate } from '@/utils/formatDate';
import DropdownMenu, { MenuItem } from '@/components/DropdownMenu';
import Constants from '@/utils/constants';
import { HelloEvent } from '@/models/hello-event';

const columnHelper = createColumnHelper<HelloEvent>();

export const createEventColumnDefs = (
	menuItems: MenuItem[],
	handleDropdownSelection: (itemIndex: number, dropdownItemId: number, event: HelloEvent) => void,
	t: (key: string) => string,
	locale: string
): ColumnDef<HelloEvent, any>[] => {
	return [
		columnHelper.accessor('title', {
			id: 'Publication.Title',
			meta: 'alpha',
			header: () => t('table.title'),
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('publicationDate', {
			id: 'Publication.PublicationDate',
			meta: 'num',
			header: () => t('table.release-date'),
			cell: (info) => formatDate(new Date(info.getValue()), locale),
		}),
		columnHelper.accessor(
			(row) =>
				`${formatDate(new Date(row.eventStartDate), locale)} - ${formatDate(new Date(row.eventEndDate), locale)}`,
			{
				id: 'EventStartDate',
				meta: 'num',
				header: () => t('table.event-date'),
			}
		),
		columnHelper.accessor((row) => 0, {
			// TODO: Replace with actual number of views when implemented
			id: 'number-of-views',
			header: () => t('table.number-of-views'),
		}),
		columnHelper.accessor('state', {
			id: 'Publication.State',
			meta: 'alpha',
			header: () => t('table.status'),
			cell: (info) => (
				<div
					className={`py-4 px-4 badge ${Constants.newsStatuses[info.getValue()].color || 'badge-neutral'} text-black`}
				>
					{t(`filters.${Constants.newsStatuses[info.getValue()].label}`)}
				</div>
			),
		}),
		columnHelper.accessor((row) => row, {
			id: 'actions',
			header: () => '',
			cell: (info) => (
				<DropdownMenu
					items={menuItems}
					onSelect={(itemIndex, dropdownItemId) =>
						handleDropdownSelection(itemIndex, dropdownItemId, info.row.original)
					}
					itemIndex={info.row.index}
				/>
			),
		}),
	];
};
