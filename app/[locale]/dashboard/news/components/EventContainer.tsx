'use client';
import React, { useState, useRef, useEffect } from 'react';
import Marquee from './Marquee';
import { CalendarEvent } from './NewsCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface Props {
	title: string;
	showMoreEvents?: CalendarEvent[];
	onClickEvent?: (cardId: number | null) => void;
}

export default function EventContainer({ title, showMoreEvents, onClickEvent }: Props) {
	const parentRef = useRef<HTMLDivElement>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div
				ref={parentRef}
				className="parent-container overflow-hidden text-black cursor-pointer"
				onClick={() => {
					if (showMoreEvents) {
						setIsModalOpen(true);
					}
				}}
			>
				<Marquee parentRef={parentRef}>{title}</Marquee>
			</div>
			{showMoreEvents && isModalOpen && (
				<div className="fixed z-30 flex justify-center items-center">
					<div className="flex justify-between shadow-sm gap-2">
						<div className="left-div bg-base-200 border p-2 rounded-lg">
							<div className="flex justify-between items-center p-1">
								<p className="m-0 text-base text-base-content">Dimanche, 14 avril</p>
								<button className="cursor-pointer" onClick={() => setIsModalOpen(false)}>
									<FontAwesomeIcon className="text-base-content" icon={faClose} size="lg" />
								</button>
							</div>
							<div className="divider my-0"></div>
							<ul className="flex flex-col gap-2">
								{showMoreEvents.map((event, index) => (
									<li
										className="cursor-pointer bg-[--fc-event-bg-color] rounded-sm text-black p-1 w-72"
										key={index}
										onClick={() => {
											if (event.cardId && onClickEvent) {
												onClickEvent(event.cardId);
											}
										}}
									>
										{event.title}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
