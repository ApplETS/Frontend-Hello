import { faPenToSquare, faClone, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default {
    publicationModalStatus: {
        view: 1,
        create: 2,
        duplicate: 3,
        modify: 4,
        delete: 5,
    },
    newsStatuses: [
        {
            id: 1,
            color: "bg-orange",
            label: "all",
        },
        {
            id: 2,
            color: "bg-blue",
            label: "published",
        },
        {
            id: 3,
            color: "bg-green",
            label: "draft",
        },
        {
            id: 4,
            color: "bg-pink",
            label: "on-hold",
        },
        {
            id: 5,
            color: "bg-purple",
            label: "refused",
        },
        {
            id: 6,
            color: "bg-error",
            label: "approved",
        },
        {
            id: 7,
            color: "bg-error",
            label: "deleted",
        }
    ],
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