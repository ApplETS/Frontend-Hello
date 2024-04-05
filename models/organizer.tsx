import { HelloEvent } from './hello-event';
import { Tag } from './tag';
import { User } from './user';

export interface Organizer extends User {
	fieldsOfInterests: Tag[];
	socials: { icon: string; inputName: string; link: string }[];
	events: HelloEvent[];
}
