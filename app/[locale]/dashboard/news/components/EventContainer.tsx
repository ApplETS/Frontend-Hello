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
				className="parent-container overflow-hidden text-black"
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
						<div className="left-div bg-base-100 border border-base-content p-2 rounded-lg">
							<ul className="flex flex-col gap-2">
								{showMoreEvents.map((event, index) => (
									<li
										className="bg-[--fc-event-bg-color] rounded-sm text-black p-1 w-48"
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
						<div className="right-div">
							<button
								className="cursor-pointer rounded-full bg-primary p-2 w-10 h-10"
								onClick={() => setIsModalOpen(false)}
							>
								<FontAwesomeIcon className="text-black" icon={faClose} size="lg" />
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
