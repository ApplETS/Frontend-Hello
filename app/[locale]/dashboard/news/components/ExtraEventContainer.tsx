'use client';
import React, { useState, useRef, useEffect } from 'react';
import Marquee from './Marquee';
import { CalendarEvent } from './NewsCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

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
			className={`cursor-pointer bg-[${event.color}] rounded-sm text-black p-1 w-72 overflow-hidden`}
			key={index}
			onClick={() => {
				if (event.cardId && onClickEvent) {
					onClickEvent(event.cardId);
				}
			}}
		>
			<Marquee parentRef={parentRef}>{event.title}</Marquee>
		</div>
	);
}
