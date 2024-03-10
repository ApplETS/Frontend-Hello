import { AlertType } from '@/components/Alert';
import PasswordInput from '@/components/PasswordInput';
import Toast from '@/components/Toast';
import { updatePasswordSettings } from '@/utils/supabase/auth';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import SettingsFooter from '../components/SettingsFooter';
import { getTranslationsWithDefault } from '@/utils/traductions/trads';

type Props = {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
};

export default async function Page({ searchParams, params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = await getTranslations('Settings.password-section');
	const t_dialog = await getTranslations('Settings.dialog');
	const t_default = await getTranslationsWithDefault('Settings.password-section');
	return (
		<form className="flex flex-col basis-3/4" action={updatePasswordSettings}>
			{(searchParams.message || searchParams.code) && (
				<>
					<Toast
						message={searchParams.message ?? t_default(searchParams.code)}
						alertType={AlertType[searchParams.type as keyof typeof AlertType] as AlertType}
					/>
				</>
			)}
			<input type="hidden" name="locale" value={params.locale} />
			<div className="flex-grow p-4">
				<label className="text-xl font-bold">{t('title')}</label>
				<div className="grid grid-cols-4 gap-6 justify-left items-center pt-10">
					<label>{t('newPassword')}</label>
					<PasswordInput />

					<label className="pl-10">{t('confirmNewPassword')}</label>
					<PasswordInput inputName="confirmPassword" />
				</div>
			</div>
			<SettingsFooter
				locale={params.locale}
				buttonText={t('save')}
				errorText={t('changes')}
				inputsConfig={{
					match: ['password', 'confirmPassword'],
				}}
				cancelButtonText={t('cancel')}
				dialogText={{
					title: t_dialog('title'),
					message: t_dialog('message'),
					yes: t_dialog('yes'),
					no: t_dialog('no'),
				}}
			/>
		</form>
	);
}
