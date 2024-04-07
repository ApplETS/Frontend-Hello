'use client';

import React, { useEffect } from 'react';

interface Props {
	email: string;
	setEmail: (email: string) => void;
}

export default function EmailInput({ email, setEmail }: Props) {
	useEffect(() => {
		const storedEmail = localStorage.getItem('loginEmail');
		if (storedEmail) setEmail(storedEmail);
	}, []);

	const handleChange = (email: string) => {
		setEmail(email);

		if (email) {
			const checkbox = document.getElementById('checkbox') as HTMLInputElement;
			const isChecked = checkbox.checked;
			if (isChecked) {
				localStorage.setItem('loginEmail', email);
			} else {
				localStorage.removeItem('loginEmail');
			}
		} else {
			localStorage.removeItem('loginEmail');
		}
	};

	return (
		<input
			className="input input-ghost"
			name="email"
			id="email"
			type="email"
			required
			value={email}
			onChange={(e) => handleChange(e.target.value)}
		/>
	);
}
