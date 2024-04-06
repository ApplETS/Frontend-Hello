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
			(row) => {
				const startDate = new Date(row.eventStartDate);
				const endDate = new Date(row.eventEndDate);
				const isSameDay = startDate.toDateString() === endDate.toDateString();
				const isSameMonth = startDate.getMonth() === endDate.getMonth();
				const isSameYear = startDate.getFullYear() === endDate.getFullYear();

				// When a publication is a draft it puts the year to 1969
				const formattedEndDate = endDate.getFullYear() !== 1969 ? formatDate(endDate, locale) : '';
				const formattedStartDate = formatDate(startDate, locale);

				if (isSameDay) {
					return formattedStartDate;
				} else if (isSameMonth) {
					const startDay = startDate.getDate();
					const endDay = endDate.getDate();
					const monthYear = formattedEndDate.slice(formattedEndDate.indexOf(' '));
					return `${startDay} - ${endDay}${monthYear}`;
				} else if (isSameYear) {
					const startDayMonth = formattedStartDate.slice(0, formattedStartDate.lastIndexOf(' '));
					const endDayMonth = formattedEndDate.slice(0, formattedEndDate.lastIndexOf(' '));
					return `${startDayMonth} - ${endDayMonth} ${startDate.getFullYear()}`;
				} else {
					return `${formattedStartDate} - ${formattedEndDate}`;
				}
			},
			{
				id: 'EventStartDate',
				meta: 'num',
				header: () => t('table.event-date'),
			}
		),
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
