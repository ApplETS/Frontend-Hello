'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';
import DropdownMenu from '@/components/DropdownMenu';
import Constants from '@/utils/constants';
import { formatDate } from '@/utils/formatDate';
import { HelloEvent } from '@/models/hello-event';

type Props = {
	locale: string;
	publications: HelloEvent[];
};

export default function PublicationsTable({ locale, publications }: Props) {
	const t = useTranslations('Publications');
	const filterAll = t('filters.all').toLowerCase();
	const [selectedFilter, setSelectedFilter] = useState(filterAll);
	const [filteredPublications, setFilteredPublications] = useState(publications);
	const [searchTerm, setSearchTerm] = useState('');

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

	const menuItems = Constants.menuItems.map((item) => {
		return {
			text: t(`menu.${item.label}`),
			icon: item.icon,
			color: item.color,
		};
	});

	return (
		<div>
			<div className="mb-4 flex justify-between items-center space-x-4">
				<div className="flex items-center space-x-4 flex-1">
					<Search search={t('search')} onSearchTermChange={handleSearchChanged} />
					<div className="w-56">
						<Dropdown title={t('filters.all')} items={filters} onFilterChange={handleFilterChanged} />
					</div>
				</div>
				<button className="btn btn-primary text-base-100">{t('create-new-post')}</button>
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
							<td>{formatDate(new Date(publication.eventDate), locale)}</td>
							<td>{0}</td> {/* publication.numberOfViews */}
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
								<DropdownMenu items={menuItems} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
