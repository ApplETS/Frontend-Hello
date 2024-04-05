import { getEvents } from '@/lib/get-events';
import NewsPage from './components/NewsPage';

export default async function News({ params }: { params: { locale: string } }) {
	const events = await getEvents();
	events.push(...events);
	const eventsCards = events.map((event, i) => ({ ...event, cardId: i + 1 }));
	return <NewsPage eventsCards={eventsCards} locale={params.locale} />;
}
