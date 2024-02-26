'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';
import DropdownMenu from '@/components/DropdownMenu';
import Constants from '@/utils/constants';
import { formatDate } from '@/utils/formatDate';
import { HelloEvent } from '@/models/hello-event';
import { User } from '@/models/user';
import PublicationsDetails from '@/components/modals/PublicationDetails';

type Props = {
	locale: string;
	publications: HelloEvent[];
	user: User;
};

export default function PublicationsTable({ locale, publications, user }: Props) {
	const t = useTranslations('Publications');
	const filterAll = t('filters.all').toLowerCase();
	const [selectedFilter, setSelectedFilter] = useState(filterAll);
	const [filteredPublications, setFilteredPublications] = useState(publications);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState(Constants.publicationModalStatus.view);

	const filters = Object.values(Constants.newsStatuses).map((status) => t(`filters.${status.label}`));

	useEffect(() => {
		const filtered = publications.filter(
			(publication) =>
				(t(`filters.${Constants.newsStatuses[publication.state]?.label}`).toLowerCase() === selectedFilter ||
					selectedFilter === filterAll) &&
				(searchTerm === '' || publication.title.toLowerCase().includes(searchTerm.toLowerCase()))
		);
		setFilteredPublications(filtered);
	}, [selectedFilter, searchTerm]);

	const handleFilterChanged = (filterIndex: number) => {
		setSelectedFilter(filters[filterIndex].toLowerCase());
	};

	const handleSearchChanged = (search: string) => {
		setSearchTerm(search);
	};

	const menuItems = Constants.publicationMenuItems.map((item) => {
		return {
			text: t(`menu.${item.label}`),
			icon: item.icon,
			color: item.color,
		};
	});

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const createNewPost = () => {
		setModalType(Constants.publicationModalStatus.create);
		toggleModal();
	};

	const viewPost = () => {
		setModalType(Constants.publicationModalStatus.view);
		toggleModal();
	};

	const modifyPost = () => {
		setModalType(Constants.publicationModalStatus.modify);
		toggleModal();
	};

	const duplicatePost = () => {
		setModalType(Constants.publicationModalStatus.duplicate);
		toggleModal();
	};

	const deletePost = () => {
		// TODO
		console.log('Delete post');
	};

	return (
		<div className="flex flex-col h-screen">
			<div className="mb-4 flex justify-between items-center space-x-4">
				<div className="flex items-center space-x-4 flex-1">
					<Search search={t('search')} onSearchTermChange={handleSearchChanged} />
					<div className="w-56">
						<Dropdown title={t('filters.all')} items={filters} onFilterChange={handleFilterChanged} />
					</div>
				</div>
				<div className="right-0">
					<button className="btn btn-primary text-base-100" onClick={createNewPost}>
						{t('create-new-post')}
					</button>
				</div>
			</div>
			<table className="table w-full rounded-lg">
				<thead className="bg-base-300 rounded-t-lg h-17">
					<tr className="text-base-content text-base font-bold">
						<th className="rounded-tl-lg">{t('table.title')}</th>
						<th>{t('table.release-date')}</th>
						<th>{t('table.event-date')}</th>
						<th>{t('table.number-of-views')}</th>
						<th>{t('table.status')}</th>
						<th className="w-[5%] rounded-tr-lg"></th>
					</tr>
				</thead>
				<tbody>
					{filteredPublications.map((publication, index) => (
						<tr key={index} className="border-b-2 border-base-300">
							<td className="text-base">{publication.title} </td>
							<td>{formatDate(new Date(publication.publicationDate), locale)}</td>
							<td>{formatDate(new Date(publication.eventStartDate), locale)}</td>
							<td>{0}</td> {/** Replace with number of views when implemented */}
							<td className="text-base">
								<div
									className={`py-4 px-4 badge ${
										Constants.newsStatuses[publication.state].color || 'badge-neutral'
									} text-black`}
								>
									{t(`filters.${Constants.newsStatuses[publication.state].label}`)}
								</div>
							</td>
							<td>
								<DropdownMenu
									items={menuItems}
									viewPublicationModal={viewPost}
									modifyPublicationModal={modifyPost}
									duplicatePublicationModal={duplicatePost}
									deletePublicationModal={deletePost}
								/>
							</td>
						</tr>
					))}
					{isModalOpen && (
						<PublicationsDetails
							locale={locale}
							props={{
								pageTitle: t('modal.create-page-title'),
								title: t('modal.title'),
								activityArea: t('modal.activity-area'),
								altText: t('modal.alt-text'),
								publishedDate: t('modal.published-date'),
								eventStartDate: t('modal.event-start-date'),
								eventEndDate: t('modal.event-end-date'),
								tagsTitle: t('modal.tags-title'),
								addTag: t('modal.add-tag'),
								content: t('modal.content'),
								newsTitle: t('modal.news'),
								eventTitle: t('modal.event-date'),
								chooseFile: t('modal.choose-file'),
								cancelButton: t('modal.cancel-button'),
								submitButton: t('modal.submit-button'),
								tags: ['Apprentissage', 'Atelier', 'Bourses', 'Carrière', 'Programmation', 'Développement mobile'], // TODO: Replace with actual tags
								toolTipText: t('modal.tool-tip-text'),
								errorToastMessage: t('modal.error-toast-message'),
								dateErrorToastMessage: t('modal.date-error-toast-message'),
								imageFormatErrorToastMessage: t('modal.image-format-error-toast-message'),
								previewTitle: t('modal.preview'),
							}}
							modalMode={modalType}
							user={user}
							onClose={() => setIsModalOpen(false)}
						/>
					)}
				</tbody>
			</table>
		</div>
	);
}
