'use client';
import { useState } from 'react';
import Eye from '@/public/Eye.svg';
import Image from 'next/image';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	inputName?: string;
	style?: string;
}

export default function PasswordInput({ inputName, style }: Props) {
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
				required
			/>
			<button onClick={togglePasswordVisibility} className="absolute right-0 mr-3" type="button">
				{passwordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
			</button>
		</div>
	);
}
