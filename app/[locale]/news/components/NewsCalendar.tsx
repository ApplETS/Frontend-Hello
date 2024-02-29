'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import momentPlugin from '@fullcalendar/moment';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventContentArg } from '@fullcalendar/core';
import { HelloEvent } from '@/models/hello-event';
import frLocale from '@fullcalendar/core/locales/fr';
import enLocale from '@fullcalendar/core/locales/en-gb';
import daisyuiColors from 'daisyui/src/theming/themes';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { createRef, useState } from 'react';
import { CalendarHeader } from './NewsCalendarHeader';

interface Props {
	events: HelloEvent[];
	locale: string;
}

export default function NewsCalendar({ events, locale }: Props) {
	const [shownEvents, setShownEvents] = useState<HelloEvent[]>(events);

	const calendarRef = createRef<FullCalendar>();

	const { isLight } = useTheme();
	const themeColors = isLight ? daisyuiColors.light : daisyuiColors.dark;

	const filterItems = [
		// Will need to get from backend
		{ id: 0, name: 'Club scientifique' },
		{ id: 1, name: 'ÉTS' },
		{ id: 2, name: 'Service à la vie étudiante' },
		{ id: 3, name: 'AEETS' },
	];
	const handleFilterChange = (selectedIndices: number[]) => {
		if (selectedIndices.length !== 0) {
			setShownEvents(
				events.filter((event) => {
					const selectedItems = selectedIndices.map((index) => filterItems[index].name);
					return selectedItems.includes(event.organizer?.activityArea ?? '');
				})
			);
		} else {
			setShownEvents(events);
		}
	};
	return (
		<div>
			<CalendarHeader
				calendarRef={calendarRef}
				locale={locale}
				handleFilterChange={handleFilterChange}
				filterItems={filterItems}
			/>
			<FullCalendar
				ref={calendarRef}
				plugins={[dayGridPlugin, interactionPlugin, momentPlugin]}
				initialView="dayGridMonth"
				locales={[frLocale, enLocale]}
				locale={locale}
				events={shownEvents.map((event) => {
					return {
						title: event.title,
						start: event.eventStartDate,
					};
				})}
				eventContent={(arg: EventContentArg) => {
					return (
						<div className="bg-primary p-2">
							<p className="text-left truncate">{`${arg.timeText} - ${arg.event.title}`}</p>
						</div>
					);
				}}
				eventTimeFormat={{
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
				}}
				eventClick={(info) => {
					alert('Event: ' + info.event.title);
				}}
				eventDisplay="block"
				headerToolbar={false}
			/>
		</div>
	);
}
