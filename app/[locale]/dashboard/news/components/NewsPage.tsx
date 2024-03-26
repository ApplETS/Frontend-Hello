'use client';

import { CardRotation } from '@/components/CardRotation';
import NewsCalendar from './NewsCalendar';
import { HelloEvent } from '@/models/hello-event';
import { useState } from 'react';

interface Props {
	eventsCards: HelloEvent[];
	locale: string;
}

export default function NewsPage({ eventsCards, locale }: Props) {
	const [selectedCard, setSelectedCard] = useState<number | null>(null);

	const handleEventSelect = (cardId: number | null) => {
		setSelectedCard(cardId);
	};
	return (
		<div className="flex flex-row h-full">
			<div className="basis-[70%]">
				<NewsCalendar events={eventsCards} locale={locale} handleEventSelect={handleEventSelect} />
			</div>
			<div className="basis-[30%]">
				<CardRotation
					events={eventsCards}
					selectedCard={selectedCard}
					setSelectedCard={setSelectedCard}
					locale={locale}
				/>
			</div>
		</div>
	);
}
