'use client';

import React, { useEffect, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import Search from '@/components/Search';
import Constants from '@/utils/constants';
import { useTranslations } from 'next-intl';
import { User } from '@/models/user';
import UserCreationModal from '@/components/modals/UserCreationModal';
import { AlertType } from '@/components/Alert';
import { useToast } from '@/utils/provider/ToastProvider';
import { toggleUserIsActive } from '@/lib/users/actions/toggle';
import { UserStates } from '@/models/user-states';
import Confirmation from '@/components/modals/Confirmation';

type Props = {
	users: User[];
};

export default function UsersTable({ users }: Props) {
	const t = useTranslations('Accounts');

	const filterAll = t('filters.all').toLowerCase();

	const [selectedFilter, setSelectedFilter] = useState(filterAll);
	const [filteredUsers, setFilteredUsers] = useState(users);
	const [searchTerm, setSearchTerm] = useState('');
	const { setToast } = useToast();

	const filters = Object.values(Constants.userStatuses).map((status) => t(`filters.${status.label}`));

	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
	const [activationModalOpen, setActivationModalOpen] = useState(false);
	const [deactivationModalOpen, setDeactivationModalOpen] = useState(false);
	const [deactivationReaon, setDeactivationReason] = useState('');

	const getButtonText = (user: User) => {
		return user.isActive ? t('menu.deactivate') : t('menu.activate');
	};

	const handleUserSelection = (userIndex: number, state: boolean) => {
		setSelectedUser(filteredUsers[userIndex]);

		if (state) {
			setDeactivationModalOpen(true);
		} else {
			setActivationModalOpen(true);
		}
	};

	const getUserState = (user: User) => (user.isActive ? UserStates.ACTIVATED : UserStates.DEACTIVATED);

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

	useEffect(() => {
		const filtered = users.filter(
			(user) =>
				(t(`filters.${Constants.userStatuses[getUserState(user)]?.label}`).toLowerCase() === selectedFilter ||
					selectedFilter === filterAll) &&
				(searchTerm === '' ||
					user.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.activityArea?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
		);
		setFilteredUsers(filtered);
	}, [selectedFilter, searchTerm, users]);

	const handleFilterChanged = (filterIndex: number) => {
		setSelectedFilter(filters[filterIndex].toLowerCase());
	};

	const handleSearchChanged = (search: string) => {
		setSearchTerm(search);
	};

	const handleUserCreation = (user: User | undefined) => {
		setIsModalOpen(false);
		if (user) setToast(t('create.success'), AlertType.success);
		else setToast(t('create.error'), AlertType.error);
	};

	const closeUserSelection = () => {
		setSelectedUser(undefined);
		setDeactivationReason('');
		setDeactivationModalOpen(false);
		setActivationModalOpen(false);
	};

	const verifyReason = () => {
		const correct = deactivationReaon.trim() !== '';

		if (!correct) {
			setToast(t('toggle.give-reason'), AlertType.error);
		}

		return !correct;
	};

	return (
		<>
			<div className="flex flex-col h-screen">
				<div className="mb-4 flex justify-between items-center space-x-4">
					<div className="flex items-center space-x-4 flex-1">
						<Search search={t('search')} onSearchTermChange={handleSearchChanged} />
						<div className="w-56">
							<Dropdown title={t('filters.all')} items={filters} onFilterChange={handleFilterChanged} />
						</div>
					</div>
					<div>
						<button className="btn btn-primary text-base-100" onClick={toggleModal}>
							{t('create-new-account')}
						</button>
					</div>
				</div>
				{filteredUsers.length === 0 ? (
					<div className="text-center py-4">{t('no-accounts-found')}</div>
				) : (
					<div className="flex-1 overflow-y-auto">
						<table className="table w-full rounded-lg">
							<thead className="bg-base-300 rounded-t-lg h-17">
								<tr className="text-base-content text-base font-bold">
									<th>{t('table.activated')}</th>
									<th>{t('table.organization')}</th>
									<th>{t('table.email')}</th>
									<th>{t('table.activityarea')}</th>
									<th className="w-[5%] rounded-tr-lg">{t('table.actions')}</th>
								</tr>
							</thead>
							<tbody>
								{filteredUsers.map((user, index) => (
									<tr key={index} className="border-b-2 border-base-300">
										<td className="text-base">
											<div
												className={`py-4 px-4 badge ${
													Constants.userStatuses[getUserState(user)].color || 'badge-neutral'
												} text-black`}
											>
												{user.isActive && t('table.yes')}
												{!user.isActive && t('table.no')}
											</div>
										</td>
										<td>{user.organization ?? '-'}</td>
										<td>{user.email}</td>
										<td>{user.activityArea ?? '-'}</td>
										<td>
											<button
												className={`font-normal btn w-28 ${user.isActive ? ' btn-error' : 'btn-success'}`}
												onClick={() => handleUserSelection(index, user.isActive)}
											>
												{getButtonText(user)}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				{isModalOpen && <UserCreationModal onClose={toggleModal} onCreate={handleUserCreation} />}
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
			</div>
		</>
	);
}
