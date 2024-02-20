'use client';

import React, { useEffect, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import Search from '@/components/Search';
import Constants from '@/utils/constants';
import { useTranslations } from 'next-intl';
import { User } from '@/models/user';
import DropdownMenu from '@/components/DropdownMenu';

type Props = {
	locale: string;
	users: User[];
};

export default function UsersTable({ locale, users }: Props) {
	const t = useTranslations('Accounts');
	const filterAll = t('filters.all').toLowerCase();
	const [selectedFilter, setSelectedFilter] = useState(filterAll);
	const [filteredUsers, setFilteredUsers] = useState(users);
	const [searchTerm, setSearchTerm] = useState('');

	const filters = Object.values(Constants.userStatuses).map((status) => t(`filters.${status.label}`));

	const menuItems = Constants.userMenuItems.map((item) => {
		return {
			text: t(`menu.${item.label}`),
			icon: item.icon,
			color: item.color,
		};
	});

	useEffect(() => {
		const filtered = users.filter(
			(user) =>
				(t(`filters.${Constants.userStatuses[1]?.label}`).toLowerCase() === selectedFilter ||
					selectedFilter === filterAll) &&
				(searchTerm === '' ||
					user.organisation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.activityArea?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.email.toLowerCase().includes(searchTerm.toLowerCase()))
		);
		setFilteredUsers(filtered);
	}, [selectedFilter, searchTerm]);

	const handleFilterChanged = (filterIndex: number) => {
		setSelectedFilter(filters[filterIndex].toLowerCase());
	};

	const handleSearchChanged = (search: string) => {
		setSearchTerm(search);
	};

	return (
		<div>
			<div className="mb-4 flex items-center space-x-4">
				<Search search={t('search')} onSearchTermChange={handleSearchChanged} />
				<Dropdown title={t('filters.all')} items={filters} onFilterChange={handleFilterChanged} />
			</div>
			<table className="table w-full rounded-lg">
				<thead className="bg-base-300 rounded-t-lg h-17">
					<tr className="text-base-content text-base font-bold">
						{/* <th className="rounded-tl-lg">{t('table.author')}</th> */}
						<th>{t('table.organisation')}</th>
						<th>{t('table.email')}</th>
						<th>{t('table.activityarea')}</th>
						<th>{t('table.status')}</th>
						<th className="w-[5%] rounded-tr-lg"></th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user, index) => (
						<tr key={index} className="border-b-2 border-base-300">
							<td>{user.organisation ?? '-'}</td>
							<td>{user.email}</td>
							<td>{user.activityArea ?? '-'}</td>
							<td className="text-base">
								<div className={`py-4 px-4 badge ${Constants.userStatuses[1].color || 'badge-neutral'} text-black`}>
									{t(`filters.${Constants.userStatuses[1].label}`)}
								</div>
							</td>
							<td>
								<DropdownMenu items={menuItems} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
