'use client';
import React, { useState, useEffect } from 'react';

interface Props {
	buttonText: string;
	style: string;
}

export default function ConfirmButton({ buttonText, style }: Props) {
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

	return (
		<button className={`${style} ${!isEnabled ? 'btn-disabled' : ''}`} disabled={!isEnabled}>
			{buttonText}
		</button>
	);
}
