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
import dayjs from 'dayjs';

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
	groupId?: number;
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
			const startDate = dayjs(event.eventStartDate);
			const endDate = dayjs(event.eventEndDate);

			let currentDate = dayjs(startDate);

			while (!currentDate.isAfter(endDate, 'day')) {
				const start = currentDate.hour(startDate.hour()).minute(startDate.minute()).second(startDate.second());
				const end = currentDate.hour(23).minute(59).second(59).millisecond(999);

				if (currentDate.isSame(endDate, 'day')) {
					end.hour(endDate.hour()).minute(endDate.minute()).second(endDate.second());
				}

				slicedEvents.push({
					...event,
					eventStartDate: start.toISOString(),
					eventEndDate: end.toISOString(),
				});

				currentDate = currentDate.add(1, 'day').startOf('day');
			}
		});
		return slicedEvents;
	};

	const groupEventsByDate = (events: HelloEvent[]): Record<string, HelloEvent[]> => {
		return events.reduce((acc, event) => {
			const startDate = dayjs(event.eventStartDate);
			const endDate = dayjs(event.eventEndDate);
			let currentDate = dayjs(startDate);

			while (!currentDate.isAfter(endDate, 'day')) {
				const dateString = currentDate.format('YYYY-MM-DD');

				if (!acc[dateString]) {
					acc[dateString] = [];
				}
				acc[dateString].push(event);

				currentDate = currentDate.add(1, 'day');
			}

			return acc;
		}, {} as Record<string, HelloEvent[]>);
	};

	useEffect(() => {
		updateEvents(events);
	}, []);

	const updateEvents = (events: HelloEvent[]) => {
		const updatedEvents = events.map((event) => {
			const startDate = dayjs(event.eventStartDate).add(30, 'minutes');
			const endDate = dayjs(event.eventEndDate).add(30, 'minutes');

			return {
				...event,
				eventStartDate: startDate.toISOString(),
				eventEndDate: endDate.toISOString(),
			};
		});
		const eventsCards = updatedEvents.map((event, i) => ({ ...event, cardId: i + 1 }));
		setShownEvents(eventsCards);
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
			const startDate = dayjs(event.eventStartDate);
			const endDate = dayjs(event.eventEndDate);

			if (startDate.date() !== endDate.date() || startDate.month() !== endDate.month()) {
				let currentDate = dayjs(startDate);
				while (!currentDate.isAfter(endDate, 'day')) {
					const startOfDay = currentDate.startOf('day');
					const endOfDay = currentDate.endOf('day');

					const isAllDay = startOfDay.isSame(startDate, 'minute') && endOfDay.isSame(endDate, 'minute');

					generatedEvents.push({
						title: event.title,
						start: startOfDay.toDate(),
						end: endOfDay.toDate(),
						allDay: isAllDay,
						color: getColorForActivityArea(colors, event),
					});

					currentDate = currentDate.add(1, 'day');
				}
			} else {
				const isAllDay =
					startDate.hour() === 0 && startDate.minute() === 0 && endDate.hour() === 23 && endDate.minute() === 59;
				generatedEvents.push({
					title: event.title,
					start: startDate.toDate(),
					end: endDate.toDate(),
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
				const groupedEventsByDate = groupEventsByDate(slicedEvents);

				shownEvents = Object.entries(groupedEventsByDate)
					.map(([date, events]) => {
						const formattedEvents: CalendarEvent[] = events.slice(0, 3).map((event) => ({
							title: event.title,
							start: event.eventStartDate,
							end: event.eventEndDate,
							groupId: event.cardId,
							color: getColorForActivityArea(colors, event),
						}));
						const additionalEvents = events.slice(2);

						if (additionalEvents.length > 1) {
							formattedEvents[2] = {
								title: '+' + additionalEvents.length,
								start: additionalEvents[0].eventStartDate,
								end: additionalEvents[0].eventEndDate,
								color: isLight ? '#D0D0D0' : '#B0B0B0',
								groupId: additionalEvents[0].cardId,
								extendedProps: {
									isShowMore: true,
									events: helloEventsToCalendarEvents(additionalEvents),
								},
							};
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
			groupId: helloEvent.cardId,
			date: dayjs(helloEvent.eventStartDate).toDate(),
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
					handleEventSelect(Number(info.event.groupId));
				}}
				eventDisplay="block"
				eventOrder={'start'}
				headerToolbar={false}
			/>
		</div>
	);
}
