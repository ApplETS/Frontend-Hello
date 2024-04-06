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
import EventContainer from './EventContainer';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { ActivityArea } from '@/models/activity-area';
import { getNextEvents } from '@/app/actions/get-next-events';
import { useLoading } from '@/utils/provider/LoadingProvider';
import { useToast } from '@/utils/provider/ToastProvider';
import { AlertType } from '@/components/Alert';
import { useTranslations } from 'next-intl';

interface Props {
	events: HelloEvent[];
	locale: string;
	handleEventSelect: (cardId: number | null) => void;
	activityAreas: ActivityArea[];
}

export interface CalendarEvent {
	title: string;
	start: string;
	end: string;
	color?: string;
	cardId?: number;
	date?: Date;
	extendedProps?: {
		isShowMore: boolean;
		events: CalendarEvent[];
	};
}

export default function NewsCalendar({ events, locale, handleEventSelect, activityAreas }: Props) {
	const t = useTranslations('Publications');

	const [shownEvents, setShownEvents] = useState<HelloEvent[]>([]);
	const [viewType, setViewType] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');
	const [openMoreModal, setOpenMoreModal] = useState<string | null>(null);
	const [view] = useState('dayGridMonth');
	const [selectedActivityAreas, setSelectedActivityAreas] = useState<string[]>(
		activityAreas.map((activity) => activity.id)
	);
	const { isLight } = useTheme();
	const { startTransition } = useLoading();
	const { setToast } = useToast();

	const calendarRef = createRef<FullCalendar>();

	const colors = ['#E7A455', '#EA7CB7', '#06B6D4', '#64C788', '#EA7CB7', '#848BDB'];

	const sliceEventsByDay = (events: HelloEvent[]): HelloEvent[] => {
		const slicedEvents: HelloEvent[] = [];

		events.forEach((event) => {
			const startDate = new Date(event.eventStartDate);
			const endDate = new Date(event.eventEndDate);

			let currentDate = new Date(startDate);
			while (currentDate <= endDate) {
				const start = new Date(currentDate);
				start.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds());

				const end = new Date(currentDate);
				end.setHours(23, 59, 59, 999);

				if (currentDate.toDateString() === endDate.toDateString()) {
					end.setHours(endDate.getHours(), endDate.getMinutes(), endDate.getSeconds());
				}

				slicedEvents.push({
					...event,
					eventStartDate: start.toISOString(),
					eventEndDate: end.toISOString(),
				});

				currentDate.setDate(currentDate.getDate() + 1);
			}
		});

		return slicedEvents;
	};

	const groupEventsByDate = (events: HelloEvent[]): Record<string, HelloEvent[]> => {
		return events.reduce((acc, event) => {
			const startDate = new Date(event.eventStartDate);
			const endDate = new Date(event.eventEndDate);
			let currentDate = new Date(startDate);

			while (currentDate <= endDate) {
				const dateString = currentDate.toISOString();

				if (!acc[dateString]) {
					acc[dateString] = [];
				}
				acc[dateString].push(event);

				currentDate.setDate(currentDate.getDate() + 1);
			}

			return acc;
		}, {} as Record<string, HelloEvent[]>);
	};

	useEffect(() => {
		updateEvents(events);
	}, []);

	const updateEvents = (events: HelloEvent[]) => {
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
	};

	const handleFilterChange = (selectedIndices: number[]) => {
		const selectedActivityAreas: string[] = [];

		activityAreas.map((activity, index) => {
			if (selectedIndices.includes(index)) {
				selectedActivityAreas.push(activity.id);
			}
		});

		setSelectedActivityAreas(selectedActivityAreas);
	};

	useEffect(() => {
		startTransition(async () => {
			if (selectedActivityAreas.length === 0) {
				setShownEvents([]);
			} else {
				const eventsPaginated = await getNextEvents(1, 1000, undefined, undefined, selectedActivityAreas);
				if (eventsPaginated) {
					updateEvents(eventsPaginated.data);
				} else {
					setToast(t('error-fetching-events'), AlertType.error);
				}
			}
		});
	}, [selectedActivityAreas]);

	function getColorForActivityArea(colors: string[], event: HelloEvent) {
		return colors[activityAreas.findIndex((activityArea) => activityArea.id == event.organizer?.activityArea?.id)];
	}

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
						color: getColorForActivityArea(colors, event),
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
					color: getColorForActivityArea(colors, event),
				});
			}
		});
		return generatedEvents;
	};

	function getShownEvents(events: HelloEvent[]) {
		let shownEvents = [];

		switch (viewType) {
			case 'timeGridWeek':
				shownEvents = generateEventsForWeekView(events);
				break;
			case 'dayGridMonth':
				const slicedEvents = sliceEventsByDay(events);
				shownEvents = Object.entries(groupEventsByDate(slicedEvents))
					.map(([date, events]) => {
						const firstEvent = events[0];
						const additionalEvents = events.slice(1);
						const formattedEvents: CalendarEvent[] = [
							{
								title: firstEvent.title,
								start: firstEvent.eventStartDate,
								end: firstEvent.eventEndDate,
								color: getColorForActivityArea(colors, firstEvent),
							},
						];
						if (additionalEvents.length > 1) {
							formattedEvents.push({
								title: '+' + additionalEvents.length,
								start: date,
								end: date,
								color: isLight ? '#D0D0D0' : '#B0B0B0',
								extendedProps: {
									isShowMore: true,
									events: helloEventsToCalendarEvents(additionalEvents),
								},
							});
						} else if (additionalEvents.length > 0) {
							formattedEvents.push({
								title: additionalEvents[0].title,
								start: additionalEvents[0].eventStartDate,
								end: additionalEvents[0].eventEndDate,
								color: getColorForActivityArea(colors, additionalEvents[0]),
							});
						}
						return formattedEvents;
					})
					.flat();
				break;
			default:
			case 'timeGridDay':
				shownEvents = helloEventsToCalendarEvents(events);
				break;
		}
		return shownEvents;
	}

	function helloEventsToCalendarEvents(helloEvents: HelloEvent[]): CalendarEvent[] {
		return helloEvents.map((event) => helloEventToCalendarEvent(event));
	}

	function helloEventToCalendarEvent(helloEvent: HelloEvent): CalendarEvent {
		return {
			title: helloEvent.title,
			start: helloEvent.eventStartDate,
			color: getColorForActivityArea(colors, helloEvent),
			end: helloEvent.eventEndDate,
			cardId: helloEvent.cardId,
			date: new Date(helloEvent.eventStartDate),
		};
	}

	return (
		<div className="flex flex-col flex-grow h-full">
			<CalendarHeader
				calendarRef={calendarRef}
				locale={locale}
				handleFilterChange={handleFilterChange}
				activityAreas={activityAreas}
				viewType={viewType}
				setViewType={setViewType}
			/>
			<FullCalendar
				viewClassNames={'rounded-lg border border-gray-300 overflow-hidden'}
				ref={calendarRef}
				height={'100%'}
				plugins={[dayGridPlugin, interactionPlugin, momentPlugin, timeGridPlugin, timeGridDay]}
				initialView={view}
				locales={[frLocale, enLocale]}
				locale={locale}
				events={getShownEvents(shownEvents)}
				eventContent={(arg: EventContentArg) => {
					if (arg.event.extendedProps.isShowMore) {
						return (
							<div className="p-1 w-full text-center z-0">
								<EventContainer
									title={arg.event.title}
									showMoreEvents={arg.event.extendedProps.events}
									onClickEvent={handleEventSelect}
									locale={locale}
									date={arg.event.start}
									setOpenMoreModal={setOpenMoreModal}
									openMoreModal={openMoreModal}
								/>
							</div>
						);
					} else {
						return (
							<div className="p-1 cursor-pointer w-full text-center z-0">
								<EventContainer title={arg.event.title} />
							</div>
						);
					}
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
				eventOrder={'start'}
				headerToolbar={false}
			/>
		</div>
	);
}
