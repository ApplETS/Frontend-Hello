import { Tag } from './tag';
import { User } from './user';

export interface HelloEvent {
	id: string;
	title: string;
	content: string;
	imageUrl: string;
	imageAltText: string;
	state: string;
	publicationDate: string;
	eventStartDate: string;
	eventEndDate: string;
	createdAt: string;
	updatedAt: string;
	moderator: User | null;
	organizer: User | null;
	tags: Tag[];
	cardId?: number;
}
