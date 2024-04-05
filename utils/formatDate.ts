export const formatDate = (currentDate: Date, locale: string, t: (key: string) => string): string => {
	if (currentDate.getFullYear() === 1969) {
		return t('none');
	}

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return new Intl.DateTimeFormat(locale.toUpperCase() == 'FR' ? 'fr-FR' : 'en-EN', options).format(currentDate);
};
