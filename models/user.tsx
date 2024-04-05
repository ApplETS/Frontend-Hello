import { ActivityArea } from './activity-area';

export type User = {
	id: string;
	name: string | null;
	email: string | null;
	type: string | null;
	organization: string | null;
	activityAreaId: string | null;
	activityArea: ActivityArea | null;
	avatarUrl: string | null;
	profileDescription: string | null;
	isActive: boolean;
	hasLoggedIn: boolean;
	facebookLink: string | null;
	instagramLink: string | null;
	tikTokLink: string | null;
	xLink: string | null;
	discordLink: string | null;
	linkedInLink: string | null;
	redditLink: string | null;
	webSiteLink: string | null;
	createdAt: string;
	updatedAt: string;
};
