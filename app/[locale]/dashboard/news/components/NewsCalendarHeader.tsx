import 'moment/locale/fr';
import { ReactElement, RefObject, useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import moment, { Moment } from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DropdownSelect from '@/components/DropdownSelect';
import { useTranslations } from 'next-intl';

export type TCalendarHeader = {
	calendarRef: RefObject<FullCalendar>;
	locale: string;
	handleFilterChange: (selectedIndices: number[]) => void;
	filterItems: { id: number; name: string }[];
};

export const CalendarHeader = ({
	calendarRef,
	locale,
	handleFilterChange,
	filterItems,
}: TCalendarHeader): ReactElement => {
	const [date, setDate] = useState<Moment | null>(moment(calendarRef.current?.getApi().getDate()));
	const t = useTranslations('Calendar');

	useEffect(() => {
		const calApi = calendarRef.current?.getApi();

		if (calApi) {
			setDate(moment(calApi.getDate()));
		}
	}, [calendarRef]);

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
		<header className="flex flex-row justify-between">
			<div className="py-2">
				<div className="flex flex-row items-center gap-2">
					<div className="flex flex-row items-center gap-4">
						<button type="button" className="btn btn-sm" onClick={() => handleDateChange('prev')}>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
						<p className="text-lg">{date?.locale(locale).format('MMMM YYYY')}</p>
						<button type="button" className="btn btn-sm" onClick={() => handleDateChange('next')}>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
						<button type="button" className="btn btn-sm" onClick={() => handleDateChange('today')}>
							{t('today')}
						</button>
					</div>
				</div>
			</div>
			<div />
			<div className="mb-1">
				<DropdownSelect
					title={'Filters'}
					items={filterItems.map((item) => item.name)}
					onFilterChange={handleFilterChange}
				/>
			</div>
		</header>
	);
};
