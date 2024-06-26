'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';
import Constants from '@/utils/constants';
import { HelloEvent } from '@/models/hello-event';
import PublicationDetails from '@/components/modals/PublicationDetails';
import { Tag } from '@/models/tag';
import { attemptRevalidation } from '@/lib/attempt-revalidation';
import Table from '@/components/table/Table';
import { createApprobationColumnDefs } from '@/components/table/ApprobationColumnDefs';
import { ApiPaginatedResponse } from '@/models/api-paginated-response';
import { getNextEventsModerator } from '@/app/actions/get-next-events-moderator';
import { useToast } from '@/utils/provider/ToastProvider';
import { AlertType } from '@/components/Alert';
import { ActivityArea, getActivityAreaName } from '@/models/activity-area';
import { NewsStates } from '@/models/news-states';
import DropdownSelect from '@/components/DropdownSelect';
import { useLoading } from '@/utils/provider/LoadingProvider';

type Props = {
	locale: string;
	tags: Tag[];
	id?: string;
	activityAreas: ActivityArea[];
};

export default function ApprobationsTable({ locale, tags, id, activityAreas }: Props) {
	const t = useTranslations('Approbations');

	const statusKeys = Object.keys(Constants.newsStatuses);
	const [selectedFilter, setSelectedFilter] = useState(statusKeys[1]); // ON_HOLD by default
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<HelloEvent | null>(null);
	const [paginatedEvents, setPaginatedEvents] = useState<ApiPaginatedResponse<HelloEvent>>();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [orderBy, setOrderBy] = useState('');
	const [orderByDesc, setOrderByDesc] = useState(false);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
	const { startTransition } = useLoading();
	const [selectedActivityAreas, setSelectedActivityAreas] = useState<string[]>(
		activityAreas.map((activity) => activity.id)
	);

	const { setToast } = useToast();

	const filterOrder = [
		NewsStates.ALL,
		NewsStates.ON_HOLD,
		NewsStates.PUBLISHED,
		NewsStates.APPROVED,
		NewsStates.REFUSED,
		NewsStates.DELETED,
	];
	const filters = filterOrder.map((status) => {
		const statusInfo = Constants.newsStatuses[status];
		return t(`filters.${statusInfo.label}`);
	});

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
		if (id) {
			const event = paginatedEvents?.data.find((event) => event.id === id);
			if (event) {
				setSelectedEvent(event);
				setIsModalOpen(true);
			}
		}
	}, [id, paginatedEvents?.data]);

	const callbackSetPaginatedEvents = useCallback(() => {
		startTransition(async () => {
			if (selectedActivityAreas.length === 0) {
				setPaginatedEvents(undefined);
			} else {
				const eventsPaginated = await getNextEventsModerator(
					currentPage,
					pageSize,
					debouncedSearchTerm,
					selectedFilter,
					selectedActivityAreas,
					orderBy,
					orderByDesc
				);
				if (eventsPaginated) {
					setPaginatedEvents(eventsPaginated);
				} else {
					setToast(t('error-fetching-events'), AlertType.error);
				}
			}
		});
	}, [currentPage, pageSize, debouncedSearchTerm, selectedFilter, selectedActivityAreas, orderBy, orderByDesc]);

	useEffect(() => {
		callbackSetPaginatedEvents();
	}, [currentPage, pageSize, selectedFilter, debouncedSearchTerm, orderBy, orderByDesc, selectedActivityAreas]);

	const handleFilterChanged = (filterIndex: number) => {
		const selectedStatusKey = statusKeys[filterIndex];
		setCurrentPage(1);
		setSelectedFilter(selectedStatusKey);
	};

	const handleActivityAreaFilterChanged = (selectedIndices: number[]) => {
		const selectedAreas = selectedIndices.map((index) => activityAreas[index].id);
		setSelectedActivityAreas(selectedAreas);
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

	const handleOrderChange = (id?: string) => {
		if (id == orderBy) {
			setOrderByDesc(!orderByDesc);
		} else {
			setOrderByDesc(false);
		}
		setOrderBy(id ?? '');
		setCurrentPage(1);
	};

	const openModal = (event: HelloEvent) => {
		setSelectedEvent(event);
		setIsModalOpen(true);
	};

	return (
		<div>
			{isModalOpen && (
				<PublicationDetails
					locale={locale}
					publication={selectedEvent}
					onClose={() => {
						setIsModalOpen(false);
						attemptRevalidation(Constants.tags.approbations);
						callbackSetPaginatedEvents();
					}}
					modalMode={Constants.publicationModalStatus.moderator}
					tags={tags}
					activityAreas={activityAreas}
				/>
			)}
			<div className="mb-4 flex items-center space-x-4">
				<Search search={t('search')} onSearchTermChange={handleSearchChanged} />
				<Dropdown title={t('filters.on-hold')} items={filters} onFilterChange={handleFilterChanged} />
				<DropdownSelect
					title={t('activity-area-filters')}
					items={activityAreas.map((activityArea) => getActivityAreaName(activityArea, locale))}
					onFilterChange={handleActivityAreaFilterChanged}
					defaultSelected
				/>
			</div>
			{paginatedEvents && paginatedEvents.data.length > 0 ? (
				<Table<HelloEvent>
					data={paginatedEvents.data}
					columns={createApprobationColumnDefs(t, locale, openModal)}
					currentPage={currentPage}
					pageSize={pageSize}
					totalItems={paginatedEvents.totalRecords}
					onPageChange={handlePageChange}
					onPageSizeChange={handlePageSizeChange}
					onOrderChange={handleOrderChange}
					orderBy={orderBy}
					orderByDesc={orderByDesc}
				/>
			) : (
				<div className="text-center py-4">{t('no-publications')}</div>
			)}
		</div>
	);
}
