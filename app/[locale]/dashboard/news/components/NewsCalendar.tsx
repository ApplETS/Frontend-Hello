'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timeGridDay from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment';
import interactionPlugin from '@fullcalendar/interaction';
import { EventContentArg } from '@fullcalendar/core';
import { HelloEvent } from '@/models/hello-event';
import frLocale from '@fullcalendar/core/locales/fr';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { createRef, useEffect, useState } from 'react';
import { CalendarHeader } from './NewsCalendarHeader';
import { DateTimeFormatOptions } from 'next-intl';
import EventContainer from './EventContainer';
import { useTheme } from '@/utils/provider/ThemeProvider';

interface Props {
	events: HelloEvent[];
	locale: string;
	handleEventSelect: (cardId: number | null) => void;
}

export default function NewsCalendar({ events, locale, handleEventSelect }: Props) {
	const [shownEvents, setShownEvents] = useState<HelloEvent[]>([]);
	const [viewType, setViewType] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');
	const [view] = useState('dayGridMonth');
	const { isLight } = useTheme();

	const calendarRef = createRef<FullCalendar>();

	// TODO : Will need to get from backend
	const filterItems = [
		{ id: 0, name: 'Club scientifique', color: '#06B6D4' },
		{ id: 1, name: 'ETS', color: '#64C788' },
		{ id: 2, name: 'Service à la vie étudiante', color: '#EA7CB7' },
		{ id: 3, name: 'AEETS', color: '#E7A455' },
	];

	useEffect(() => {
		const updatedEvents = events.map((event) => {
			const startDate = new Date(event.eventStartDate);
			const endDate = new Date(event.eventEndDate);

			startDate.setMinutes(startDate.getMinutes() + 30);
			endDate.setMinutes(endDate.getMinutes() + 30);

			return {
				...event,
				eventStartDate: startDate.toISOString(),
				eventEndDate: endDate.toISOString(),
			};
		});
		setShownEvents(updatedEvents);
	}, []);

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

	const generateEventsForWeekView = (events: HelloEvent[]) => {
		const generatedEvents: any[] = [];

		events.forEach((event) => {
			const startDate = new Date(event.eventStartDate);
			const endDate = new Date(event.eventEndDate);

			const startDay = startDate.getDate();
			const endDay = endDate.getDate();
			const startMonth = startDate.getMonth();
			const endMonth = endDate.getMonth();

			if (startDay !== endDay || startMonth !== endMonth) {
				let currentDate = new Date(startDate);
				while (currentDate <= endDate) {
					const startOfDay = new Date(currentDate);
					startOfDay.setHours(0, 0, 0, 0);
					const endOfDay = new Date(currentDate);
					endOfDay.setHours(23, 59, 59, 999);

					if (currentDate.getDate() === startDate.getDate() && currentDate.getMonth() === startDate.getMonth()) {
						startOfDay.setTime(startDate.getTime());
						endOfDay.setHours(23, 59, 59, 999);
					} else if (currentDate.getDate() === endDate.getDate() && currentDate.getMonth() === endDate.getMonth()) {
						startOfDay.setHours(0, 0, 0, 0);
						endOfDay.setTime(endDate.getTime());
					}

					const isAllDay =
						startOfDay.getHours() === 0 &&
						startOfDay.getMinutes() === 0 &&
						endOfDay.getHours() === 23 &&
						endOfDay.getMinutes() === 59;

					generatedEvents.push({
						title: event.title,
						start: startOfDay,
						end: endOfDay,
						allDay: isAllDay,
						color: filterItems.find((item) => item.name === event.organizer?.activityArea)?.color,
					});

					currentDate.setDate(currentDate.getDate() + 1);
				}
			} else {
				const isAllDay =
					startDate.getHours() === 0 &&
					startDate.getMinutes() === 0 &&
					endDate.getHours() === 23 &&
					endDate.getMinutes() === 59;
				generatedEvents.push({
					title: event.title,
					start: startDate,
					end: endDate,
					allDay: isAllDay,
					color: filterItems.find((item) => item.name === event.organizer?.activityArea)?.color,
				});
			}
		});
		return generatedEvents;
	};

	return (
		<div className="flex flex-col flex-grow h-full">
			<CalendarHeader
				calendarRef={calendarRef}
				locale={locale}
				handleFilterChange={handleFilterChange}
				filterItems={filterItems}
				viewType={viewType}
				setViewType={setViewType}
			/>
			<FullCalendar
				viewClassNames={'rounded-lg border border-gray-300'}
				ref={calendarRef}
				height={'100%'}
				plugins={[dayGridPlugin, interactionPlugin, momentPlugin, timeGridPlugin, timeGridDay]}
				initialView={view}
				locales={[frLocale, enLocale]}
				locale={locale}
				events={
					viewType === 'timeGridWeek'
						? generateEventsForWeekView(shownEvents)
						: shownEvents.map((event) => {
								return {
									title: event.title,
									start: event.eventStartDate,
									color: filterItems.find((item) => item.name === event.organizer?.activityArea)?.color,
									end: event.eventEndDate,
								};
						  })
				}
				eventContent={(arg: EventContentArg) => {
					return (
						<div className="p-2 cursor-pointer w-full text-center">
							<EventContainer title={arg.event.title} />
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
	);
}
