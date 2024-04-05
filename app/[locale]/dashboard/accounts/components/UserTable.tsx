'use client';

import React, { useCallback, useEffect, useState, useTransition } from 'react';
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
import Confirmation from '@/components/modals/Confirmation';
import { toggleUserIsActive } from '@/lib/users/actions/toggle';
import { ActivityArea } from '@/models/activity-area';

type Props = {
	locale: string;
	activityAreas: ActivityArea[];
};

export default function UsersTable({ locale, activityAreas }: Props) {
	const t = useTranslations('Accounts');
	const { setToast } = useToast();

	const statusKeys = Object.keys(constants.userStatuses);
	const [selectedFilter, setSelectedFilter] = useState(statusKeys[0]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [paginatedUsers, setPaginatedUsers] = useState<ApiPaginatedResponse<User>>();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [activationModalOpen, setActivationModalOpen] = useState(false);
	const [deactivationModalOpen, setDeactivationModalOpen] = useState(false);
	const [deactivationReaon, setDeactivationReason] = useState('');
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

	const callbackSetPaginatedEvents = useCallback(() => {
		startTransition(async () => {
			const usersPaginated = await getNextUsers(currentPage, pageSize, debouncedSearchTerm);
			if (usersPaginated) {
				setPaginatedUsers(usersPaginated);
			} else {
				setToast(t('error-fetching-users'), AlertType.error);
			}
		});
	}, [currentPage, pageSize, debouncedSearchTerm, selectedFilter]);

	useEffect(() => {
		callbackSetPaginatedEvents();
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

	const handleUserSelection = (user: User) => {
		setSelectedUser(user);

		if (user.isActive) {
			setDeactivationModalOpen(true);
		} else {
			setActivationModalOpen(true);
		}
	};

	const handleUserCreation = (user: User | undefined) => {
		setIsModalOpen(false);
		if (user) setToast(t('create.success'), AlertType.success);
		else setToast(t('create.error'), AlertType.error);
	};

	const closeUserSelection = () => {
		setSelectedUser(null);
		setDeactivationReason('');
		setDeactivationModalOpen(false);
		setActivationModalOpen(false);
		callbackSetPaginatedEvents();
	};

	const verifyReason = () => {
		const correct = deactivationReaon.trim() !== '';

		if (!correct) {
			setToast(t('toggle.give-reason'), AlertType.error);
		}

		return !correct;
	};

	const toggleUser = async () => {
		if (!selectedUser) return;

		const success = await toggleUserIsActive(selectedUser.id, deactivationReaon);
		if (success) {
			selectedUser.isActive = !selectedUser.isActive;
			const message = selectedUser.isActive ? t('activate-success') : t('deactivate-success');
			setToast(message, AlertType.success);
		} else {
			const message = selectedUser.isActive ? t('activate-error') : t('deactivate-error');
			setToast(message, AlertType.error);
		}
		closeUserSelection();
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
					columns={createUserColumnDefs(t, handleUserSelection, locale)}
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
					onClose={toggleModal}
					onCreate={handleUserCreation}
					activityAreas={activityAreas}
					locale={locale}
				/>
			)}
			{deactivationModalOpen && (
				<Confirmation
					title={
						selectedUser?.organization
							? t('toggle.deactivation-title', { organization: selectedUser?.organization })
							: t('toggle.deactivation-title-no-organization')
					}
					firstButtonTitle={t('toggle.close')}
					secondButtonTitle={t('toggle.deactivate')}
					secondButtonColor={'btn-error'}
					inputTitle={t('toggle.input-title')}
					inputValue={deactivationReaon}
					setInputValue={setDeactivationReason}
					onClose={closeUserSelection}
					secondButtonHoverColor={''}
					confirmationAction={toggleUser}
					verify={verifyReason}
				/>
			)}
			{activationModalOpen && (
				<Confirmation
					title={
						selectedUser?.organization
							? t('toggle.activation-title', { organization: selectedUser?.organization })
							: t('toggle.activation-title-no-organization')
					}
					firstButtonTitle={t('toggle.close')}
					secondButtonTitle={t('toggle.activate')}
					secondButtonColor={'btn-success'}
					onClose={closeUserSelection}
					secondButtonHoverColor={''}
					confirmationAction={toggleUser}
				/>
			)}
			{isLoading && <LoadingSpinner localModal={true} />}
		</div>
	);
}
