import { ReactElement, RefObject, useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import moment, { Moment } from 'moment';
import 'moment/locale/fr';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DropdownSelect from '@/components/DropdownSelect';

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
						<div>
							<button type="button" className="btn btn-primary btn-sm" onClick={() => handleDateChange('prev')}>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
						</div>
						<p className="text-lg">{date?.locale(locale).format('MMMM YYYY')}</p>
						<div>
							<button type="button" className="btn btn-primary btn-sm" onClick={() => handleDateChange('next')}>
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div />
			<div>
				<DropdownSelect
					title={'Filters'}
					items={filterItems.map((item) => item.name)}
					onFilterChange={handleFilterChange}
				/>
			</div>
		</header>
	);
};
