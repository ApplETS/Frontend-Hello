'use client';

import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import UnsubscribeClient from './clientPage';

interface Props {
	params: { token: string };
}

export default function Unsubscribe({ params: { token } }: Props) {
	const t = useTranslations('UnsubscribeEmail');

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<FontAwesomeIcon icon={faEnvelope} size="5x" className="text-green" />
			<p className="text-4xl font-bold mt-8">{t('title')}</p>
			<p className="text-2xl mt-2">{t('message')}</p>
			<button className="btn btn-primary mt-4">{t('back')}</button>
			<UnsubscribeClient token={token} />
		</div>
	);
}
