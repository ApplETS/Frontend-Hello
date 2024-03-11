'use client';
import { motion } from 'framer-motion';
import { HiCodeBracketSquare, HiMagnifyingGlass, HiMapPin, HiTag, HiWindow } from 'react-icons/hi2';
import { useEffect, useRef, useState } from 'react';
import { HelloEvent } from '@/models/hello-event';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface Props {
	events: HelloEvent[];
	selectedCard: number | null;
	setSelectedCard: (cardId: number | null) => void;
	locale: string;
}

const cards = [
	{
		id: 1,
		icon: <HiMagnifyingGlass className="h-10 w-10 text-4xl text-sky-500 stroke-[3px]" />,
	},
	{
		id: 2,
		icon: <HiMapPin className="h-10 w-10 text-4xl text-sky-500 stroke-[3px]" />,
	},
	{
		id: 3,
		icon: <HiTag className="h-10 w-10 text-4xl text-sky-500 " />,
	},
	{
		id: 4,
		icon: <HiWindow className="h-10 w-10 text-4xl text-sky-500 " />,
	},
	{
		id: 5,
		icon: <HiCodeBracketSquare className="h-10 w-10 text-4xl text-sky-500 " />,
	},
	{
		id: 6,
		icon: <HiCodeBracketSquare className="h-10 w-10 text-4xl text-sky-500 " />,
	},
	{
		id: 7,
		icon: <HiCodeBracketSquare className="h-10 w-10 text-4xl text-sky-500 " />,
	},
	{
		id: 8,
		icon: <HiCodeBracketSquare className="h-10 w-10 text-4xl text-sky-500 " />,
	},
	{
		id: 9,
		icon: <HiCodeBracketSquare className="h-10 w-10 text-4xl text-sky-500 " />,
	},
	{
		id: 10,
		icon: <HiCodeBracketSquare className="h-10 w-10 text-4xl text-sky-500 " />,
	},
	{
		id: 11,
		icon: <HiCodeBracketSquare className="h-10 w-10 text-4xl text-sky-500 " />,
	},
];
const cardVariants = {
	selected: {
		scale: 1.2,
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
		if ((e.target as HTMLElement).closest('button')) {
			return;
		}
		if (isDragging) {
			const y = e.pageY - containerRef.current.offsetTop;
			const walk = y - startY;
			if (Math.abs(walk) < 5) selectCard(card);
		} else selectCard(card);
	};

	const scrollToCard = (card: any) => {
		cardRefs.current[card - 1].scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		});
	};

	const handleViewProfileClick = (e: React.MouseEvent, url: string) => {
		e.stopPropagation();
		router.push(url);
	};

	return (
		<div
			className="h-full w-full flex flex-col items-center justify-center  max-w-2xl   relative"
			onMouseDown={handleMouseDown}
			onMouseUp={() => setDragStart((prev) => ({ ...prev, isDragging: false }))}
			onMouseMove={handleMouseMove}
		>
			<div
				className="overflow-y-scroll w-full h-full no-visible-scrollbar relative"
				style={{
					whiteSpace: 'nowrap',
					perspective: '150px',
				}}
				ref={containerRef}
			>
				{events.map((event, i) => (
					<motion.div
						className="card relative block items-center justify-center h-fit w-4/5 my-10 mx-auto rounded-md cursor-pointer"
						key={event.cardId}
						ref={(el) => cardRefs.current.push(el)}
						onMouseUp={(e) => handleCardMouseUp(e, event.cardId)}
						variants={cardVariants}
						animate={selectedCard === event.cardId ? 'selected' : 'notSelected'}
						custom={selectedCard ? selectedCard - (event.cardId ?? 0) : 0}
					>
						<p className="font-mono italic">{event.eventStartDate.substring(0, 10)}</p>
						<div className="flex flex-col justify-around bg-base-200 rounded-3xl h-full">
							<div className="text-3xl font-bold p-6">{event.title}</div>
							<div className="w-full aspect-[2/1]">
								<img src={event.imageUrl} alt={event.title} className="w-full h-full" />
							</div>
							<div className="flex flex-row gap-2 p-6 items-center">
								<div className="avatar">
									<div className="w-14 rounded-full">
										<img
											alt="Tailwind CSS Navbar component"
											src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
										/>
									</div>
								</div>
								<div className="flex flex-col pt-2 pl-2">
									<p className="text-base font-bold">{event.organizer?.organisation ?? 'Organisateur'}</p>
									<p className="text-xs text-secondary">{event.organizer?.activityArea}</p>
								</div>
								{selectedCard === event.cardId && (
									<button
										className="ml-auto btn btn-accent"
										onClick={(e) => handleViewProfileClick(e, `/fr/dashboard/profile/${event.organizer?.id}`)}
									>
										{t('view-profile')}
									</button>
								)}
							</div>

							{selectedCard === event.cardId && (
								<div className="text-sm font-light px-6 pb-6 whitespace-normal">{event.content}</div>
							)}
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};
