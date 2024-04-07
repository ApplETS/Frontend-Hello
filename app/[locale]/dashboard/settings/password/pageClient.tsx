'use client';
import PasswordInput from '@/components/PasswordInput';
import SettingsFooter from '../components/SettingsFooter';
import { useTranslations } from 'next-intl';
import { updatePassword } from '@/app/actions/settings/update-password';
import { useEffect, useRef, useState } from 'react';
import { handleSubmitForm } from '@/app/actions/settings/submitForm';
import { useLoading } from '@/utils/provider/LoadingProvider';
import { useToast } from '@/utils/provider/ToastProvider';
import { useTranslationsWithDefault } from '@/utils/traductions/trads';
import { useSettings } from '@/utils/provider/SettingsProvider';

export default function PasswordClient() {
	const t = useTranslations('Settings.password-section');
	const t_dialog = useTranslations('Settings.dialog');
	const t_default = useTranslationsWithDefault('Settings.password-section');
	const formRef = useRef<HTMLFormElement>(null);

	const { startTransition } = useLoading();
	const { setToast } = useToast();
	const { setHasChanges } = useSettings();

	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [errors, setErrors] = useState({ password: '', passwordConfirm: '' });

	const validateForm = () => {
		let isValid = true;
		let newErrors = { password: '', passwordConfirm: '' };

		if (passwordConfirm !== password) {
			newErrors.passwordConfirm = t('passwords-must-match');
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	useEffect(() => {
		validateForm();
	}, [password, passwordConfirm]);

	return (
		<form
			className="flex flex-col basis-4/5"
			ref={formRef}
			action={(formData) => {
				handleSubmitForm(formData, updatePassword, startTransition, setToast, t_default, formRef.current);
				setHasChanges(false);
			}}
		>
			<div className="flex-grow">
				<label className="text-xl font-bold">{t('title')}</label>
				<div className="grid grid-cols-2 gap-8 pt-10 justify-start items-start">
					<div className="grid grid-cols-4 gap-4">
						<label className="flex items-center">{t('new-password')}</label>
						<PasswordInput password={password} setPassword={setPassword} style="col-span-3" />
					</div>
					<div className="grid grid-cols-4 gap-4">
						<label className={`flex items-center ${errors.passwordConfirm && 'mb-8'}`}>
							{t('confirm-new-password')}
						</label>
						<div className="flex flex-col gap-2 col-span-3">
							<PasswordInput password={passwordConfirm} setPassword={setPasswordConfirm} inputName="confirmPassword" />
							{errors.passwordConfirm && <p className="text-error">{errors.passwordConfirm}</p>}
						</div>
					</div>
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
