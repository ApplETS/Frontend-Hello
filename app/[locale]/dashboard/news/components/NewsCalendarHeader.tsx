import 'moment/locale/fr';
import { ReactElement, RefObject, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import moment, { Moment } from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DropdownSelect from '@/components/DropdownSelect';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { ActivityArea, getActivityAreaName } from '@/models/activity-area';
import { HelloEvent } from '@/models/hello-event';

export type TCalendarHeader = {
	calendarRef: RefObject<FullCalendar>;
	locale: string;
	handleFilterChange: (selectedIndices: number[]) => void;
	activityAreas: ActivityArea[];
	viewType: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
	setViewType: React.Dispatch<React.SetStateAction<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>>;
	sharedEvent?: HelloEvent;
};

export const CalendarHeader = ({
	calendarRef,
	locale,
	handleFilterChange,
	activityAreas,
	viewType,
	setViewType,
	sharedEvent
}: TCalendarHeader): ReactElement => {
	const [date, setDate] = useState<Moment | null>(moment(calendarRef.current?.getApi().getDate()));
	const t = useTranslations('Calendar');
	const { isLight } = useTheme();

	useEffect(() => {
		const calApi = calendarRef.current?.getApi();

		if (calApi) {
				setDate(moment(calApi.getDate()));
		}
	}, [calendarRef]);

	const handleViewChange = (view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'): void => {
		const calApi = calendarRef.current?.getApi();

		if (calApi) {
			calApi.changeView(view);
			setViewType(view);
		}
	};

	const handleDateChange = (direction: 'prev' | 'today' | 'next'): void => {
		const calApi = calendarRef.current?.getApi();

		if (calApi) {
			if (direction === 'prev') {
				calApi.prev();
			} else if (direction === 'next') {
				calApi.next();
			} else {
				calApi.today();
			}

			setDate(moment(calApi.getDate()));
		}
	};

	return (
		<header className="flex flex-row justify-between items-center">
			<div className="flex items-center gap-4 basis-1/3">
				<button type="button" className="btn btn-sm" onClick={() => handleDateChange('prev')}>
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>
				<p className="text-lg">
					{viewType === 'timeGridDay'
						? date?.locale(locale).format('LL')
						: viewType === 'timeGridWeek'
						? `${date?.clone().startOf('week').locale(locale).format('LL')} - ${date
								?.clone()
								.endOf('week')
								.locale(locale)
								.format('LL')}`
						: date?.locale(locale).format('MMMM YYYY')}
				</p>

				<button type="button" className="btn btn-sm" onClick={() => handleDateChange('next')}>
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
				<button type="button" className="btn btn-sm" onClick={() => handleDateChange('today')}>
					<FontAwesomeIcon icon={faCalendarDay} />
				</button>
			</div>
			<div className="flex justify-center basis-1/3">
				<div className="tabs tabs-boxed" role="tablist">
					<a
						role="tab"
						className={`tab ${viewType === 'dayGridMonth' ? 'tab-active' : ''}`}
						onClick={() => handleViewChange('dayGridMonth')}
						style={{ color: viewType === 'dayGridMonth' ? (isLight ? 'white' : 'black') : isLight ? 'black' : 'white' }}
					>
						{t('month')}
					</a>
					<a
						role="tab"
						className={`tab ${viewType === 'timeGridWeek' ? 'tab-active' : ''}`}
						onClick={() => handleViewChange('timeGridWeek')}
						style={{ color: viewType === 'timeGridWeek' ? (isLight ? 'white' : 'black') : isLight ? 'black' : 'white' }}
					>
						{t('week')}
					</a>
					<a
						role="tab"
						className={`tab ${viewType === 'timeGridDay' ? 'tab-active' : ''}`}
						onClick={() => handleViewChange('timeGridDay')}
						style={{ color: viewType === 'timeGridDay' ? (isLight ? 'white' : 'black') : isLight ? 'black' : 'white' }}
					>
						{t('day')}
					</a>
				</div>
			</div>
			<div className="flex flex-row mb-1 basis-1/3 justify-end">
				<DropdownSelect
					title={t('filters')}
					items={activityAreas.map((activityArea) => getActivityAreaName(activityArea, locale))}
					onFilterChange={handleFilterChange}
					defaultSelected
				/>
			</div>
		</header>
	);
};
