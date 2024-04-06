import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import EventDateAndImage from '@/components/EventDateAndImage';
import { HelloEvent } from '@/models/hello-event';
import { getNextEvents } from '@/app/actions/get-next-events';
import Markdown from 'react-markdown';
import style from '@/markdown-styles.module.css';
import Constants from '@/utils/constants';
import { useToast } from '@/utils/provider/ToastProvider';
import { AlertType } from '@/components/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Skeleton from '@/components/Skeleton';

interface EventProps {
	event: HelloEvent;
	locale: string;
}

const EventCard = ({ event, locale }: EventProps) => (
	<div className="flex flex-col rounded-3xl h-[36rem]">
		<div className="text-xl font-bold basis-[20%] p-4 overflow-hidden">
			<div className="line-clamp-2">
				{event.title}
				{event.title}
				{event.title}
			</div>
		</div>
		<EventDateAndImage
			eventStartDate={event.eventStartDate}
			eventEndDate={event.eventEndDate}
			imageUrl={event.imageUrl}
			locale={locale}
			customStyle="basis-[30%]"
		/>
		<div
			className={`text-sm text-justify p-2 mb-5 font-light whitespace-normal overflow-y-auto ${
				event.tags.length > 0 ? 'basis-[40%]' : 'basis-[60%]'
			}`}
		>
			<div style={{ position: 'relative' }}>
				<Markdown
					className={`${style.reactMarkDown} p-2`}
				>{`${event.content}${event.content}${event.content}${event.content}${event.content}${event.content}${event.content}${event.content}`}</Markdown>
			</div>
		</div>
		{event.tags.length > 0 && (
			<div className={`flex flex-row gap-2 p-2 pb-14 mx-2 overflow-x-auto basis-[10%]`}>
				{event.tags.map((tag, index) => (
					<div
						key={tag.id}
						className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}
					>
						{tag.name}
					</div>
				))}
				{event.tags.map((tag, index) => (
					<div
						key={tag.id}
						className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}
					>
						{tag.name}
					</div>
				))}
				{event.tags.map((tag, index) => (
					<div
						key={tag.id}
						className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}
					>
						{tag.name}
					</div>
				))}
				{event.tags.map((tag, index) => (
					<div
						key={tag.id}
						className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}
					>
						{tag.name}
					</div>
				))}
				{event.tags.map((tag, index) => (
					<div
						key={tag.id}
						className={`badge ${Constants.colors[index]} text-black py-4 px-4 flex items-center whitespace-nowrap`}
					>
						{tag.name}
					</div>
				))}
			</div>
		)}
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
		const handler = setTimeout(() => {
			setFilteredPublications([]);
			setDebouncedSearchTerm(searchTerm);
		}, 1000);

		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm]);

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
						className="card justify-center w-full rounded-lg bg-base-200 h-full"
						key={index}
						ref={index === filteredPublications.length - 1 ? lastEventRef : null}
					>
						<EventCard event={event} locale={locale} />
					</div>
				))}
				{isLoading && Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} />)}
			</div>

			{!isLoading && filteredPublications.length === 0 && (
				<div className="text-center my-10">{t('no-results-message')}</div>
			)}

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
