'use client';

import React, { useState, useEffect } from 'react';

export default function EmailInput() {
	const [email, setEmail] = useState('');

	useEffect(() => {
		const storedEmail = localStorage.getItem('loginEmail');
		if (storedEmail) setEmail(storedEmail);
	}, []);

	const handleChange = async (e: { target: { value: React.SetStateAction<string> } }) => {
		await setEmail(e.target.value);

		if (e.target.value) {
			const checkbox = document.getElementById('checkbox') as HTMLInputElement;
			const isChecked = checkbox.checked;
			if (isChecked) {
				localStorage.setItem('loginEmail', e.target.value.toString());
			} else {
				localStorage.removeItem('loginEmail');
			}
		} else {
			localStorage.removeItem('loginEmail');
		}
	};

	return (
		<input
			className="input input-ghost mb-4"
			name="email"
			id="email"
			type="email"
			required
			value={email}
			onChange={handleChange}
		/>
	);
}
