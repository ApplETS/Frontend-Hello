export interface ActivityArea {
	id: string;
	nameFr: string;
	nameEn: string;
}

export function getActivityAreaName(activityArea: ActivityArea, locale: string) {
	return locale == 'fr' ? activityArea.nameFr : activityArea.nameEn;
}
