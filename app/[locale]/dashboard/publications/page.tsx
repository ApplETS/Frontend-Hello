import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';
import Constants from '@/constants';
import { formatDate } from '@/utils/supabase/formatDate';

type Props = {
  params: { locale: string };
};

export default function Projects({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Publications');

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, locale);

  const publications = [
    { author: 'App|ETS', activity: "Club scientique", title: 'Compétition AMC', numberOfViews: 0, releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.approved },
    { author: 'Conjure', activity: "Club scientique", title: '5 @ 7 avec Intact', numberOfViews: 0, releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.deleted },
    { author: 'Centre sportif', activity: "Club scientique", title: 'Soirée de remerciement', numberOfViews: 0, releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.draft },
    { author: 'Cédille', activity: "Club scientique", title: 'Conférence DEVOPS', numberOfViews: 0, releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.onHold },
    { author: 'RockÉTS', activity: "Club scientique", title: 'Lancement de la fusée', numberOfViews: 290, releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.published },
    { author: 'Capra', activity: "Club scientique", title: 'Séance d\'informations', numberOfViews: 0, releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.refused },
  ];

  const statusLabels = {
    [Constants.newsStatuses.all]: 'all',
    [Constants.newsStatuses.approved]: 'approved',
    [Constants.newsStatuses.draft]: 'draft',
    [Constants.newsStatuses.onHold]: 'on-hold',
    [Constants.newsStatuses.published]: 'published',
    [Constants.newsStatuses.refused]: 'refused',
    [Constants.newsStatuses.deleted]: 'deleted',
  };
  
  const filters = [
    t(`filters.${statusLabels[Constants.newsStatuses.all]}`),
    t(`filters.${statusLabels[Constants.newsStatuses.approved]}`),
    t(`filters.${statusLabels[Constants.newsStatuses.draft]}`),
    t(`filters.${statusLabels[Constants.newsStatuses.onHold]}`),
    t(`filters.${statusLabels[Constants.newsStatuses.published]}`),
    t(`filters.${statusLabels[Constants.newsStatuses.refused]}`),
    t(`filters.${statusLabels[Constants.newsStatuses.deleted]}`),
  ];
  
  const statusColorMapping = {
    [statusLabels[Constants.newsStatuses.all]]: 'bg-orange',
    [statusLabels[Constants.newsStatuses.approved]]: 'bg-blue',
    [statusLabels[Constants.newsStatuses.draft]]: 'bg-green',
    [statusLabels[Constants.newsStatuses.onHold]]: 'bg-pink',
    [statusLabels[Constants.newsStatuses.published]]: 'bg-purple',
    [statusLabels[Constants.newsStatuses.refused]]: 'bg-error',
    [statusLabels[Constants.newsStatuses.deleted]]: 'bg-error',
  };

  return (
    <div>
      <div className='mb-4 flex items-center space-x-4'>
        <Search search={t('search')} />
        <Dropdown title={t('filters.all')} items={filters} />
      </div>
      <table className='table w-full rounded-lg'>
        <thead className='bg-base-300 rounded-t-lg h-17'>
          <tr className='text-base-content text-base font-bold'>
            <th className='rounded-tl-lg'>{t('table.title')}</th>
            <th>{t('table.release-date')}</th>
            <th>{t('table.event-date')}</th>
            <th>{t('table.number-of-views')}</th>
            <th>{t('table.status')}</th>
            <th className='w-[10%] rounded-tr-lg'></th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication, index) => (
            <tr key={index} className="border-b-2 border-base-300">
              <td className='text-base'>{publication.title} </td>
              <td>{publication.releasedDate}</td>
              <td>{publication.eventdate}</td>
              <td>{publication.numberOfViews}</td>
              <td className='text-base'>
                <div className={`py-4 px-4 badge ${statusColorMapping[statusLabels[publication.status]] || 'badge-neutral'} text-black`}>
                  {t(`filters.${statusLabels[publication.status]}`)}
                </div>
              </td>
              <td className='text-base'>
                <button className='btn btn-accent w-full'>
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
