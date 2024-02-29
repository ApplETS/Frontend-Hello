'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';
import DropdownMenu from '@/components/DropdownMenu';
import Confirmation from '@/components/modals/Confirmation';
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
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [modalType, setModalType] = useState(Constants.publicationModalStatus.view);
	const [selectedPublication, setSelectedPublication] = useState<HelloEvent | null>(null);

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

	const handleSelection = (index: number, dropdownIndex?: number) => {
		setSelectedPublication(filteredPublications[index]);

		switch (dropdownIndex) {
			case 0:
				setModalType(Constants.publicationModalStatus.view);
				toggleModal();
				break;
			case 1:
				setModalType(Constants.publicationModalStatus.modify);
				toggleModal();
				break;
			case 2:
				setModalType(Constants.publicationModalStatus.duplicate);
				toggleModal();
				break;
			case 3:
				setIsDeleteModalOpen(true);
				break;
		}
	};

	const handleCreateNewPost = () => {
		setModalType(Constants.publicationModalStatus.create);
		setSelectedPublication(null);
		toggleModal();
	};

	const deletePost = () => {
		// TODO - Implement delete post
		setIsDeleteModalOpen(false);
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
					<button className="btn btn-primary text-base-100" onClick={handleCreateNewPost}>
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
					{filteredPublications.length > 0 ? (
						filteredPublications.map((publication, index) => (
							<tr key={index} className="border-b-2 border-base-300 cursor-pointer">
								<td className="text-base">{publication.title}</td>
								<td>{formatDate(new Date(publication.publicationDate), locale)}</td>
								<td>{formatDate(new Date(publication.eventStartDate), locale)}</td>
								<td>{0}</td> {/* Replace with number of views when implemented */}
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
										onSelect={(publicationIndex, dropdownIndex) => handleSelection(publicationIndex, dropdownIndex)}
										publicationIndex={index}
									/>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={6} className="text-center py-4">
								{t('no-posts')}
							</td>
						</tr>
					)}

					{isModalOpen && (
						<PublicationsDetails
							locale={locale}
							publication={selectedPublication}
							modalMode={modalType}
							user={user}
							onClose={() => setIsModalOpen(false)}
						/>
					)}
					{isDeleteModalOpen && (
						<Confirmation
							title={t('modal.delete-title')}
							firstButtonTitle={t('modal.cancel')}
							secondButtonTitle={t('modal.delete-button')}
							secondButtonColor="bg-error"
							secondButtonHoverColor="hover:bg-red"
							onClose={() => deletePost()}
						/>
					)}
				</tbody>
			</table>
		</div>
	);
}
