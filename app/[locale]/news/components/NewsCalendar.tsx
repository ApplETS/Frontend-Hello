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
	handleEventSelect: (cardId: number | null) => void;
}

export default function NewsCalendar({ events, locale, handleEventSelect }: Props) {
	const [shownEvents, setShownEvents] = useState<HelloEvent[]>(events);

	const calendarRef = createRef<FullCalendar>();

	const { isLight } = useTheme();
	const themeColors = isLight ? daisyuiColors.light : daisyuiColors.dark;

	const filterItems = [
		// Will need to get from backend
		{ id: 0, name: 'Club scientifique', color: 'bg-blue' },
		{ id: 1, name: 'ÉTS', color: 'bg-green' },
		{ id: 2, name: 'Service à la vie étudiante', color: 'bg-pink' },
		{ id: 3, name: 'AEETS', color: 'bg-orange' },
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
			<div className="rounded-lg border border-gray-300">
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
							<div className={`p-2 cursor-pointer`}>
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
						handleEventSelect(events.find((event) => event.title === info.event.title)?.cardId ?? null);
					}}
					eventDisplay="block"
					headerToolbar={false}
				/>
			</div>
		</div>
	);
}
