'use client';
import React, { useState, useRef, useEffect } from 'react';
import Marquee from './Marquee';
import { CalendarEvent } from './NewsCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ExtraEventContainer from './ExtraEventContainer';

interface Props {
	title: string;
	showMoreEvents?: CalendarEvent[];
	onClickEvent?: (cardId: number | null) => void;
	locale?: string;
	date?: Date | null;
	setOpenMoreModal?: (openMoreModal: string | null) => void;
	openMoreModal?: string | null;
	monthview: boolean;
}

export default function EventContainer({
	title,
	showMoreEvents,
	onClickEvent,
	locale,
	date,
	openMoreModal,
	setOpenMoreModal,
	monthview,
}: Props) {
	const parentRef = useRef<HTMLDivElement>(null);

	const formatDate = (date: Date, locale: string) => {
		const formatter = new Intl.DateTimeFormat(locale + '-CA', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		});
		let formattedDate = formatter.format(date);
		formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
		return formattedDate;
	};

	return (
		<>
			<div
				ref={parentRef}
				className="parent-container overflow-hidden text-black cursor-pointer"
				onClick={() => {
					if (showMoreEvents && setOpenMoreModal && date) {
						setOpenMoreModal(date.toISOString());
					}
				}}
			>
				<Marquee parentRef={parentRef} monthview={monthview}>
					{title}
				</Marquee>
			</div>
			{showMoreEvents && openMoreModal == date?.toISOString() && (
				<div className="fixed z-50 flex justify-center items-center">
					<div className="flex justify-between shadow-sm gap-2">
						<div className="left-div bg-base-200 border p-2 rounded-lg">
							<div className="flex justify-between items-center p-1">
								<p className="m-0 text-base text-base-content">
									{showMoreEvents[0].date && locale && formatDate(showMoreEvents[0].date, locale)}
								</p>
								<button
									className="cursor-pointer"
									onClick={() => {
										if (showMoreEvents && setOpenMoreModal && date) {
											setOpenMoreModal(null);
										}
									}}
								>
									<FontAwesomeIcon className="text-base-content" icon={faClose} size="lg" />
								</button>
							</div>
							<div className="divider my-0"></div>
							<ul className="flex flex-col gap-2">
								{showMoreEvents.map((event, index) => (
									<ExtraEventContainer index={index} event={event} onClickEvent={onClickEvent} />
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
