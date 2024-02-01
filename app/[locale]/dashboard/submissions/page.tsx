import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Search from '@/components/Search';
import Constants from '@/constants';

type Props = {
  params: { locale: string };
};

export default function Submissions({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Submissions');

  const submissions = [
    { clientName: 'Alice Smith', clientEmail: 'alice.smith@gmail.com', phoneNumber:'(450) 123 - 4355', company: 'Ville de mascouche', title: 'À Maschouche on est pas des jambons', budget: '2500', phase: Constants.projectPhases.postproduction },
    { clientName: 'Bob Johnson', clientEmail: 'bob.johnson.1@hotmail.com', phoneNumber:'(514) 214 - 3224', company: 'Skyspa', title: 'Des spas relaxant', budget: '2000', phase: Constants.projectPhases.preproduction },
    { clientName: 'Joly Ranchers', clientEmail: 'ets@hotmail.com', phoneNumber:'(438) 214 - 3224', company: 'École de technologie supérieure', title: 'Pour un avenir meilleur', budget: '5000', phase: Constants.projectPhases.production },
    { clientName: 'Manon Louiselle Bonmatin', clientEmail: 'manon@hotmail.com', phoneNumber:'(438) 214 - 3224', company: 'Maxi', title: 'De bons repas pas cher', budget: '1245', phase: Constants.projectPhases.done },
  ];

  return (
    <div>
      <div className='mb-4 flex items-center space-x-4'>
        <Search search={t('search')} />
      </div>
      <table className='table w-full rounded-lg'>
        <thead className='bg-base-300 rounded-t-lg h-17'>
          <tr className='text-base-content text-base font-bold'>
            <th className='rounded-tl-lg'>{t('table.name')}</th>
            <th>{t('table.company')}</th>
            <th>{t('table.title')}</th>
            <th>{t('table.budget')}</th>
            <th className='w-[10%] rounded-tr-lg'></th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index} className="border-b-2 border-base-300">
              <td className='text-base'>
                <div>{submission.clientName}</div>
                <div className='text-secondary'>{submission.clientEmail}</div>
                <div className='text-secondary'>{submission.phoneNumber}</div>
              </td>
              <td>{submission.company}</td>
              <td>{submission.title}</td>
              <td className='text-base'>{submission.budget} $</td>
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
  