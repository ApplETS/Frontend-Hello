import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Dropdown from '@/components/Dropdown';
import Search from '@/components/Search';
import Constants from '@/constants';

type Props = {
  params: { locale: string };
};

export default function Submissions({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Approbations');

  const currentDate = new Date();

  const dateInFrench = new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(currentDate);

  const dateInEnglish = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(currentDate);

  const approbations = [
    { author: 'App|ETS', activity: "Club scientique", title: 'Compétition AMC', releasedDate: dateInFrench, eventdate: dateInFrench, status: Constants.newsStatuses.approved },
    { author: 'Capra', activity: "Club scientique", title: 'Séance d\'informations', releasedDate: dateInFrench, eventdate: dateInFrench, status: Constants.newsStatuses.deleted },
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
    [statusLabels[Constants.newsStatuses.refused]]: 'bg-red',
    [statusLabels[Constants.newsStatuses.deleted]]: 'bg-red',
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
                <img src="https://example.com/path/to/image.jpg" alt="Description" className="w-10 h-10 rounded-full" />
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
  