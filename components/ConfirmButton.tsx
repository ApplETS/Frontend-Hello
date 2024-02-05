'use client';
import React, { useState, useEffect } from 'react';

interface Props {
	buttonText: string;
	style: string;
	extraInputs: boolean;
}

export default function ConfirmButton({ buttonText, style, extraInputs }: Props) {
	const [isEnabled, setIsEnabled] = useState(false);

	useEffect(() => {
		const passwordInput = document.getElementsByName('password')[0];
		const confirmPasswordInput = document.getElementsByName('confirmPassword')[0];
		let oldPasswordInput: HTMLInputElement;
		let oldConfirmPasswordInput: HTMLInputElement;

		const validateInputs = () => {
			const isMatch = (passwordInput as HTMLInputElement).value === (confirmPasswordInput as HTMLInputElement).value;
			const isNotEmpty =
				(passwordInput as HTMLInputElement).value !== '' && (confirmPasswordInput as HTMLInputElement).value !== '';

			if (extraInputs) {
				const isOldMatch = oldPasswordInput.value === oldConfirmPasswordInput.value;
				const isOldNotEmpty = oldPasswordInput.value !== '' && oldConfirmPasswordInput.value !== '';
				setIsEnabled(isMatch && isNotEmpty && isOldMatch && isOldNotEmpty);
				return;
			} else {
				setIsEnabled(isMatch && isNotEmpty);
			}
		};

		if (extraInputs) {
			oldPasswordInput = document.getElementsByName('oldPassword')[0] as HTMLInputElement;
			oldConfirmPasswordInput = document.getElementsByName('oldConfirmPassword')[0] as HTMLInputElement;
			oldPasswordInput.addEventListener('input', validateInputs);
			oldConfirmPasswordInput.addEventListener('input', validateInputs);
		}

		// Add event listeners
		passwordInput.addEventListener('input', validateInputs);
		confirmPasswordInput.addEventListener('input', validateInputs);

		// Remove event listeners on cleanup
		return () => {
			passwordInput.removeEventListener('input', validateInputs);
			confirmPasswordInput.removeEventListener('input', validateInputs);
		};
	}, []);

	return (
		<button className={`${style} ${!isEnabled ? 'btn-disabled' : ''}`} disabled={!isEnabled}>
			{buttonText}
		</button>
	);
}
