'use client';

import { unsubscribeFromOrganizer } from '@/lib/subscriptions/actions/unsubscribe-from-organizer';
import { useLoading } from '@/utils/provider/LoadingProvider';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';

interface Props {
	token: string;
}

export default function UnsubscribeClient({ token }: Readonly<Props>) {
	const t = useTranslations('UnsubscribeEmail');

	const { startTransition } = useLoading();

	useEffect(() => {
		startTransition(async () => {
			await unsubscribeFromOrganizer(token);
		});
	}, []);

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<FontAwesomeIcon icon={faEnvelope} size="5x" className="text-green" />
			<p className="text-4xl font-bold mt-8">{t('title')}</p>
			<p className="text-2xl mt-2">{t('message')}</p>
			<button className="btn btn-primary mt-4">{t('back')}</button>
		</div>
	);
}
