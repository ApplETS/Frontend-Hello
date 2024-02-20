export interface User {
	id: string;
	name: string | null;
	email: string;
	type: string;
	organisation: string | null;
	activityArea: string | null;
	createdAt: string;
	updatedAt: string;
}