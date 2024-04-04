'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { HelloEvent } from '@/models/hello-event';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/utils/provider/ThemeProvider';
import EventDateAndImage from './EventDateAndImage';
import Constants from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import Markdown from 'react-markdown';
import style from '@/markdown-styles.module.css';
import Avatar from './Avatar';

interface Props {
	events: HelloEvent[];
	selectedCard: number | null;
	setSelectedCard: (cardId: number | null) => void;
	locale: string;
}

const cardVariants = {
	selected: {
		scale: 1.07,
		transition: { duration: 0.35 },
		zIndex: 10,
	},
	notSelected: (i: any) => ({
		scale: 1 - Math.abs(i * 0.05),
		y: i ? i * 50 : 0,
		opacity: 1 - Math.abs(i * 0.35) < 0.15 ? 0.15 : 1 - Math.abs(i * 0.35),
		zIndex: 10 - Math.abs(i),
		transition: { duration: 0.35 },
	}),
};

export const CardRotation = ({ events, selectedCard, setSelectedCard, locale }: Props) => {
	const t = useTranslations('NewsPage');
	const { isLight } = useTheme();
	const router = useRouter();
	const [{ startY, startScrollTop, isDragging }, setDragStart] = useState({
		startY: undefined as any,
		startScrollTop: undefined as any,
		isDragging: false as any,
	});
	const containerRef = useRef<any>();
	const cardRefs = useRef<any>(new Array());

	useEffect(() => {
		const { scrollHeight, clientHeight } = containerRef.current;
		const halfScroll = (scrollHeight - clientHeight) / 2;
		containerRef.current.scrollTop = halfScroll;
	}, [containerRef.current]);

	useEffect(() => {
		if (selectedCard !== null) {
			scrollToCard(selectedCard);
		}
	}, [selectedCard]);

	const handleMouseDown = (e: any) => {
		setDragStart({
			startY: e.pageY - containerRef.current.offsetTop,
			startScrollTop: containerRef.current.scrollTop,
			isDragging: true,
		});
	};

	const handleMouseMove = (e: any) => {
		if (!isDragging || selectedCard) return;
		const y = e.pageY - containerRef.current.offsetTop;
		const walk = y - startY;
		containerRef.current.scrollTop = startScrollTop - walk;
	};

	const selectCard = (card: any) => {
		setSelectedCard(selectedCard ? null : card);

		if (card && !selectedCard) {
			scrollToCard(card);
		}
	};

	const handleCardMouseUp = (e: any, card: any) => {
		if ((e.target as HTMLElement).closest('a')) {
			return;
		}
		if ((e.target as HTMLElement).closest('button')) {
			return;
		}
		if (isDragging) {
			const y = e.pageY - containerRef.current.offsetTop;
			const walk = y - startY;
			if (Math.abs(walk) < 5) selectCard(card);
		} else selectCard(card);
	};

	const scrollToCard = (cardIndex: number) => {
		const cardElement = cardRefs.current[cardIndex - 1];
		if (!cardElement) return;

		const container = containerRef.current;
		if (!container) return;

		if (cardIndex === 1) {
			container.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
			return;
		}
		const delay = 100;
		setTimeout(() => {
			const containerRect = container.getBoundingClientRect();
			const cardRect = cardElement.getBoundingClientRect();

			const scale = cardVariants.notSelected(selectedCard ? selectedCard - cardIndex : 0).scale;
			const scaledCardHeight = cardRect.height * scale;

			const scaledCardTop = cardRect.top + (cardRect.height - scaledCardHeight) / 2;

			const scrollPosition =
				scaledCardTop - containerRect.top + container.scrollTop - (containerRect.height - scaledCardHeight) / 2;

			container.scrollTo({
				top: scrollPosition,
				behavior: 'smooth',
			});
		}, delay);
	};

	const handleViewProfileClick = (e: React.MouseEvent, url: string) => {
		e.stopPropagation();
		router.push(url);
	};

	return (
		<div
			className="h-full w-full flex flex-col items-center justify-center max-w-2xl relative"
			onMouseDown={handleMouseDown}
			onMouseUp={() => setDragStart((prev) => ({ ...prev, isDragging: false }))}
			onMouseMove={handleMouseMove}
		>
			<div
				className="overflow-y-scroll w-full h-full no-visible-scrollbar relative"
				style={{
					perspective: '150px',
				}}
				ref={containerRef}
			>
				{events.map((event, i) => (
					<motion.div
						className="card relative block items-center h-fit w-4/5 my-7 mx-auto rounded-md cursor-pointer"
						key={event.cardId}
						ref={(el) => cardRefs.current.push(el)}
						onMouseUp={(e) => handleCardMouseUp(e, event.cardId)}
						variants={cardVariants}
						animate={selectedCard === event.cardId ? 'selected' : 'notSelected'}
						custom={selectedCard ? selectedCard - (event.cardId ?? 0) : 0}
					>
						<div className="flex flex-col justify-around bg-base-200 rounded-3xl h-full">
							<div className="card justify-center w-full rounded-lg bg-base-200">
								<div className="flex flex-row justify-between">
									<div className="text-xl font-bold px-4 pt-4 overflow-hidden line-clamp-3">
										<div className="mb-2">{event.title}</div>
									</div>
									{selectedCard === event.cardId ? (
										<FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} className="text-lg p-4" />
									) : (
										<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className="text-lg p-4" />
									)}
								</div>
							</div>
							<EventDateAndImage
								eventStartDate={event.eventStartDate}
								eventEndDate={event.eventEndDate}
								imageUrl={event.imageUrl}
								locale={locale}
							/>
							<div className="flex flex-row gap-2 px-6 py-2 items-center">
								<div className="avatar">
									<Avatar userProfile={event.organizer} size="w-14 h-14" textSize="text-2xl" />
								</div>
								<div className="flex flex-col pt-2 pl-2">
									<p className="text-base font-bold">{event.organizer?.organization ?? 'Organisateur'}</p>
									<p className="text-xs text-secondary">{event.organizer?.activityArea}</p>
								</div>
								{selectedCard === event.cardId && (
									<button
										className="font-normal ml-auto btn btn-primary"
										onClick={(e) => handleViewProfileClick(e, `/fr/dashboard/profile/${event.organizer?.id}`)}
									>
										{t('view-profile')}
									</button>
								)}
							</div>

							{selectedCard === event.cardId && (
								<>
									<div
										className={`text-sm text-justify font-light px-2 whitespace-normal overflow-y-auto h-44 ${
											event.tags.length > 0 ? 'mb-2' : 'mb-4'
										}`}
									>
										<Markdown className={`${style.reactMarkDown} p-2`}>{event.content}</Markdown>
									</div>
									{event.tags.length > 0 && (
										<div className="flex flex-wrap gap-2 self-start w-full px-6 mb-6">
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
								</>
							)}
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};
