import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import ThemeDropdown from './components/ThemeDropdown';
import LanguageDropdown from './components/LanguageDropdown';

type Props = {
	params: { locale: string };
};

export default function Page({ params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('Settings.display-section');

	return (
		<form className="flex flex-col basis-3/4">
			<input type="hidden" name="locale" value={params.locale} />
			<div className="flex-grow">
				<label className="text-xl font-bold">{t('title')}</label>
				<div className="grid grid-cols-2 gap-6 justify-left items-center pt-10 w-1/2">
					<label className="">{t('theme')}</label>
					<ThemeDropdown lightTitle={t('light')} darkTitle={t('dark')} />
					<label className="">{t('language')}</label>
					<LanguageDropdown locale={params.locale} englishTitle={t('english')} frenchTitle={t('french')} />
				</div>
			</div>
		</form>
	);
}
