import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import EventDateAndImage from '@/components/EventDateAndImage';
import { HelloEvent } from '@/models/hello-event';
import { getNextEvents } from '@/app/actions/get-next-events';
import Markdown from 'react-markdown';
import style from '@/markdown-styles.module.css';
import Constants from '@/utils/constants';
import Skeleton from 'react-loading-skeleton';
import { useToast } from '@/utils/provider/ToastProvider';
import { AlertType } from '@/components/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

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
		<div className="px-4 pt-4 mb-2">
			<Skeleton height={40} />
		</div>
		<div className="h-10"></div>
		<div className="pl-4 pr-40">
			<Skeleton />
		</div>
		<div className="mb-1">
			<Skeleton height={215} />
		</div>
		<div className="grid grid-rows-1 gap-1 px-4 pt-3 pb-3">
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<Skeleton />
			<div className="h-14"></div>
		</div>
	</div>
);

interface NewsListProps {
	organizerId: string;
	locale: string;
	searchTerm: string;
}

export default function NewsList({ organizerId, locale, searchTerm }: NewsListProps) {
	const nbOfEventsPerPage = 9;
	const t = useTranslations('Profile');
	const { setToast } = useToast();
	const [filteredPublications, setFilteredPublications] = useState<HelloEvent[]>([]);
	const [allNewsLoaded, setAllNewsLoaded] = useState(false);
	const [page, setPage] = useState(1);
	const [isLoading, startTransition] = useTransition();
	const [showScrollTopButton, setShowScrollTopButton] = useState(false);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
	const observer = useRef<IntersectionObserver | null>(null);
	const lastEventRef = useRef<HTMLDivElement | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

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
		const handler = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 1000);

		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm]);

	useEffect(() => {
		startTransition(async () => {
			const response = await getNextEvents(1, nbOfEventsPerPage, organizerId, debouncedSearchTerm);

			if (response) {
				const newEvents = response.data;
				setAllNewsLoaded(newEvents.length >= response.totalRecords);
				setFilteredPublications(newEvents);
			} else {
				setToast(t('error-loading-news'), AlertType.error);
			}
		});
	}, [debouncedSearchTerm]);

	useEffect(() => {
		if (!allNewsLoaded) {
			startTransition(async () => {
				const response = await getNextEvents(page, nbOfEventsPerPage, organizerId, searchTerm);

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
		<div className="flex-grow overflow-auto no-scrollbar pl-1" ref={scrollContainerRef}>
			<div className="grid grid-cols-3 gap-4 mt-2">
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
	);
}
