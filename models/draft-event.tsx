import { Tag } from './tag';
import { User } from './user';

export interface DraftEvent {
	id: string;
	title: string | null;
	content: string | null;
	imageUrl: string | null;
	imageAltText: string | null;
	state: string | null;
	publicationDate: string | null;
	eventStartDate: string | null;
	eventEndDate: string | null;
	createdAt: string | null;
	updatedAt: string | null;
	moderator: User | null;
	organizer: User | null;
	tags: Tag[] | null;
	cardId?: number | null;
}
