'use client';

import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PasswordInput() {
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordShown(!passwordShown);
	};
	return (
		<div className="relative flex items-center justify-center">
			<input
				className={`'text-xs input input-ghost px-4 py-2 flex-1`}
				type={passwordShown ? 'text' : 'password'}
				name="password"
				required
			/>
			<button onClick={togglePasswordVisibility} className="absolute right-0 mr-3" type="button">
				{passwordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
			</button>
		</div>
	);
}
