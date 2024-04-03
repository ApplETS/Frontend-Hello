'use client';

import React, { useEffect, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { faArrowLeft, faArrowUp, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Constants from '@/utils/constants';
import Image from 'next/image';
import Search from '@/components/Search';
import EventDateAndImage from '@/components/EventDateAndImage';

import { Organizer } from '@/models/organizer';
import style from '@/markdown-styles.module.css';

import Markdown from 'react-markdown';
import AskEmail from '@/components/modals/AskEmail';
import { ToastDelay, useToast } from '@/utils/provider/ToastProvider';
import { AlertType } from '@/components/Alert';
import Avatar from '@/components/Avatar';
import Skeleton from 'react-loading-skeleton';
import { HelloEvent } from '@/models/hello-event';
import { getNextEvents } from '@/app/actions/get-next-events';

type Props = {
	organizer: Organizer;
	locale: string;
};

interface EventProps {
	event: HelloEvent;
	locale: string;
}

const EventCard = ({ event, locale }: EventProps) => (
	<div className="card justify-center w-full rounded-lg bg-base-200">
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
				<div style={{ position: 'relative' }}>
					<Markdown className={`${style.reactMarkDown} p-2`}>{event.content}</Markdown>
				</div>
			</div>
		</div>
		<div className="flex flex-wrap gap-2 p-6">
			<div className="flex flex-wrap gap-2 overflow-x-auto">
				{event.tags.map((tag, index) => (
					<div
						key={tag.id}
						className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}
					>
						{tag.name}
					</div>
				))}
			</div>
		</div>
	</div>
);

const EventCardSkeleton = () => (
	<div className="card justify-center w-full rounded-lg bg-base-200">
		<div className="px-4 pt-4 h-24 mb-2">
			<Skeleton height={40} />
		</div>
		<div className="pl-4 pr-40">
			<Skeleton />
		</div>
		<div className="mb-1">
			<Skeleton height={180} />
		</div>
		<div className="grid grid-rows-1 gap-1 px-4 pt-3 pb-3">
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</div>
	</div>
);

export default function ProfileClient({ organizer, locale }: Props) {
	const nbOfEventsPerPage = 9;

	const t = useTranslations('Profile');
	const router = useRouter();
	const [askEmailModal, setAskEmailModal] = useState(false);
	const { setToast } = useToast();
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredPublications, setFilteredPublications] = useState<HelloEvent[]>([]);
	const [showScrollTopButton, setShowScrollTopButton] = useState(false);
	const [allNewsLoaded, setAllNewsLoaded] = useState(false);
	const [page, setPage] = useState(1);
	const [isLoading, startTransition] = useTransition();
	const observer = useRef<IntersectionObserver | null>(null);
	const lastEventRef = useRef<HTMLDivElement | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleSearchChanged = (search: string) => {
		setSearchTerm(search);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (scrollContainerRef.current) {
				if (scrollContainerRef.current.scrollTop > 300) {
					setShowScrollTopButton(true);
				} else {
					setShowScrollTopButton(false);
				}
			}
		};

		const scrollContainer = scrollContainerRef.current;
		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);

	useEffect(() => {
		if (!allNewsLoaded) {
			startTransition(async () => {
				const response = await getNextEvents(page, nbOfEventsPerPage, organizer.id);

				if (response) {
					const newEvents = [...filteredPublications, ...response.data];
					setAllNewsLoaded(newEvents.length >= response.totalRecords);
					setFilteredPublications(newEvents);
				} else {
					setToast(t('error-loading-news'), AlertType.error);
				}
			});
		}
	}, [page]);

	useEffect(() => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !isLoading) {
				setPage((prevPage) => prevPage + 1);
			}
		});
		if (lastEventRef.current) observer.current.observe(lastEventRef.current);
		return () => {
			if (observer.current) observer.current.disconnect();
		};
	}, [lastEventRef.current, isLoading]);

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

	const scrollToTop = () => {
		const scrollContainer = scrollContainerRef.current;
		if (scrollContainer) {
			scrollContainer.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
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
						<p className="text-xl font-bold">{organizer.name}</p>
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

				<div className="flex-grow overflow-auto no-scrollbar pt-1 pl-1" ref={scrollContainerRef}>
					<Search search={t('search')} onSearchTermChange={handleSearchChanged} />
					<div className="grid grid-cols-3 gap-4 mt-4">
						{filteredPublications.map((event, index) => (
							<div
								className="card justify-center w-full rounded-lg bg-base-200"
								key={index}
								ref={index === filteredPublications.length - 1 ? lastEventRef : null}
							>
								<EventCard event={event} locale={locale} />
							</div>
						))}
						{isLoading && Array.from({ length: 3 }).map((_, index) => <EventCardSkeleton key={index} />)}
					</div>
				</div>

				{askEmailModal && <AskEmail onClose={() => setAskEmailModal(false)} onSend={notify} />}
				{showScrollTopButton && (
					<button
						onClick={scrollToTop}
						className="fixed bottom-8 right-8 btn btn-circle btn-primary shadow-xl"
						aria-label="Scroll to top"
					>
						<FontAwesomeIcon icon={faArrowUp} size="xl" />
					</button>
				)}
			</div>
		</div>
	);
}
