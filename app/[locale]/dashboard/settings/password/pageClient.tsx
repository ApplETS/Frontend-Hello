'use client';
import PasswordInput from '@/components/PasswordInput';
import SettingsFooter from '../components/SettingsFooter';
import { useTranslations } from 'next-intl';
import { updatePassword } from '@/app/actions/settings/update-password';
import { useRef } from 'react';
import { handleSubmitForm } from '@/app/actions/settings/submitForm';
import { useLoading } from '@/utils/provider/LoadingProvider';
import { useToast } from '@/utils/provider/ToastProvider';
import { useTranslationsWithDefault } from '@/utils/traductions/trads';

export default function PasswordClient() {
	const t = useTranslations('Settings.password-section');
	const t_dialog = useTranslations('Settings.dialog');
	const t_default = useTranslationsWithDefault('Settings.password-section');
	const formRef = useRef<HTMLFormElement>(null);
	const { startTransition } = useLoading();
	const { setToast } = useToast();

	return (
		<form
			className="flex flex-col basis-4/5"
			ref={formRef}
			action={(formData) =>
				handleSubmitForm(formData, updatePassword, startTransition, setToast, t_default, formRef.current)
			}
		>
			<div className="flex-grow">
				<label className="text-xl font-bold">{t('title')}</label>
				<div className="grid grid-cols-4 gap-6 justify-left items-center pt-10">
					<label>{t('new-password')}</label>
					<PasswordInput />
					<label className="pl-10">{t('confirm-new-password')}</label>
					<PasswordInput inputName="confirmPassword" />
				</div>
			</div>
			<SettingsFooter
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
