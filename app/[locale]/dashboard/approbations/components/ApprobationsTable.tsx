'use client';

import React, { useEffect, useState, useTransition } from 'react';
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
import { getNextEvents } from '@/app/actions/get-next-events';
import LoadingSpinner from '@/components/modals/LoadingSpinner';

type Props = {
	locale: string;
	tags: Tag[];
	id?: string;
};

export default function ApprobationsTable({ locale, tags, id }: Props) {
	const t = useTranslations('Approbations');

	const statusKeys = Object.keys(Constants.newsStatuses);
	const [selectedFilter, setSelectedFilter] = useState(statusKeys[0]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<HelloEvent | null>(null);
	const [paginatedEvents, setPaginatedEvents] = useState<ApiPaginatedResponse>();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [isLoading, startTransition] = useTransition();

	const filters = Object.values(Constants.newsStatuses).map((status) => t(`filters.${status.label}`));

	useEffect(() => {
		if (id) {
			const event = paginatedEvents?.data.find((event) => event.id === id);
			if (event) {
				setSelectedEvent(event);
				setIsModalOpen(true);
			}
		}
	}, [id, paginatedEvents?.data]);

	useEffect(() => {
		startTransition(async () => {
			const eventsPaginated = await getNextEvents(currentPage, pageSize, undefined, selectedFilter, searchTerm);
			if (eventsPaginated) {
				setPaginatedEvents(eventsPaginated);
			}
		});
	}, [currentPage, pageSize, selectedFilter, searchTerm]);

	const handleFilterChanged = (filterIndex: number) => {
		setSelectedFilter(filters[filterIndex].toLowerCase());
		setCurrentPage(1);
	};

	const handleSearchChanged = (search: string) => {
		setSearchTerm(search);
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handlePageSizeChange = (size: number) => {
		setPageSize(size);
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
					}}
					modalMode={Constants.publicationModalStatus.moderator}
					tags={tags}
				/>
			)}
			<div className="mb-4 flex items-center space-x-4">
				<Search search={t('search')} onSearchTermChange={handleSearchChanged} />
				<Dropdown title={t('filters.all')} items={filters} onFilterChange={handleFilterChanged} />
			</div>
			{isLoading ? (
				<LoadingSpinner localModal={true} />
			) : paginatedEvents && paginatedEvents.data.length > 0 ? (
				<Table<HelloEvent>
					data={paginatedEvents.data}
					columns={createApprobationColumnDefs(t, locale, openModal)}
					currentPage={currentPage}
					pageSize={pageSize}
					totalItems={paginatedEvents.totalRecords}
					onPageChange={handlePageChange}
					onPageSizeChange={handlePageSizeChange}
				/>
			) : (
				<div className="text-center py-4">{t('no-publications')}</div>
			)}
		</div>
	);
}
