'use client';

import React, { useState, useEffect } from 'react';

interface CheckboxProps {
	inputName?: string;
	checked?: boolean;
	checkboxStyle?: string;
	textStyle?: string;
	text?: string;
	style?: string;
}

export default function Checkbox({ inputName, textStyle, text, style }: CheckboxProps) {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		const rememberMe = localStorage.getItem('rememberMe') === 'true';
		setChecked(rememberMe);
	}, []);

	const handleChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
		setChecked(e.target.checked);

		if (e.target.checked) {
			const email = (document.getElementById('email') as HTMLInputElement).value;
			localStorage.setItem('loginEmail', email);
			console.log(email);
		} else {
			localStorage.removeItem('loginEmail');
		}

		localStorage.setItem('rememberMe', e.target.checked.toString());
	};

	return (
		<div className={`${style} flex flex-row`}>
			<input
				name={inputName ?? 'checkbox'}
				type='checkbox'
				id='checkbox'
				value={inputName ?? 'checkbox'}
				checked={checked}
				onChange={handleChange}
				className='checkbox'
			/>
			<p className={`${textStyle} pl-4`}>{text}</p>
		</div>
	);
}
