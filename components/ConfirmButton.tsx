'use client';

import { useSettings } from '@/utils/provider/SettingsProvider';
import React, { useState, useEffect } from 'react';

interface Props {
	buttonText: string;
	style: string;
	inputsConfig: {
		match?: string[]; // Names of inputs that need to match (optional)
		filled?: string[]; // Names of inputs that just need to be filled (optional)
		changed?: string[]; // Names of inputs that trigger hasChanges (optional)
	};
	onClick?: () => void;
}

export default function ConfirmButton({ buttonText, style, inputsConfig, onClick }: Props) {
	const { hasChanges, setHasChanges } = useSettings();

	const [isEnabled, setIsEnabled] = useState(hasChanges);

	useEffect(() => {
		const { match = [], filled = [], changed = [] } = inputsConfig;

		const allInputNames = Array.from(new Set([...match, ...filled, ...changed]));
		const inputs = allInputNames
			.map((name) => document.getElementsByName(name)[0])
			.filter(Boolean) as HTMLInputElement[];

		const validateInputs = () => {
			const matchValues = match.map((name) => (document.getElementsByName(name)[0] as HTMLInputElement)?.value);
			const filledValues = filled.map((name) => (document.getElementsByName(name)[0] as HTMLInputElement)?.value);

			const allMatchValid = matchValues.every((value, _, arr) => value && value === arr[0]);
			const allMatch = match.length > 0 ? allMatchValid : true;

			const allFilled = filledValues.every((value) => value !== '');

			setHasChanges(true);
			console.log(allMatch);
			console.log(allFilled);
			setIsEnabled(allMatch && allFilled);
		};

		inputs.forEach((input) => input.addEventListener('input', validateInputs));

		return () => {
			inputs.forEach((input) => input.removeEventListener('input', validateInputs));
		};
	}, [inputsConfig]);

	return (
		<button
			className={`font-normal ${style} ${!isEnabled ? 'btn-disabled' : ''}`}
			disabled={!isEnabled}
			type={onClick ? 'button' : 'submit'}
			onClick={() => {
				onClick && onClick();
				setHasChanges(false);
				setIsEnabled(false);
			}}
		>
			{buttonText}
		</button>
	);
}
