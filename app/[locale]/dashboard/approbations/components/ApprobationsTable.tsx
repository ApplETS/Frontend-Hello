'use client';

import React, { useEffect, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import Search from '@/components/Search';
import Constants from '@/utils/constants';
import { useTranslations } from 'next-intl';
import { HelloEvent } from '@/models/hello-event';
import { formatDate } from '@/utils/formatDate';
import { User } from '@/models/user';
import PublicationDetails from '@/components/modals/PublicationDetails';

type Props = {
	events: HelloEvent[];
	locale: string;
	user: User;
};

export default function ApprobationsTable({ events, locale, user }: Props) {
	const t = useTranslations('Approbations');
	const tp = useTranslations('Publications');
	const filterAll = t('filters.all').toLowerCase();
	const [selectedFilter, setSelectedFilter] = useState(filterAll);
	const [filteredEvents, setFilteredEvents] = useState(events);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedEvent, setSelectedEvent] = useState<HelloEvent | null>(null);

	const filters = Object.values(Constants.newsStatuses).map((status) => t(`filters.${status.label}`));

	useEffect(() => {
		const filtered = events.filter(
			(event) =>
				(t(`filters.${Constants.newsStatuses[event.state]?.label}`).toLowerCase() === selectedFilter ||
					selectedFilter === filterAll) &&
				(searchTerm === '' ||
					event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					event.organizer?.activityArea?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					event.organizer?.organisation?.toLowerCase().includes(searchTerm.toLowerCase()))
		);
		setFilteredEvents(filtered);
	}, [selectedFilter, searchTerm]);

	const handleFilterChanged = (filterIndex: number) => {
		setSelectedFilter(filters[filterIndex].toLowerCase());
	};

	const handleSearchChanged = (search: string) => {
		setSearchTerm(search);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (event: HelloEvent) => {
		setSelectedEvent(event);
		setIsModalOpen(true);
	};

	return (
		<div>
			{isModalOpen && (
				<PublicationDetails
					locale={locale}
					props={{
						pageTitle: tp('modal.create-page-title'),
						pageTitleModerator: t('modal.moderator-page-title'),
						title: tp('modal.title'),
						activityArea: tp('modal.activity-area'),
						altText: tp('modal.alt-text'),
						publishedDate: tp('modal.published-date'),
						eventStartDate: tp('modal.event-start-date'),
						eventEndDate: tp('modal.event-end-date'),
						tagsTitle: tp('modal.tags-title'),
						addTag: tp('modal.add-tag'),
						content: tp('modal.content'),
						newsTitle: tp('modal.news'),
						eventTitle: tp('modal.event-date'),
						chooseFile: tp('modal.choose-file'),
						cancelButton: tp('modal.cancel-button'),
						submitButton: tp('modal.submit-button'),
						approveButton: t('modal.approve-button'),
						rejectButton: t('modal.reject-button'),
						tags: ['Apprentissage', 'Atelier', 'Bourses', 'Carrière', 'Programmation', 'Développement mobile'], // TODO: Replace with actual tags
						toolTipText: tp('modal.tool-tip-text'),
						errorToastMessage: tp('modal.error-toast-message'),
						dateErrorToastMessage: tp('modal.date-error-toast-message'),
						imageFormatErrorToastMessage: tp('modal.image-format-error-toast-message'),
						previewTitle: tp('modal.preview'),
					}}
					onClose={() => setIsModalOpen(false)}
					modalMode={Constants.publicationModalStatus.moderator}
					user={user}
					selectedEvent={selectedEvent}
				/>
			)}
			<div className="mb-4 flex items-center space-x-4">
				<Search search={t('search')} onSearchTermChange={handleSearchChanged} />
				<Dropdown title={t('filters.all')} items={filters} onFilterChange={handleFilterChanged} />
			</div>
			<table className="table w-full rounded-lg">
				<thead className="bg-base-300 rounded-t-lg h-17">
					<tr className="text-base-content text-base font-bold">
						<th className="rounded-tl-lg">{t('table.author')}</th>
						<th>{t('table.title')}</th>
						<th>{t('table.release-date')}</th>
						<th>{t('table.status')}</th>
						<th className="w-[10%] rounded-tr-lg"></th>
					</tr>
				</thead>
				<tbody>
					{filteredEvents.map((event, index) => (
						<tr key={index} className="border-b-2 border-base-300">
							<td className="text-base flex items-center space-x-2">
								{/* TODO : Replace the img src with the real image*/}
								<img src="https://placehold.co/500x500" alt="Placeholder" className="w-10 h-10 mr-3 rounded-full"></img>
								<div>
									<div>{event.organizer?.organisation}</div>
									<div className="text-secondary">{event.organizer?.activityArea}</div>
								</div>
							</td>
							<td>{event.title}</td>
							<td>{formatDate(new Date(event.publicationDate), locale)}</td>
							<td className="text-base">
								<div
									className={`py-4 px-4 badge ${
										Constants.newsStatuses[event.state].color || 'badge-neutral'
									} text-black`}
								>
									{t(`filters.${Constants.newsStatuses[event.state].label}`)}
								</div>
							</td>
							<td className="text-base">
								<button className="btn btn-accent w-full" onClick={() => openModal(event)}>
									{t('table.open')}
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
