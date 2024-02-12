'use client';
import { useSettings } from '@/utils/provider/SettingsProvider';
import React, { useState, useEffect } from 'react';

interface Props {
	buttonText: string;
	style: string;
	inputsConfig: {
		match?: string[]; // Names of inputs that need to match (optional)
		filled?: string[]; // Names of inputs that just need to be filled (optional)
	};
}

export default function ConfirmButton({ buttonText, style, inputsConfig }: Props) {
	const [isEnabled, setIsEnabled] = useState(true);
	const { setHasChanges } = useSettings();

	useEffect(() => {
		const { match = [], filled = [] } = inputsConfig; // Default to empty arrays if not provided

		const allInputNames = Array.from(new Set([...match, ...filled])); // Combine and deduplicate names
		const inputs = allInputNames
			.map((name) => document.getElementsByName(name)[0])
			.filter(Boolean) as HTMLInputElement[];

		const validateInputs = () => {
			const matchValues = match.map((name) => (document.getElementsByName(name)[0] as HTMLInputElement)?.value);
			const filledValues = filled.map((name) => (document.getElementsByName(name)[0] as HTMLInputElement)?.value);

			// Check if all match inputs have the same value and are not empty
			const allMatchValid = matchValues.every((value, _, arr) => value && value === arr[0]);
			const allMatch = match.length > 0 ? allMatchValid : true;

			// Check if all filled inputs are not empty
			const allFilled = filledValues.every((value) => value !== '');

			setHasChanges(true);

			setIsEnabled(allMatch && allFilled);
		};

		// Add event listeners
		inputs.forEach((input) => input.addEventListener('input', validateInputs));

		// Remove event listeners on cleanup
		return () => {
			inputs.forEach((input) => input.removeEventListener('input', validateInputs));
		};
	}, [inputsConfig]); // Depend on inputsConfig to re-run the effect if it changes

	return (
		<button
			className={`${style} ${!isEnabled ? 'btn-disabled' : ''}`}
			disabled={!isEnabled}
			onClick={() => setHasChanges(false)}
		>
			{buttonText}
		</button>
	);
}
