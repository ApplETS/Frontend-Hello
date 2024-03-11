import { HelloEvent } from './hello-event';

export interface Organizer {
	id: string;
	name: string | null;
	email: string | null;
	type: string | null;
	organisation: string | null;
	activityArea: string | null;
	imageUrl: string;
	profileDescription: string | null;
	interests: string[];
	socials: { icon: string; inputName: string; link: string }[];
	webSiteLink: string | null;
	events: HelloEvent[];
	createdAt: string;
	updatedAt: string;
}
