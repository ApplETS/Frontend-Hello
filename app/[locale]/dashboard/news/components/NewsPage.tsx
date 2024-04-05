'use client';

import { CardRotation } from '@/components/CardRotation';
import NewsCalendar from './NewsCalendar';
import { HelloEvent } from '@/models/hello-event';
import { useState } from 'react';
import { ActivityArea } from '@/models/activity-area';

interface Props {
	eventsCards: HelloEvent[];
	locale: string;
	activityAreas: ActivityArea[];
}

export default function NewsPage({ eventsCards, locale, activityAreas }: Props) {
	const [selectedCard, setSelectedCard] = useState<number | null>(null);

	const handleEventSelect = (cardId: number | null) => {
		setSelectedCard(cardId);
	};
	return (
		<div className="flex flex-row h-full">
			<div className="basis-[70%]">
				<NewsCalendar
					events={eventsCards}
					locale={locale}
					handleEventSelect={handleEventSelect}
					activityAreas={activityAreas}
				/>
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
