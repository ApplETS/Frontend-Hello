import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { User } from '@/models/user';
import { useTranslations } from 'next-intl';

const columnHelper = createColumnHelper<User>();

export const createUserColumnDefs = (t: (key: string) => string, locale: string): ColumnDef<User, any>[] => {
	return [
		columnHelper.accessor('isActive', {
			id: 'User.IsActive',
			header: () => t('table.activated'),
			cell: (info) => (
				<div className={`py-4 px-4 badge ${info.getValue() ? 'badge-success' : 'badge-error'} text-black`}>
					{info.getValue() ? t('table.yes') : t('table.no')}
				</div>
			),
		}),
		columnHelper.accessor('organization', {
			id: 'User.Organization',
			header: () => t('table.organization'),
			cell: (info) => info.getValue() ?? '-',
		}),
		columnHelper.accessor('email', {
			id: 'User.Email',
			header: () => t('table.email'),
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('activityArea', {
			id: 'User.ActivityArea',
			header: () => t('table.activityarea'),
			cell: (info) => info.getValue() ?? '-',
		}),
		columnHelper.display({
			id: 'actions',
			header: () => t('table.actions'),
			cell: (info) => (
				<button className={`btn ${info.row.original.isActive ? 'btn-error' : 'btn-success'}`}>
					{info.row.original.isActive ? t('menu.deactivate') : t('menu.activate')}
				</button>
			),
		}),
	];
};
