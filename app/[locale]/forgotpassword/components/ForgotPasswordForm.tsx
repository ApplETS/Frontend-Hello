'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useTransition } from 'react';
import LoadingSpinner from '@/components/modals/LoadingSpinner';
import { forgotPasswordAction } from '@/lib/users/actions/forgot-password-action';

interface Props {
	locale: string;
}

export default function ForgotPasswordForm({ locale }: Props) {
	const t = useTranslations('ForgotPassword');

	const [formData, setFormData] = useState<FormData>();
	const [email, setEmail] = useState('');
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
				await forgotPasswordAction(formData);
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
				<label className="text-md mb-6 flex-1 flex flex-col w-full justify-center gap-2" htmlFor="email">
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
				<div className="flex justify-center">
					<button
						className="font-normal btn btn-primary rounded-md text-base mb-8 w-64"
						type="button"
						onClick={() => submitForm()}
					>
						{t('send')}
					</button>
				</div>
			</form>
			{isLoading && <LoadingSpinner localModal={true} />}
		</>
	);
}
