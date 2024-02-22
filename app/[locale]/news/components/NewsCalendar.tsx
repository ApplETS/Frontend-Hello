'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventContentArg } from '@fullcalendar/core';
import { HelloEvent } from '@/models/hello-event';

interface Props {
	events: HelloEvent[];
}

export default function NewsCalendar({ events }: Props) {
	return (
		<FullCalendar
			plugins={[dayGridPlugin, interactionPlugin]}
			initialView="dayGridMonth"
			events={events.map((event) => {
				return {
					title: event.title + 'asdasdasdsadasdasdasdasdasdasd',
					start: event.eventDate,
				};
			})}
			eventClick={(info) => {
				alert('Event: ' + info.event.title);
			}}
		/>
	);
}
