import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';
import Constants from '@/constants';

type Props = {
  params: { locale: string };
};

export default function Projects({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Projects');

  const projects = [
    { clientName: 'Alice Smith', clientEmail: 'alice.smith@gmail.com', phoneNumber:'(450) 123 - 4355', company: 'Ville de mascouche', title: 'À Maschouche on est pas des jambons', budget: '2500', phase: Constants.projectPhases.postproduction },
    { clientName: 'Bob Johnson', clientEmail: 'bob.johnson.1@hotmail.com', phoneNumber:'(514) 214 - 3224', company: 'Skyspa', title: 'Des spas relaxant', budget: '2000', phase: Constants.projectPhases.preproduction },
    { clientName: 'Joly Ranchers', clientEmail: 'ets@hotmail.com', phoneNumber:'(438) 214 - 3224', company: 'École de technologie supérieure', title: 'Pour un avenir meilleur', budget: '5000', phase: Constants.projectPhases.production },
    { clientName: 'Manon Louiselle Bonmatin', clientEmail: 'manon@hotmail.com', phoneNumber:'(438) 214 - 3224', company: 'Maxi', title: 'De bons repas pas cher', budget: '1245', phase: Constants.projectPhases.done },
  ];

  const phaseLabels = {
    [Constants.projectPhases.preproduction]: 'preproduction',
    [Constants.projectPhases.production]: 'production',
    [Constants.projectPhases.postproduction]: 'postproduction',
    [Constants.projectPhases.done]: 'done',
    [Constants.projectPhases.canceled]: 'canceled',
  };
  
  const filters = [
    t(`filters.${phaseLabels[Constants.projectPhases.preproduction]}`),
    t(`filters.${phaseLabels[Constants.projectPhases.production]}`),
    t(`filters.${phaseLabels[Constants.projectPhases.postproduction]}`),
    t(`filters.${phaseLabels[Constants.projectPhases.done]}`),
    t(`filters.${phaseLabels[Constants.projectPhases.canceled]}`)
  ];
  
  const phaseColorMapping = {
    [phaseLabels[Constants.projectPhases.preproduction]]: 'badge-accent',
    [phaseLabels[Constants.projectPhases.production]]: 'bg-purple',
    [phaseLabels[Constants.projectPhases.postproduction]]: 'bg-blue',
    [phaseLabels[Constants.projectPhases.done]]: 'bg-green',
    [phaseLabels[Constants.projectPhases.canceled]]: 'bg-orange',
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
            <th className='rounded-tl-lg'>{t('table.name')}</th>
            <th>{t('table.company')}</th>
            <th>{t('table.title')}</th>
            <th>{t('table.budget')}</th>
            <th>{t('table.phase.title')}</th>
            <th className='w-[10%] rounded-tr-lg'></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="border-b-2 border-base-300">
              <td className='text-base'>
                <div>{project.clientName}</div>
                <div className='text-secondary'>{project.clientEmail}</div>
                <div className='text-secondary'>{project.phoneNumber}</div>
              </td>
              <td>{project.company}</td>
              <td>{project.title}</td>
              <td className='text-base'>{project.budget} $</td>
              <td className='text-base'>
                <div className={`py-4 px-4 badge ${phaseColorMapping[phaseLabels[project.phase]] || 'badge-neutral'} text-black`}>
                  {t(`filters.${phaseLabels[project.phase]}`)}
                </div>
              </td>
              <td className='text-base'>
                <button className='btn btn-accent w-full'>
                  {t('table.show')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
