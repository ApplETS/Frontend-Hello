import { getEvents } from '@/lib/get-events';
import NewsCalendar from './components/NewsCalendar';
import NewsTimeline from './components/NewsTimeline';

export default async function News() {
	const events = await getEvents();
	return (
		<div className="flex flex-row h-full">
			<div className="basis-[60%]">
				<NewsCalendar events={events} />
			</div>
			<div className="basis-[40%]">
				<NewsTimeline events={events} />
			</div>
		</div>
	);
}
