import { faPenToSquare, faClone, faTrashCan, faPencil, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { NewsStates } from '@/models/news-states';
import { UserStates } from '@/models/user-states';

interface Status {
	color: string;
	label: string;
}

interface Statuses {
	[key: number]: Status;
}

interface NewsStatuses {
	[key: string]: Status;
}

export default {
	publicationModalStatus: {
		view: 1,
		create: 2,
		duplicate: 3,
		modify: 4,
		delete: 5,
		moderator: 6,
	},
	newsStatuses: {
		[NewsStates.ALL]: { color: 'bg-orange', label: 'all' },
		[NewsStates.ON_HOLD]: { color: 'bg-yellow', label: 'on-hold' },
		[NewsStates.PUBLISHED]: { color: 'bg-purple', label: 'published' },
		[NewsStates.APPROVED]: { color: 'bg-green', label: 'approved' },
		[NewsStates.DRAFT]: { color: 'bg-blue', label: 'draft' },
		[NewsStates.DELETED]: { color: 'bg-error', label: 'deleted' },
		[NewsStates.REFUSED]: { color: 'bg-pink', label: 'refused' },
	} as NewsStatuses,
	publicationMenuItemsStatus: {
		open: 0,
		modify: 1,
		duplicate: 2,
		delete: 3,
	},
	userStatuses: {
		[UserStates.ALL]: { color: 'bg-orange', label: 'all' },
		[UserStates.PENDING]: { color: 'bg-pink', label: 'pending' },
		[UserStates.ACTIVATED]: { color: 'bg-green', label: 'active' },
		[UserStates.DEACTIVATED]: { color: 'bg-error', label: 'deactivated' },
	} as Statuses,
	publicationMenuItems: [
		{
			id: 1,
			label: 'modify',
			icon: faPencil,
			color: '',
		},
		{
			id: 2,
			label: 'duplicate',
			icon: faClone,
			color: '',
		},
		{
			id: 3,
			label: 'delete',
			icon: faTrashCan,
			color: 'text-error',
		},
	],
	userMenuItems: [
		{
			id: 1,
			label: 'activate',
			icon: faLockOpen,
			color: '',
		},
		{
			id: 2,
			label: 'deactivate',
			icon: faLock,
			color: '',
		},
		{
			id: 3,
			label: 'delete',
			icon: faTrashCan,
			color: 'text-error',
		},
	],
	colors: ['bg-blue', 'bg-green', 'bg-pink', 'bg-orange', 'bg-purple'],
	tags: {
		publications: 'publications',
		approbations: 'approbations',
		users: 'users',
	},
};
