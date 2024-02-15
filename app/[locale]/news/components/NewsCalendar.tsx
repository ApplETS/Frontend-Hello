'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function NewsCalendar() {
	return (
		<FullCalendar
			plugins={[dayGridPlugin, interactionPlugin]}
			initialView="dayGridMonth"
			events={[
				{ title: 'event 1', date: '2024-02-01' },
				{ title: 'event 2', date: '2024-02-02' },
			]}
		/>
	);
}
