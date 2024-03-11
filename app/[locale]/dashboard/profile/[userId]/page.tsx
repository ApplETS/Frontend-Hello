'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';
import Search from '@/components/Search';
import { faArrowLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Constants from '@/utils/constants';
import facebookIcon from '@/public/Socials/Facebook.svg';
import discordIcon from '@/public/Socials/Discord.svg';
import instagramIcon from '@/public/Socials/Instagram.svg';
import linkedinIcon from '@/public/Socials/Linkedin.svg';
import tiktokIcon from '@/public/Socials/Tiktok.svg';
import redditIcon from '@/public/Socials/Reddit.svg';
import xIcon from '@/public/Socials/X.svg';
import Image from 'next/image';
import { MDXEditor, linkDialogPlugin, linkPlugin } from '@mdxeditor/editor';
import { useRouter } from 'next/navigation';

type Props = {
	params: { locale: string; userId: string };
};

export default function Profile({ params: { locale, userId } }: Props) {
	const { isLight } = useTheme();
	const t = useTranslations('Profile');
	const router = useRouter();

	// TODO : Change with the real user
	console.log(userId);
	const user = {
		name: 'Prénom Nom',
		email: 'applets@ens.etsmtl.ca',
		description: 'Je suis une description longue longue longue longue longue longue longue longue longue.',
		// TODO : Change with the real tags
		interests: ['Développement mobile', 'Conférence', 'Programmation', 'Génie logiciel'],
		// TODO : Change with the real socials
		socials: [
			{ icon: facebookIcon, inputName: 'facebook', link: 'https://www.facebook.com/' },
			{ icon: discordIcon, inputName: 'discord', link: 'https://discord.com/' },
			{ icon: instagramIcon, inputName: 'instagram', link: 'https://www.instagram.com/' },
			{ icon: linkedinIcon, inputName: 'linkedin', link: 'https://www.linkedin.com/feed/' },
			{ icon: tiktokIcon, inputName: 'tiktok', link: 'https://www.tiktok.com/' },
			{ icon: redditIcon, inputName: 'reddit', link: 'https://www.reddit.com/' },
			{ icon: xIcon, inputName: 'x', link: 'https://twitter.com/' },
		],
	};

	// TODO : Change the "t('notify-me')"" with the user preference
	const [notifyButtonTitle, setNotifyButtonTitle] = useState(t('notify-me'));

	// TODO : Change to the real publications
	const publications = [
		{
			title:
				'Compétition de développement mobile en 24 heures top chrono et oui cest bien chronométré avec un minuteur',
			description:
				"AMC est une compétition de développement mobile organisée par ApplETS, un club étudiant de l'ÉTS. La compétition à lieu du 27 au 28 janvier 2024. Que vous soyez un étudiant universitaire ou collégial, novice ou expérimenté en développement.",
			eventStartDate: new Date(2023, 3, 11, 15, 0, 0),
			eventEndDate: new Date(2023, 3, 11, 16, 0, 0),
			image: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
			club: 'Club scientifique',
			tags: ['Développement mobile', 'ApplETS', 'Club scientifique'],
		},
		{
			title: 'Pas même jour mais même mois',
			description:
				"Nous sommes ravis de vous inviter à un 5 à 7 spécial en partenariat avec Intact, où nous explorerons deux sujets passionnants : le white labelling et l'observabilité dans le monde du développement mobile.",
			eventStartDate: new Date(2023, 3, 11, 15, 0, 0),
			eventEndDate: new Date(2023, 3, 13, 16, 0, 0),
			image: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
			club: 'Club scientifique',
			tags: ['Développement mobile', 'White labelling', 'Réseautage', 'Club scientifique'],
		},
		{
			title: 'Pas même mois',
			description:
				"Nous avons le plaisir de vous inviter à une opportunité passionnante pour apprendre auprès d'experts de l'industrie. Nous sommes fiers d'accueillir des représentants de chez GOOGLE et ARCTIQ qui donneront une présentation exclusive sur DevOps et Kubernetes Anthos, et cet événement est ouvert à tous. Ils présenteront également Kubernetes Anthos, une plateforme de gestion des conteneurs qui simplifie le déploiement et la gestion des applications dans des environnements de cloud hybrides et multicloud.",
			eventStartDate: new Date(2023, 3, 11, 15, 0, 0),
			eventEndDate: new Date(2023, 4, 11, 16, 0, 0),
			image: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
			club: 'Club scientifique',
			tags: ['Devops', 'Club scientifique', 'Conférence', 'Développement mobile', 'Kubernetes'],
		},
		{
			title: 'Conférence sur le développement mobile',
			eventStartDate: new Date(2023, 3, 11, 15, 0, 0),
			eventEndDate: new Date(2023, 4, 11, 16, 0, 0),
			description:
				"Nous avons le plaisir de vous inviter à une opportunité passionnante pour apprendre auprès d'experts de l'industrie. Nous sommes fiers d'accueillir des représentants de chez GOOGLE et ARCTIQ qui donneront une présentation exclusive sur DevOps et Kubernetes Anthos, et cet événement est ouvert à tous. Ils présenteront également Kubernetes Anthos, une plateforme de gestion des conteneurs qui simplifie le déploiement et la gestion des applications dans des environnements de cloud hybrides et multicloud.",
			image: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
			club: 'Club scientifique',
			tags: ['Devops', 'Club scientifique', 'Conférence', 'Développement mobile', 'Kubernetes'],
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
								<img alt="Profile" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
							</div>
						</div>
						<h2 className="text-xl font-bold mb-2">{user.name}</h2>
						<p className="text-sm mb-4 text-center">{user.description}</p>
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
						{filteredPublications.map((publication, index) => (
							<div className="card justify-center w-full rounded-lg bg-base-200" key={index}>
								<div className="grid grid-rows-[auto_auto_auto_1fr_auto] rounded-3xl h-full">
									<div className="text-xl font-bold px-4 pt-4 h-24 overflow-hidden line-clamp-3">
										<div className="mb-2">{publication.title}</div>
									</div>
									<div className="mx-4 mt-1">
										{publication.eventStartDate && (
											<div className="text-sm font-normal">
												{/* If there is only a start date */}
												{publication.eventStartDate && !publication.eventEndDate && (
													<p>
														{new Date(publication.eventStartDate).toLocaleDateString(locale, {
															day: 'numeric',
															month: 'long',
															year: 'numeric',
															hour: 'numeric',
															minute: 'numeric',
														})}
													</p>
												)}
												{/* If there is a start date and an end date with the same day and month */}
												{publication.eventStartDate &&
													publication.eventEndDate &&
													new Date(publication.eventStartDate).getDate() ===
														new Date(publication.eventEndDate).getDate() &&
													new Date(publication.eventStartDate).getMonth() ===
														new Date(publication.eventEndDate).getMonth() && (
														<div className="mb-1">
															<span>
																{new Date(publication.eventStartDate).toLocaleDateString(locale, {
																	day: 'numeric',
																	month: 'long',
																	year: 'numeric',
																})}
																{t('from')}
																{new Date(publication.eventStartDate).toLocaleTimeString(locale, {
																	hour: 'numeric',
																	minute: 'numeric',
																})}
																{t('to')}
																{new Date(publication.eventEndDate).toLocaleTimeString(locale, {
																	hour: 'numeric',
																	minute: 'numeric',
																})}
															</span>
														</div>
													)}
												{/* If there is a start date and an end date with only the same month */}
												{publication.eventStartDate &&
													publication.eventEndDate &&
													new Date(publication.eventStartDate).getDate() !==
														new Date(publication.eventEndDate).getDate() &&
													new Date(publication.eventStartDate).getMonth() ===
														new Date(publication.eventEndDate).getMonth() && (
														<div className="mb-1">
															<span>
																{new Date(publication.eventStartDate).toLocaleDateString(locale, {
																	day: 'numeric',
																})}
																{' - '}
																{new Date(publication.eventEndDate).toLocaleDateString(locale, {
																	day: 'numeric',
																	month: 'long',
																	year: 'numeric',
																})}
																{t('from')}
																{new Date(publication.eventStartDate).toLocaleTimeString(locale, {
																	hour: 'numeric',
																	minute: 'numeric',
																})}
																{t('to')}
																{new Date(publication.eventEndDate).toLocaleTimeString(locale, {
																	hour: 'numeric',
																	minute: 'numeric',
																})}
															</span>
														</div>
													)}
												{/* If there is a start date and an end date not in the same month */}
												{publication.eventStartDate &&
													publication.eventEndDate &&
													new Date(publication.eventStartDate).getMonth() !==
														new Date(publication.eventEndDate).getMonth() && (
														<>
															<div className="mb-1">
																<span>
																	{new Date(publication.eventStartDate).toLocaleDateString(locale, {
																		day: 'numeric',
																		month: 'long',
																		year: 'numeric',
																	})}
																	{t('to')}
																	{new Date(publication.eventStartDate).toLocaleTimeString(locale, {
																		hour: 'numeric',
																		minute: 'numeric',
																	})}
																	{t('until')}
																	{new Date(publication.eventEndDate).toLocaleDateString(locale, {
																		day: 'numeric',
																		month: 'long',
																		year: 'numeric',
																	})}
																	{t('to')}
																	{new Date(publication.eventEndDate).toLocaleTimeString(locale, {
																		hour: 'numeric',
																		minute: 'numeric',
																	})}
																</span>
															</div>
														</>
													)}
											</div>
										)}
									</div>
									<div className="w-full aspect-[2/1]">
										<img src={publication.image} alt="Publication" className="w-full h-full" />
									</div>
									<div className="text-sm text-justify font-light p-2 whitespace-normal overflow-y-auto h-44">
										<MDXEditor
											className={` text-sm text-justify ${
												isLight ? 'light-theme light-editor text-sm' : 'dark-theme dark-editor'
											}`}
											plugins={[linkPlugin(), linkDialogPlugin()]}
											markdown={publication.description}
										/>
									</div>
								</div>
								<div className="flex flex-wrap gap-2 p-6">
									<div className="flex flex-wrap gap-2 overflow-x-auto">
										{publication.tags.map((tag, index) => (
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
