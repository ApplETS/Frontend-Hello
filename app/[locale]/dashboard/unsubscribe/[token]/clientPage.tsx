import { unsubscribeFromOrganizer } from '@/lib/subscriptions/actions/unsubscribe-from-organizer';
import { useLoading } from '@/utils/provider/LoadingProvider';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleXmark, faEnvelope, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';

interface Props {
	token: string;
}

export default function UnsubscribeClient({ token }: Readonly<Props>) {
	const t = useTranslations('UnsubscribeEmail');
	const { startTransition } = useLoading();
	const [error, setError] = useState(false);

	useEffect(() => {
		retry();
	}, []);

	function retry() {
		startTransition(async () => {
			const result = await unsubscribeFromOrganizer(token);
			setError(!result);
		});
	}

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			{error ? (
				<div className="w-1/2 flex flex-col justify-center items-center text-center">
					<div className="relative">
						<FontAwesomeIcon icon={faEnvelope} size="5x" className="text-red" />
						<FontAwesomeIcon icon={faCircle} size="2x" className="text-base-300 absolute top-0 right-0 -mt-2 -mr-2" />
						<FontAwesomeIcon icon={faCircleXmark} size="2x" className="text-red absolute top-0 right-0 -mt-2 -mr-2" />
					</div>
					<p className="text-4xl font-bold mt-8">{t('error-title')}</p>
					<p className="text-2xl mt-2">{t('error-message')}</p>
					<div className="grid grid-cols-2 space-x-3">
						<button className="btn btn-primary mt-4" onClick={() => retry()}>
							{t('retry')}
						</button>
						<button className="btn btn-primary mt-4">{t('back')}</button>
					</div>
				</div>
			) : (
				<>
					<FontAwesomeIcon icon={faEnvelope} size="5x" className="text-green" />
					<p className="text-4xl font-bold mt-8">{t('title')}</p>
					<p className="text-2xl mt-2">{t('message')}</p>
					<button className="btn btn-primary mt-4">{t('back')}</button>
				</>
			)}
		</div>
	);
}
