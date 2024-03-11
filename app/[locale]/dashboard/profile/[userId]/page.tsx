'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { faArrowLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { MDXEditor, linkDialogPlugin, linkPlugin } from '@mdxeditor/editor';
import { HelloEvent } from '@/models/hello-event';
import { Organizer } from '@/models/Organizer';
import Constants from '@/utils/constants';
import Image from 'next/image';
import Search from '@/components/Search';
import EventDateAndImage from '@/components/EventDateAndImage';

import facebookIcon from '@/public/Socials/Facebook.svg';
import discordIcon from '@/public/Socials/Discord.svg';
import instagramIcon from '@/public/Socials/Instagram.svg';
import linkedinIcon from '@/public/Socials/Linkedin.svg';
import tiktokIcon from '@/public/Socials/Tiktok.svg';
import redditIcon from '@/public/Socials/Reddit.svg';
import xIcon from '@/public/Socials/X.svg';

type Props = {
	params: { locale: string; userId: string };
};

export default function Profile({ params: { locale, userId } }: Props) {
	const { isLight } = useTheme();
	const t = useTranslations('Profile');
	const router = useRouter();

	// TODO : Change with the real user, the user id is in userId
	const user: Organizer = {
		id: 'some-unique-id',
		name: 'Prénom Nom',
		email: 'applets@ens.etsmtl.ca',
		type: null,
		organisation: null,
		activityArea: 'Club scientifique',
		imageUrl: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
		profileDescription: 'Je suis une description longue longue longue longue longue longue longue longue longue.',
		interests: ['Développement mobile', 'Conférence', 'Programmation', 'Génie logiciel'],
		socials: [
			{ icon: facebookIcon, inputName: 'facebook', link: 'https://www.facebook.com/' },
			{ icon: discordIcon, inputName: 'discord', link: 'https://discord.com/' },
			{ icon: instagramIcon, inputName: 'instagram', link: 'https://www.instagram.com/' },
			{ icon: linkedinIcon, inputName: 'linkedin', link: 'https://www.linkedin.com/feed/' },
			{ icon: tiktokIcon, inputName: 'tiktok', link: 'https://www.tiktok.com/' },
			{ icon: redditIcon, inputName: 'reddit', link: 'https://www.reddit.com/' },
			{ icon: xIcon, inputName: 'x', link: 'https://twitter.com/' },
		],
		webSiteLink: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	// TODO : Change the "t('notify-me')"" with the user preference
	const [notifyButtonTitle, setNotifyButtonTitle] = useState(t('notify-me'));

	// TODO : Change to the real publications
	const publications: HelloEvent[] = [
		{
			id: '1',
			title:
				'Compétition de développement mobile en 24 heures top chrono et oui cest bien chronométré avec un minuteur',
			content:
				"AMC est une compétition de développement mobile organisée par ApplETS, un club étudiant de l'ÉTS. La compétition à lieu du 27 au 28 janvier 2024. Que vous soyez un étudiant universitaire ou collégial, novice ou expérimenté en développement.",
			imageUrl: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
			state: 1,
			publicationDate: '2023-03-11T15:00:00.000Z',
			eventStartDate: '2023-03-11T15:00:00.000Z',
			eventEndDate: '2023-03-11T16:00:00.000Z',
			createdAt: '2023-03-11T15:00:00.000Z',
			updatedAt: '2023-03-11T15:00:00.000Z',
			moderator: null,
			organizer: null,
			tags: ['Développement mobile', 'ApplETS', 'Club scientifique'],
		},
		{
			id: '2',
			title: 'Conférence (Pas même jour mais même mois)',
			content:
				"AMC est une compétition de développement mobile organisée par ApplETS, un club étudiant de l'ÉTS. La compétition à lieu du 27 au 28 janvier 2024. Que vous soyez un étudiant universitaire ou collégial, novice ou expérimenté en développement.",
			imageUrl: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
			state: 1,
			publicationDate: '2023-03-11T15:00:00.000Z',
			eventStartDate: '2023-03-11T15:00:00.000Z',
			eventEndDate: '2023-03-12T16:00:00.000Z',
			createdAt: '2023-03-11T15:00:00.000Z',
			updatedAt: '2023-03-11T15:00:00.000Z',
			moderator: null,
			organizer: null,
			tags: ['Développement mobile', 'ApplETS', 'Club scientifique'],
		},
		{
			id: '2',
			title: 'Conférence (Pas même jour et pas même mois)',
			content:
				"AMC est une compétition de développement mobile organisée par ApplETS, un club étudiant de l'ÉTS. La compétition à lieu du 27 au 28 janvier 2024. Que vous soyez un étudiant universitaire ou collégial, novice ou expérimenté en développement.",
			imageUrl: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
			state: 1,
			publicationDate: '2023-03-11T15:00:00.000Z',
			eventStartDate: '2023-03-11T15:00:00.000Z',
			eventEndDate: '2023-04-12T16:00:00.000Z',
			createdAt: '2023-03-11T15:00:00.000Z',
			updatedAt: '2023-03-11T15:00:00.000Z',
			moderator: null,
			organizer: null,
			tags: ['Développement mobile', 'ApplETS', 'Club scientifique'],
		},
		{
			id: '3',
			title: 'Conférence (Sans date de fin)',
			content:
				"AMC est une compétition de développement mobile organisée par ApplETS, un club étudiant de l'ÉTS. La compétition à lieu du 27 au 28 janvier 2024. Que vous soyez un étudiant universitaire ou collégial, novice ou expérimenté en développement.",
			imageUrl: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
			state: 1,
			publicationDate: '2023-03-11T15:00:00.000Z',
			eventStartDate: '2023-03-11T15:00:00.000Z',
			eventEndDate: '',
			createdAt: '2023-03-11T15:00:00.000Z',
			updatedAt: '2023-03-11T15:00:00.000Z',
			moderator: null,
			organizer: null,
			tags: ['Développement mobile', 'ApplETS', 'Club scientifique'],
		},
	];

	// SEARCH
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredPublications, setFilteredPublications] = useState(publications);
	const handleSearchChanged = (search: string) => {
		setSearchTerm(search);
	};
	useEffect(() => {
		const filtered = publications.filter(
			(publication) => searchTerm === '' || publication.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredPublications(filtered);
	}, [searchTerm]);

	// TODO : Add notification
	const notify = () => {
		if (notifyButtonTitle === t('notify-me')) {
			setNotifyButtonTitle(t('dont-notify-me'));
		} else {
			setNotifyButtonTitle(t('notify-me'));
		}
		alert('Not implemented yet');
	};

	return (
		<div className="w-full">
			<div className="flex flex-row gap-4">
				<FontAwesomeIcon icon={faArrowLeft} onClick={() => router.back()} className="cursor-pointer" size="xl" />
				<div className="w-1/4 flex-none mt-5">
					<div className="flex flex-col items-center">
						<div className="avatar">
							<div className="w-40 mb-2 rounded-full">
								<img alt="Profile" src={user.imageUrl} />
							</div>
						</div>
						<p className="text-xl font-bold">{user.name}</p>
						<h4 className="mb-2">{user.activityArea}</h4>
						<p className="text-sm mb-4 text-center">{user.profileDescription}</p>
						<button className="btn btn-accent w-64 mb-4" onClick={notify}>
							{notifyButtonTitle}
						</button>

						<div className="flex justify-center mb-8 mt-5">
							<div className="grid grid-cols-4 gap-6 items-center justify-items-center w-full">
								{user.email && (
									<div className="avatar bg-lightblue rounded-full p-2 inline-flex items-center justify-center w-12 h-12">
										<a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer" className="avatar">
											<FontAwesomeIcon icon={faEnvelope} className="text-black" size="xl" />
										</a>
									</div>
								)}

								{user.socials.map((social, index) => (
									<a href={social.link} target="_blank" rel="noopener noreferrer" key={index} className="avatar">
										<Image src={social.icon} alt={social.inputName} width={40} height={40} />
									</a>
								))}
							</div>
						</div>

						<h3 className="text-lg mb-2 mt-5 self-start w-full">{t('interests')}</h3>

						<div className="flex flex-wrap gap-2 self-start w-full">
							{user.interests.map((tag, index) => (
								<div
									key={tag}
									className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}
								>
									{tag}
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="flex-grow">
					<Search search={t('search')} onSearchTermChange={handleSearchChanged} />
					<div className="grid grid-cols-3 gap-4 mt-4">
						{filteredPublications.map((event, index) => (
							<div className="card justify-center w-full rounded-lg bg-base-200" key={index}>
								<div className="grid grid-rows-[auto_auto_auto_1fr_auto] rounded-3xl h-full">
									<div className="text-xl font-bold px-4 pt-4 h-24 overflow-hidden line-clamp-3">
										<div className="mb-2">{event.title}</div>
									</div>
									<EventDateAndImage
										eventStartDate={event.eventStartDate}
										eventEndDate={event.eventEndDate}
										imageUrl={event.imageUrl}
										locale={locale}
									/>
									<div className="text-sm text-justify font-light p-2 whitespace-normal overflow-y-auto h-44">
										<MDXEditor
											className={` text-sm text-justify ${
												isLight ? 'light-theme light-editor text-sm' : 'dark-theme dark-editor'
											}`}
											plugins={[linkPlugin(), linkDialogPlugin()]}
											markdown={event.content}
										/>
									</div>
								</div>
								<div className="flex flex-wrap gap-2 p-6">
									<div className="flex flex-wrap gap-2 overflow-x-auto">
										{event.tags.map((tag, index) => (
											<div
												key={tag}
												className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}
											>
												{tag}
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
