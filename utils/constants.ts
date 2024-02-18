import { faPenToSquare, faClone, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NewsStates } from '@/models/news-states';

interface NewsStatus {
    color: string;
    label: string;
}
  
interface NewsStatuses {
    [key: number]: NewsStatus;
}

export default {
    newsStatuses: {
        [NewsStates.ON_HOLD]: { color: "bg-pink", label: "on-hold" },
        [NewsStates.DELETED]: { color: "bg-error", label: "deleted" },
        [NewsStates.REFUSED]: { color: "bg-purple", label: "refused" },
        [NewsStates.APPROVED]: { color: "bg-error", label: "approved" },
        [NewsStates.PUBLISHED]: { color: "bg-blue", label: "published" },
        [NewsStates.ALL]: { color: "bg-orange", label: "all" }
    } as NewsStatuses,
    menuItems: [
        {
            id: 1,
            label: "open",
            icon: faPenToSquare,
            color: "",
        },
        {
            id: 2,
            label: "duplicate",
            icon: faClone,
            color: "",
        },
        {
            id: 3,
            label: "delete",
            icon: faTrashCan,
            color: "text-error",
        },
    ],
}