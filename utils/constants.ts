import { faPenToSquare, faClone, faTrashCan, faEye } from '@fortawesome/free-solid-svg-icons';
import { NewsStates } from '@/models/news-states';

interface NewsStatus {
	color: string;
	label: string;
}

interface NewsStatuses {
	[key: number]: NewsStatus;
}

export default {
	publicationModalStatus: {
		view: 1,
		create: 2,
		duplicate: 3,
		modify: 4,
		delete: 5,
	},
	newsStatuses: {
		[NewsStates.ON_HOLD]: { color: 'bg-pink', label: 'on-hold' },
		[NewsStates.DELETED]: { color: 'bg-error', label: 'deleted' },
		[NewsStates.REFUSED]: { color: 'bg-purple', label: 'refused' },
		[NewsStates.APPROVED]: { color: 'bg-error', label: 'approved' },
		[NewsStates.PUBLISHED]: { color: 'bg-blue', label: 'published' },
		[NewsStates.ALL]: { color: 'bg-orange', label: 'all' },
	} as NewsStatuses,
	publicationMenuItemsStatus: {
		open: 0,
		modify: 1,
		duplicate: 2,
		delete: 3,
	},
	publicationMenuItems: [
		{
			id: 1,
			label: 'open',
			icon: faEye,
			color: '',
		},
		{
			id: 2,
			label: 'modify',
			icon: faPenToSquare,
			color: '',
		},
		{
			id: 3,
			label: 'duplicate',
			icon: faClone,
			color: '',
		},
		{
			id: 4,
			label: 'delete',
			icon: faTrashCan,
			color: 'text-error',
		},
	],
	colors: ['bg-blue', 'bg-green', 'bg-pink', 'bg-orange', 'bg-purple'],
};
