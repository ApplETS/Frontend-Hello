import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
	locales: ['en', 'fr'],
	defaultLocale: 'en',
	localePrefix: {
		mode: 'always',
		prefixes: {
			'en': '/en',
			'fr': '/fr'
		}
	},
	pathnames: {
		'/': '/',
		'/dashboard': {
			'en': '/dashboard',
			'fr': '/tableau de bord'
		}
	}
});