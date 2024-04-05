import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { User } from '@/models/user';
import { getActivityAreaName } from '@/models/activity-area';
import Avatar from '../Avatar';

const columnHelper = createColumnHelper<User>();

export const createUserColumnDefs = (
	t: (key: string) => string,
	handleUserSelection: (user: User) => void,
	locale: string
): ColumnDef<User, any>[] => {
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
		columnHelper.accessor((row) => row, {
			id: 'User.Organization',
			header: () => t('table.organization'),
			cell: (info) => (
				<div className="text-base flex items-center space-x-2">
					{info.getValue() && (
						<div className="avatar mr-3">
							<Avatar userProfile={info.getValue()} size="w-10 h-10" textSize="text-xl" color="bg-base-300" />
						</div>
					)}
					<div>
						<div>{info.getValue().organization ?? '-'}</div>
					</div>
				</div>
			),
		}),
		columnHelper.accessor('email', {
			id: 'User.Email',
			header: () => t('table.email'),
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('activityArea', {
			id: 'User.ActivityArea',
			header: () => t('table.activityarea'),
			cell: (info) => (info.getValue() ? getActivityAreaName(info.getValue(), locale) : '-'),
		}),
		columnHelper.display({
			id: 'actions',
			header: () => t('table.actions'),
			cell: (info) => (
				<button
					className={`btn ${info.row.original.isActive ? 'btn-error' : 'btn-success'}`}
					onClick={() => handleUserSelection(info.row.original)}
				>
					{info.row.original.isActive ? t('menu.deactivate') : t('menu.activate')}
				</button>
			),
		}),
	];
};
