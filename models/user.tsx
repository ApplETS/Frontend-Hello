export interface User {
	id: string;
	name: string | null;
	email: string | null;
	type: string | null;
	organization: string | null;
	activityArea: string | null;
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
}
