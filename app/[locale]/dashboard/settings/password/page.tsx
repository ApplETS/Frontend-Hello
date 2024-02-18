import { AlertType } from '@/components/Alert';
import CancelButton from '@/components/CancelButton';
import ConfirmButton from '@/components/ConfirmButton';
import Dropzone from '@/components/Dropzone';
import PasswordInput from '@/components/PasswordInput';
import Toast from '@/components/Toast';
import { updatePasswordSettings } from '@/utils/supabase/auth';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import SettingsFooter from '../components/SettingsFooter';

type Props = {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
};

export default function Page({ searchParams, params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('Settings.password-section');
	const t_dialog = useTranslations('Settings.dialog');
	return (
		<form className="flex flex-col basis-3/4" action={updatePasswordSettings}>
			{(searchParams.message || searchParams.code) && (
				<>
					<Toast
						message={searchParams.message ?? t(searchParams.code)}
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
					title: t('dialog.title'),
					message: t('dialog.message'),
					yes: t('dialog.yes'),
					no: t('dialog.no'),
				}}
			/>
		</form>
	);
}
