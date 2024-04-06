'use client';

import Checkbox from '@/components/Checkbox';
import PasswordInput from './PasswordInput';
import Alert, { AlertType } from '@/components/Alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import EmailInput from '@/components/EmailInput';
import { useTranslationsWithDefault } from '@/utils/traductions/trads';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useTransition } from 'react';
import { signInAction } from '@/lib/users/actions/sign-in-action';
import LoadingSpinner from '@/components/modals/LoadingSpinner';

interface Props {
	message?: string;
	code?: string;
	type?: string;
	locale: string;
}

export default function LoginForm({ message, code, type, locale }: Props) {
	const t = useTranslations('Login');
	const t_default = useTranslationsWithDefault('Login');

	const [formData, setFormData] = useState<FormData>();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({ email: '', password: '' });
	const [isLoading, startTransition] = useTransition();

	const formRef = useRef<HTMLFormElement>(null);

	const validateForm = () => {
		let isValid = true;

		if (!email) {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: t('field-required', { field: t('email').toLowerCase() }),
			}));
			isValid = false;
		} else {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: '',
			}));
		}

		if (!password) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: t('field-required', { field: t('password').toLowerCase() }),
			}));
			isValid = false;
		} else {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: '',
			}));
		}

		return isValid;
	};

	const submitForm = () => {
		const form = formRef.current;

		if (form) {
			if (validateForm()) {
				form.requestSubmit();
			}
		}
	};

	useEffect(() => {
		if (formData) {
			startTransition(async () => {
				await signInAction(formData);
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
				{(message || code) && (
					<Alert
						customStyle={'flex flex-1 flex-col w-full pb-2 justify-center gap-2'}
						text={message ?? t_default(code)}
						alertType={AlertType[type as keyof typeof AlertType] as AlertType}
						icon={faTriangleExclamation}
					/>
				)}
				<label className="text-md mb-4 flex-1 flex flex-col w-full justify-center gap-2" htmlFor="email">
					{t('email')}
					<EmailInput email={email} setEmail={setEmail} />
					{errors.email && <p className="text-error">{errors.email}</p>}
				</label>
				<label className="text-md" htmlFor="password">
					{t('password')}
				</label>
				<PasswordInput password={password} setPassword={setPassword} />
				{errors.password && <p className="text-error">{errors.password}</p>}
				<Checkbox
					inputName="remember"
					checked={false}
					style="self-end pb-6"
					text={t('remember')}
					textStyle="text-base"
				/>
				<div className="flex justify-center">
					<button
						className="font-normal btn btn-primary rounded-md text-base mb-2 w-64"
						type="button"
						onClick={() => submitForm()}
					>
						{t('login')}
					</button>
				</div>
			</form>
			{isLoading && <LoadingSpinner localModal={true} />}
		</>
	);
}
