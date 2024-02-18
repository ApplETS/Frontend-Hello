'use client';
import ReCAPTCHA from 'react-google-recaptcha';
import { verifyCaptcha } from '@/utils/google/ServerActions';
import { useEffect, useRef, useState } from 'react';

export default function Captcha() {
	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const [isVerified, setIsverified] = useState<boolean>(false);

	const [isEnabled, setIsEnabled] = useState(false);

	useEffect(() => {
		const passwordInput = document.getElementsByName('password')[0];
		const confirmPasswordInput = document.getElementsByName('confirmPassword')[0];

		const validateInputs = () => {
			const isMatch = (passwordInput as HTMLInputElement).value === (confirmPasswordInput as HTMLInputElement).value;
			const isNotEmpty =
				(passwordInput as HTMLInputElement).value !== '' && (confirmPasswordInput as HTMLInputElement).value !== '';
			setIsEnabled(isMatch && isNotEmpty);
		};

		// Add event listeners
		passwordInput.addEventListener('input', validateInputs);
		confirmPasswordInput.addEventListener('input', validateInputs);

		// Remove event listeners on cleanup
		return () => {
			passwordInput.removeEventListener('input', validateInputs);
			confirmPasswordInput.removeEventListener('input', validateInputs);
		};
	}, []);

	async function handleCaptchaSubmission(token: string | null) {
		// Server function to verify captcha
		await verifyCaptcha(token)
			.then(() => setIsverified(true))
			.catch(() => setIsverified(false));
	}
	return (
		<>
			<ReCAPTCHA
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
				ref={recaptchaRef}
				onChange={handleCaptchaSubmission}
				className='pb-8'
			/>
			<button
				className={`btn text-base ${!isVerified || !isEnabled ? 'btn-disabled' : 'btn-primary'}  py-2 mb-4 w-[60%]`}
			>
				S&apos;inscrire
			</button>
		</>
	);
}
