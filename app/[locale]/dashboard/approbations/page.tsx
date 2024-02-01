import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Dropdown from '@/components/Dropdown';
import Search from '@/components/Search';
import Constants from '@/constants';
import { formatDate } from '@/utils/supabase/formatDate';

type Props = {
  params: { locale: string };
};

export default function Submissions({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Approbations');

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, locale);

  const approbations = [
    { author: 'App|ETS', activity: "Club scientique", title: 'Compétition AMC', releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.approved },
    { author: 'App|ETS', activity: "Club scientique", title: 'Compétition AMC', releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.deleted },
    { author: 'App|ETS', activity: "Club scientique", title: 'Compétition AMC', releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.draft },
    { author: 'App|ETS', activity: "Club scientique", title: 'Compétition AMC', releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.onHold },
    { author: 'App|ETS', activity: "Club scientique", title: 'Compétition AMC', releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.published },
    { author: 'Capra', activity: "Club scientique", title: 'Séance d\'informations', releasedDate: formattedDate, eventdate: formattedDate, status: Constants.newsStatuses.refused },
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
            <th className='rounded-tl-lg'>{t('table.author')}</th>
            <th>{t('table.title')}</th>
            <th>{t('table.release-date')}</th>
            <th>{t('table.status')}</th>
            <th className='w-[10%] rounded-tr-lg'></th>
          </tr>
        </thead>
        <tbody>
          {approbations.map((approbation, index) => (
            <tr key={index} className="border-b-2 border-base-300">
              <td className='text-base flex items-center space-x-2'>
                <img src="https://placehold.co/500x500" alt="Placeholder" className="w-10 h-10 mr-3 rounded-full"></img>
                <div>
                  <div>{approbation.author}</div>
                  <div className='text-secondary'>{approbation.activity}</div>
                </div>
              </td>
              <td>{approbation.title}</td>
              <td>{approbation.releasedDate}</td>
              <td className='text-base'>
                <div className={`py-4 px-4 badge ${statusColorMapping[statusLabels[approbation.status]] || 'badge-neutral'} text-black`}>
                  {t(`filters.${statusLabels[approbation.status]}`)}
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
  