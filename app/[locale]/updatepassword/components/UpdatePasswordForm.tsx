'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useTransition } from 'react';
import LoadingSpinner from '@/components/modals/LoadingSpinner';
import PasswordInput from '@/components/PasswordInput';
import { updatePassword } from '@/app/actions/settings/update-password';
import { updatePasswordAction } from '@/lib/users/actions/update-password-action';

interface Props {
	emailStart: string;
	locale: string;
}

export default function UpdatePasswordForm({ emailStart, locale }: Props) {
	const t = useTranslations('UpdatePassword');

	const [formData, setFormData] = useState<FormData>();
	const [email, setEmail] = useState(emailStart);
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [token, setToken] = useState('');
	const [errors, setErrors] = useState({ email: '', password: '', passwordConfirm: '', token: '' });
	const [isLoading, startTransition] = useTransition();

	const formRef = useRef<HTMLFormElement>(null);

	const validateForm = () => {
		let isValid = true;
		let newErrors = { email: '', password: '', passwordConfirm: '', token: '' };

		if (!email) {
			newErrors.email = t('field-required', { field: t('email').toLowerCase() });
			isValid = false;
		}

		if (!password) {
			newErrors.password = t('field-required', { field: t('new-password').toLowerCase() });
			isValid = false;
		}

		if (!passwordConfirm) {
			newErrors.passwordConfirm = t('field-required-f', { field: t('confirm-password').toLowerCase() });
			isValid = false;
		} else if (passwordConfirm !== password) {
			newErrors.passwordConfirm = t('passwords-must-match');
			isValid = false;
		}

		if (!token) {
			newErrors.token = t('field-required', { field: t('token').toLowerCase() });
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const submitForm = () => {
		const form = formRef.current;

		if (form && validateForm()) {
			form.requestSubmit();
		}
	};

	useEffect(() => {
		if (formData) {
			startTransition(async () => {
				await updatePasswordAction(formData);
			});
		}
	}, [formData]);

	return (
		<>
			<form
				ref={formRef}
				className="flex-1 flex flex-col w-full justify-center gap-2"
				action={(formData) => setFormData(formData)}
			>
				<input type="hidden" name="locale" value={locale} />
				<label className="mb-4 flex-1 flex flex-col w-full justify-center gap-2" htmlFor="token">
					{t('token')}
					<input
						className="input input-ghost"
						value={token}
						onChange={(e) => setToken(e.target.value)}
						name="token"
						placeholder={t('token-placeholder')}
						required
					/>
					{errors.token && <p className="text-error">{errors.token}</p>}
				</label>
				<label className="mb-4 flex-1 flex flex-col w-full justify-center gap-2" htmlFor="email">
					{t('email')}
					<input
						className="input input-ghost"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					{errors.email && <p className="text-error">{errors.email}</p>}
				</label>
				<label className="mb-4 flex-1 flex flex-col w-full justify-center gap-2" htmlFor="password">
					{t('new-password')}
					<PasswordInput password={password} setPassword={setPassword} />
					{errors.password && <p className="text-error">{errors.password}</p>}
				</label>
				<label className="flex-1 flex flex-col w-full justify-center gap-2" htmlFor="confirmPassword">
					{t('confirm-password')}
					<PasswordInput inputName="confirmPassword" password={passwordConfirm} setPassword={setPasswordConfirm} />
					{errors.passwordConfirm && <p className="text-error">{errors.passwordConfirm}</p>}
				</label>
				<div className="flex justify-center mt-12">
					<button className={`btn btn-primary text-base mb-8 w-64`} type="button" onClick={() => submitForm()}>
						{t('update')}
					</button>
				</div>
			</form>
			{isLoading && <LoadingSpinner localModal={true} />}
		</>
	);
}
