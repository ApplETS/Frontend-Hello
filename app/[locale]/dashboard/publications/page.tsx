import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';
import DropdownMenu from '@/components/DropdownMenu';
import Constants from '@/utils/constants';
import { formatDate } from '@/utils/formatDate';
import PostButton from '@/components/PostButton';
import Confirmation from '@/components/modals/Confirmation';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';

type Props = {
	params: { locale: string };
};

export default async function Publications({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = await getTranslations('Publications');
	const user = await getAuthenticatedUser();

	const currentDate = new Date();
	const formattedDate = formatDate(currentDate, locale);

	const publications = [
		{
			author: 'App|ETS',
			activity: 'Club scientique',
			title: 'Compétition AMC',
			releasedDate: formattedDate,
			eventdate: formattedDate,
			numberOfViews: 0,
			status: 1,
		},
		{
			author: 'App|ETS',
			activity: 'Club scientique',
			title: 'Lancement de Hello',
			releasedDate: formattedDate,
			eventdate: formattedDate,
			numberOfViews: 230,
			status: 2,
		},
		{
			author: 'App|ETS',
			activity: 'Club scientique',
			title: 'Conférence DevOps',
			releasedDate: formattedDate,
			eventdate: formattedDate,
			numberOfViews: 0,
			status: 4,
		},
		{
			author: 'App|ETS',
			activity: 'Club scientique',
			title: "Séance d'informations",
			releasedDate: formattedDate,
			eventdate: formattedDate,
			numberOfViews: 0,
			status: 8,
		},
	];

	const filters = Object.values(Constants.newsStatuses).map((status) => t(`filters.${status.label}`));

	const menuItems = Constants.menuItems.map((item) => {
		return {
			text: t(`menu.${item.label}`),
			icon: item.icon,
			color: item.color,
		};
	});

	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-col justify-center items-center">
				<Confirmation
					title="Pourquoi voulez-vous supprimer l’annonce ?"
					firstButtonTitle="Annuler"
					secondButtonTitle="Supprimer"
					secondButtonColor="btn-error"
					inputTitle="Raison"
				/>
			</div>
			<div className="mb-4 flex justify-between items-center space-x-4">
				<div className="flex items-center space-x-4 flex-1">
					<Search search={t('search')} />
					<div className="w-56">
						<Dropdown title={t('filters.all')} items={filters} />
					</div>
				</div>
				<div className="right-0">
					<PostButton
						locale={locale}
						text={t('create-new-post')}
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
						modalMode={Constants.publicationModalStatus.create}
						user={user}
					/>
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
					{publications.map((publication, index) => (
						<tr key={index} className="border-b-2 border-base-300">
							<td className="text-base">{publication.title} </td>
							<td>{publication.releasedDate}</td>
							<td>{publication.eventdate}</td>
							<td>{publication.numberOfViews}</td>
							<td className="text-base">
								<div
									className={`py-4 px-4 badge ${
										Constants.newsStatuses[publication.status].color || 'badge-neutral'
									} text-black`}
								>
									{t(`filters.${Constants.newsStatuses[publication.status].label}`)}
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
