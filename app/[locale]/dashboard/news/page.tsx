import { getEvents } from '@/lib/get-events';
import NewsPage from './components/NewsPage';
import { getActivityAreas } from '@/lib/get-activity-areas';

interface Props {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{id: string}>;
}

export default async function News({ params, searchParams }: Props) {
	const { id } = await searchParams;
	const { locale } = await params;
	const events = await getEvents();
	const activityAreas = await getActivityAreas();
	const eventsCards = events.map((event, i) => ({ ...event, cardId: i + 1 }));
	return <NewsPage eventsCards={eventsCards} locale={locale} activityAreas={activityAreas} newsId={id} />;
}
