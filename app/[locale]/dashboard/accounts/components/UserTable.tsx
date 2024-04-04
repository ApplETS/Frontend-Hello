'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';
import { User } from '@/models/user';
import UserCreationModal from '@/components/modals/UserCreationModal';
import { AlertType } from '@/components/Alert';
import { useToast } from '@/utils/provider/ToastProvider';
import Table from '@/components/table/Table';
import { createUserColumnDefs } from '@/components/table/UserColumnDefs';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';
import LoadingSpinner from '@/components/modals/LoadingSpinner';
import constants from '@/utils/constants';
import { getNextUsers } from '@/app/actions/get-next-users';

type Props = {
	locale: string;
};

export default function UsersTable({ locale }: Props) {
	const t = useTranslations('Accounts');
	const { setToast } = useToast();

	const statusKeys = Object.keys(constants.userStatuses);
	const [selectedFilter, setSelectedFilter] = useState(statusKeys[0]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [paginatedUsers, setPaginatedUsers] = useState<ApiPaginatedResponse<User>>();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
	const [isLoading, startTransition] = useTransition();

	const filters = Object.values(constants.userStatuses).map((status) => t(`filters.${status.label}`));

	useEffect(() => {
		const handler = setTimeout(() => {
			setCurrentPage(1);
			setDebouncedSearchTerm(searchTerm);
		}, 1000);

		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm]);

	useEffect(() => {
		startTransition(async () => {
			const usersPaginated = await getNextUsers(currentPage, pageSize, debouncedSearchTerm);
			if (usersPaginated) {
				setPaginatedUsers(usersPaginated);
			} else {
				setToast(t('error-fetching-users'), AlertType.error);
			}
		});
	}, [currentPage, pageSize, debouncedSearchTerm, selectedFilter]);

	const handleFilterChanged = (filterIndex: number) => {
		const selectedStatusKey = statusKeys[filterIndex];
		setCurrentPage(1);
		setSelectedFilter(selectedStatusKey);
	};

	const handleSearchChanged = (search: string) => {
		setSearchTerm(search);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handlePageSizeChange = (size: number) => {
		setPageSize(size);
		setCurrentPage(1);
	};

	return (
		<div className="flex flex-col flex-grow">
			<div className="mb-4 flex justify-between items-center space-x-4">
				<div className="flex items-center space-x-4 flex-1">
					<Search search={t('search')} onSearchTermChange={handleSearchChanged} />
					<div className="w-56">
						<Dropdown title={t('filters.all')} items={filters} onFilterChange={handleFilterChanged} />
					</div>
				</div>
				<div className="right-0">
					<button className="btn btn-primary text-base-100" onClick={() => setIsModalOpen(true)}>
						{t('create-new-account')}
					</button>
				</div>
			</div>
			{paginatedUsers && paginatedUsers.data.length > 0 ? (
				<Table<User>
					data={paginatedUsers.data}
					columns={createUserColumnDefs(t, locale)}
					currentPage={currentPage}
					pageSize={pageSize}
					totalItems={paginatedUsers.totalRecords}
					onPageChange={handlePageChange}
					onPageSizeChange={handlePageSizeChange}
				/>
			) : (
				<div className="text-center py-4">{t('no-accounts-found')}</div>
			)}
			{isModalOpen && (
				<UserCreationModal
					onClose={() => setIsModalOpen(false)}
					onCreate={(user) => {
						if (user) {
							setToast(t('create.success'), AlertType.success);
						} else {
							setToast(t('create.error'), AlertType.error);
						}
					}}
				/>
			)}
			{isLoading && <LoadingSpinner localModal={true} />}
		</div>
	);
}
