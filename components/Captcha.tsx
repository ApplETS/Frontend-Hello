'use client';
import ReCAPTCHA from 'react-google-recaptcha';
import { verifyCaptcha } from '@/utils/google/ServerActions';
import { useRef, useState } from 'react';

export default function Captcha() {
	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const [isVerified, setIsverified] = useState<boolean>(false);

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
				className=''
			/>
			<div className='flex flex-col col-span-2 mt-2'>
				<button
					className={`btn ${
						!isVerified ? 'btn-disabled' : ''
					} btn-ghost bg-secondary rounded-md text-foreground text-base py-2 hover:bg-secondary/75`}
				>
					S&apos;inscrire
				</button>
			</div>
		</>
	);
}
