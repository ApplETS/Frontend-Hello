'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventContentArg } from '@fullcalendar/core';

export default function NewsCalendar() {
	const handleDateClick = (arg: DateClickArg) => {
		alert('date click! ' + arg.dateStr);
	};
	return (
		<FullCalendar
			plugins={[dayGridPlugin, interactionPlugin]}
			initialView="dayGridMonth"
			eventContent={renderEventContent}
			events={[
				{ title: 'event 1', date: '2024-02-01' },
				{ title: 'event 2', date: '2024-02-02' },
			]}
			dateClick={handleDateClick}
		/>
	);
}

function renderEventContent(eventInfo: EventContentArg) {
	return (
		<div className="">
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</div>
	);
}
