export const formatDate = (currentDate: Date, locale: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat(locale.toUpperCase() == 'FR' ? 'fr-FR' : 'en-EN', options).format(currentDate);
};