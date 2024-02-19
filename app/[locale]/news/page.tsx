import NewsCalendar from './components/NewsCalendar';
import NewsTimeline from './components/NewsTimeline';

export default function News() {
	return (
		<div className="flex flex-row h-full">
			<div className="basis-[60%]">
				<NewsCalendar />
			</div>
			<div className="basis-[40%]">
				<NewsTimeline />
			</div>
		</div>
	);
}
