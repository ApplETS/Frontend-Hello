'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { faArrowLeft, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Constants from '@/utils/constants';
import Image from 'next/image';
import Search from '@/components/Search';

import { Organizer } from '@/models/organizer';
import AskEmail from '@/components/modals/AskEmail';
import { ToastDelay, useToast } from '@/utils/provider/ToastProvider';
import { AlertType } from '@/components/Alert';
import Avatar from '@/components/Avatar';
import NewsList from './components/NewsList';

type Props = {
	organizer: Organizer;
	locale: string;
};

export default function ProfileClient({ organizer, locale }: Props) {
	const t = useTranslations('Profile');
	const router = useRouter();
	const [askEmailModal, setAskEmailModal] = useState(false);
	const { setToast } = useToast();
	const [searchTerm, setSearchTerm] = useState('');

	const notify = () => {
		// TODO : Add notification
		// const success = await sendNotifivation(email);
		// if (success) publication!.state = NewsStates.REFUSED;
		const success = 'success';

		setToast(
			t(`email-${success ? 'success' : 'error'}-toast-message`),
			success ? AlertType.success : AlertType.error,
			ToastDelay.long
		);
		setAskEmailModal(false);
	};

	return (
		<div className="w-full h-full overflow-auto">
			<div className="flex flex-row gap-8 h-full overflow-auto">
				<FontAwesomeIcon
					icon={faArrowLeft}
					onClick={() => router.push(`/${locale}/dashboard/news`)}
					className="cursor-pointer"
					size="xl"
				/>
				<div className="w-1/4 flex-none mt-5">
					<div className="flex flex-col items-center">
						<div className="avatar mb-2">
							<Avatar userProfile={organizer} size="w-40" color="bg-base-300" textSize="text-7xl" />
						</div>
						<p className="text-xl font-bold">{organizer.organization}</p>
						<h4 className="mb-2 text-sm text-secondary">{organizer.activityArea}</h4>
						<p className="text-sm mb-4 text-center">{organizer.profileDescription}</p>
						<div className="flex items-center mb-2">
							<button className="btn btn-accent w-64" onClick={() => setAskEmailModal(true)}>
								{t('notify-me')}
							</button>
							<div
								className="tooltip tooltip-bottom ml-2"
								data-tip={t('tooltip-notify-me', { author: organizer.name })}
							>
								<button className="btn btn-circle bg-base-300 btn-sm text-xs h-8 w-8 flex items-center justify-center">
									?
								</button>
							</div>
						</div>

						<p className="text-lg mb-2 mt-2 self-start w-full text-bold">{t('informations')}</p>

						<div className="w-full">
							<div className="flex flex-col">
								{organizer.webSiteLink && (
									<div className="flex justify-between items-center mb-4">
										<div className="flex items-center text-secondary">
											<FontAwesomeIcon icon={faGlobe} size="lg" className="mr-2" />
											<p>{t('website')}</p>
										</div>
										<a
											href={organizer.webSiteLink}
											target="_blank"
											rel="noopener noreferrer"
											className="underline text-right"
										>
											{organizer.webSiteLink}
										</a>
									</div>
								)}

								{organizer.email && (
									<div className="flex justify-between items-center mb-4">
										<div className="flex items-center text-secondary">
											<FontAwesomeIcon icon={faEnvelope} size="lg" className="mr-2" />
											<p>{t('email')}</p>
										</div>
										<a
											href={`mailto:${organizer.email}`}
											target="_blank"
											rel="noopener noreferrer"
											className="underline text-right"
										>
											{organizer.email}
										</a>
									</div>
								)}
							</div>
						</div>

						<div className="flex mt-2">
							<div className="grid grid-cols-5 gap-3 w-full">
								{organizer.socials &&
									organizer.socials.map((social, index) => (
										<a href={social.link} target="_blank" rel="noopener noreferrer" key={index} className="avatar">
											<Image src={social.icon} alt={social.inputName} width={40} height={40} />
										</a>
									))}
							</div>
						</div>

						{organizer.interests && organizer.interests.length > 0 && (
							<>
								<p className="text-lg mb-2 mt-5 self-start w-full text-bold">{t('interests')}</p>
								<div className="flex flex-wrap gap-2 self-start w-full">
									{organizer.interests.map((tag, index) => (
										<div
											key={tag}
											className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}
										>
											{tag}
										</div>
									))}
								</div>
							</>
						)}
					</div>
				</div>

				<div className="w-full flex flex-col h-full">
					<div className="pb-2 pt-1">
						<Search search={t('search')} onSearchTermChange={(search) => setSearchTerm(search)} />
					</div>
					<NewsList organizerId={organizer.id} locale={locale} searchTerm={searchTerm} />
				</div>

				{askEmailModal && <AskEmail onClose={() => setAskEmailModal(false)} onSend={notify} />}
			</div>
		</div>
	);
}
