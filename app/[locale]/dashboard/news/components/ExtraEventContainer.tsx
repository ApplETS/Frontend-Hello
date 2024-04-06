'use client';
import React, { useRef } from 'react';
import Marquee from './Marquee';
import { CalendarEvent } from './NewsCalendar';

interface Props {
	index: number;
	event: CalendarEvent;
	onClickEvent?: (cardId: number | null) => void;
}

export default function ExtraEventContainer({ index, onClickEvent, event }: Props) {
	const parentRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={parentRef}
			className={`cursor-pointer rounded-sm text-black p-1 w-72 overflow-hidden`}
			style={{ backgroundColor: event.color }}
			key={index}
			onClick={() => {
				if (event.groupId && onClickEvent) {
					onClickEvent(event.groupId);
				}
			}}
		>
			<Marquee parentRef={parentRef}>{event.title}</Marquee>
		</div>
	);
}
