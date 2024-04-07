'use client';

import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	password: string;
	setPassword: (password: string) => void;
	inputName?: string;
	style?: string;
}

export default function PasswordInput({ password, setPassword, inputName, style }: Props) {
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordShown(!passwordShown);
	};
	return (
		<div className={`${style} relative flex items-center justify-center`}>
			<input
				className={`'text-xs input input-ghost px-4 py-2 bg-inherit flex-1`}
				type={passwordShown ? 'text' : 'password'}
				name={inputName ?? 'password'}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button onClick={togglePasswordVisibility} className="absolute right-0 mr-3" type="button">
				{passwordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
			</button>
		</div>
	);
}
