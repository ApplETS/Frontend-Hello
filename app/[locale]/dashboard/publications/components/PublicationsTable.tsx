'use client';

import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';
import Confirmation from '@/components/modals/Confirmation';
import Constants from '@/utils/constants';
import { HelloEvent } from '@/models/hello-event';
import PublicationsDetails from '@/components/modals/PublicationDetails';
import { Tag } from '@/models/tag';
import { attemptRevalidation } from '@/lib/attempt-revalidation';
import { removePublication } from '@/lib/publications/actions/remove-publication';
import { useToast } from '@/utils/provider/ToastProvider';
import { AlertType } from '@/components/Alert';
import { PublicationStates } from '@/models/publication-states';
import Table from '@/components/table/Table';
import { createEventColumnDefs } from '@/components/table/EventColumnDefs';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';
import { useUser } from '@/utils/provider/UserProvider';
import { getNextEventsOrganizer } from '@/app/actions/get-next-events-organizer';
import LoadingSpinner from '@/components/modals/LoadingSpinner';
import { ActivityArea } from '@/models/activity-area';

type Props = {
	locale: string;
	tags: Tag[];
	id?: string;
	activityAreas: ActivityArea[];
};

export default function PublicationsTable({ locale, tags, id, activityAreas }: Props) {
	const t = useTranslations('Publications');
	const { setToast } = useToast();

	const statusKeys = Object.keys(Constants.newsStatuses);
	const [selectedFilter, setSelectedFilter] = useState(statusKeys[0]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [modalType, setModalType] = useState(Constants.publicationModalStatus.create);
	const [selectedPublication, setSelectedPublication] = useState<HelloEvent | null>(null);
	const [paginatedEvents, setPaginatedEvents] = useState<ApiPaginatedResponse<HelloEvent>>();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [orderBy, setOrderBy] = useState('');
	const [orderByDesc, setOrderByDesc] = useState(false);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
	const { user } = useUser();
	const [isLoading, startTransition] = useTransition();

	const filters = Object.values(Constants.newsStatuses).map((status) => t(`filters.${status.label}`));
	const menuItems = Constants.publicationMenuItems.map((item) => {
		return {
			id: item.id,
			text: t(`menu.${item.label}`),
			icon: item.icon,
			color: item.color,
		};
	});

	useEffect(() => {
		if (id) {
			const event = paginatedEvents?.data.find((event) => event.id == id);
			if (event) {
				setSelectedPublication(event);
				setIsModalOpen(true);
				setModalType(Constants.publicationModalStatus.modify);
			}
		}
	}, [id]);

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
			const eventsPaginated = await getNextEventsOrganizer(
				currentPage,
				pageSize,
				searchTerm,
				selectedFilter,
				orderBy,
				orderByDesc
			);
			if (eventsPaginated) {
				setPaginatedEvents(eventsPaginated);
			} else {
				setToast(t('error-fetching-events'), AlertType.error);
			}
		});
	}, [currentPage, pageSize, debouncedSearchTerm, selectedFilter, orderBy, orderByDesc]);

	useEffect(() => {
		callbackSetPaginatedEvents();
	}, [currentPage, pageSize, user, debouncedSearchTerm, selectedFilter, orderBy, orderByDesc]);

	const handleFilterChanged = (filterIndex: number) => {
		const selectedStatusKey = statusKeys[filterIndex];
		setCurrentPage(1);
		setSelectedFilter(selectedStatusKey);
	};

	const handleSearchChanged = (search: string) => {
		setSearchTerm(search);
	};

	const handleOrderChange = (id?: string) => {
		if (id == orderBy) {
			setOrderByDesc(!orderByDesc);
		} else {
			setOrderByDesc(false);
		}
		setOrderBy(id ?? '');
		setCurrentPage(1);
	};

	const publicationActionMapping: { [key: string]: PublicationStates } = {
		'1': PublicationStates.MODIFY,
		'2': PublicationStates.DUPLICATE,
		'3': PublicationStates.DELETED,
	};
	const handleDropdownSelection = (index: number, dropdownItemId: number) => {
		if (paginatedEvents?.data) {
			setSelectedPublication(paginatedEvents?.data[index]);
			const action = publicationActionMapping[dropdownItemId];

			switch (action) {
				case PublicationStates.MODIFY:
					setModalType(Constants.publicationModalStatus.modify);
					setIsModalOpen(!isModalOpen);
					break;
				case PublicationStates.DUPLICATE:
					setModalType(Constants.publicationModalStatus.duplicate);
					setIsModalOpen(!isModalOpen);
					break;
				case PublicationStates.DELETED:
					setIsDeleteModalOpen(true);
					break;
			}
		}
	};

	const handleCreateNewPost = () => {
		setModalType(Constants.publicationModalStatus.create);
		setSelectedPublication(null);
		setIsModalOpen(!isModalOpen);
	};

	const deletePost = async () => {
		const success = await removePublication(selectedPublication!.id);
		setIsDeleteModalOpen(false);
		setToast(
			t(`modal.delete-${success ? 'success' : 'error'}-toast-message`),
			success ? AlertType.success : AlertType.error
		);
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
					<button className="btn btn-primary text-base-100" onClick={handleCreateNewPost}>
						{t('create-new-post')}
					</button>
				</div>
			</div>
			{paginatedEvents && paginatedEvents.data.length > 0 ? (
				<Table<HelloEvent>
					data={paginatedEvents?.data.map((event) => {
						if (!event.title) {
							return { ...event, title: t('table.none') };
						}
						return event;
					})}
					columns={createEventColumnDefs(menuItems, handleDropdownSelection, t, locale)}
					currentPage={currentPage}
					pageSize={pageSize}
					totalItems={paginatedEvents?.totalRecords}
					onPageChange={handlePageChange}
					onPageSizeChange={handlePageSizeChange}
					onOrderChange={handleOrderChange}
					orderBy={orderBy}
					orderByDesc={orderByDesc}
				/>
			) : (
				<div className="text-center py-4">{t('no-posts')}</div>
			)}
			{isModalOpen && (
				<PublicationsDetails
					locale={locale}
					publication={selectedPublication}
					tags={tags}
					modalMode={modalType}
					onClose={() => {
						setIsModalOpen(false);
						attemptRevalidation(Constants.tags.publications);
						callbackSetPaginatedEvents();
					}}
					activityAreas={activityAreas}
				/>
			)}
			{isDeleteModalOpen && (
				<Confirmation
					title={t('modal.delete-title')}
					firstButtonTitle={t('modal.cancel')}
					secondButtonTitle={t('modal.delete-button')}
					secondButtonColor="bg-error"
					secondButtonHoverColor="hover:bg-red"
					onClose={() => setIsDeleteModalOpen(false)}
					confirmationAction={deletePost}
				/>
			)}
			{isLoading && <LoadingSpinner localModal={true} />}
		</div>
	);
}
