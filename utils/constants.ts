import { faPenToSquare, faClone, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default {
    newsStatuses: {
        1: { color: "bg-pink", label: "on-hold" },
        2: { color: "bg-error", label: "deleted" },
        4: { color: "bg-purple", label: "refused" },
        8: { color: "bg-error", label: "approved" },
        16: { color: "bg-blue", label: "published" },
        31: { color: "bg-orange", label: "all" }
    },
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