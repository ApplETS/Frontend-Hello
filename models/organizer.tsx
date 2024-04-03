import { HelloEvent } from './hello-event';
import { User } from './user';

export interface Organizer extends User {
	interests: string[];
	socials: { icon: string; inputName: string; link: string }[];
	events: HelloEvent[];
}
