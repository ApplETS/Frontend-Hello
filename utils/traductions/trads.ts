import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function getTranslationsWithDefault(namespace: string) {
	const trads = await getTranslations(namespace);
	const defaultTrad = await getTranslations('LocaleLayout');

	const t = async (key: string, defaultMsg?: string) => {
		const translatedString = trads(key);
		// if translatedstring contains key, return defaultMsg
		if (translatedString && translatedString.includes(key)) {
			return defaultMsg ?? defaultTrad('default-error');
		}
		return translatedString;
	};

	return t;
}

export function useTranslationsWithDefault(namespace: string) {
	const trads = useTranslations(namespace);
	const defaultTrad = useTranslations('LocaleLayout');

	const t = (key?: string, defaultMsg?: string) => {
		const translatedString = trads(key);
		// if translatedstring contains key, return defaultMsg
		if (key && translatedString && translatedString.includes(key)) {
			return defaultMsg ?? defaultTrad('default-error');
		}
		return translatedString;
	};

	return t;
}
