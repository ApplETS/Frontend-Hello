import { User } from './user';

export interface HelloEvent {
	id: string;
	title: string;
	content: string;
	imageUrl: string;
	state: number;
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

export interface Tag {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}
