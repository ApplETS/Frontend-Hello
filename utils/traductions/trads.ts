import { getTranslations } from 'next-intl/server';

export async function getTranslationsWithDefault(namespace: string) {
	const trads = await getTranslations(namespace);
	const defaultTrad = await getTranslations('LocaleLayout');

	const t = async (key: string, defaultMsg?: string) => {
		const translatedString = trads(key);
		// if translatedstring contains key, return defaultMsg
		if (translatedString && translatedString.includes(key)) {
			return defaultMsg ?? defaultTrad('defaultError');
		}
		return translatedString;
	};

	return t;
}
