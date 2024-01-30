'use client';
import { useState } from 'react';
import Eye from '@/public/Eye.svg';
import Image from 'next/image';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PasswordInput() {
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordShown(!passwordShown);
	};
	return (
		<div className='relative flex items-center justify-center'>
			<input
<<<<<<<< HEAD:components/PasswordInput.tsx
				className={`'text-xs input input-ghost input-primary input-bordered bg-inherit text-primary flex-1`}
========
				className={`'text-xs input input-ghost input-bordered px-4 py-2 bg-inherit flex-1`}
>>>>>>>> main:app/[locale]/login/components/PasswordInput.tsx
				type={passwordShown ? 'text' : 'password'}
				name='password'
				required
			/>
			<button onClick={togglePasswordVisibility} className='absolute right-0 mr-3' type='button'>
				{passwordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
			</button>
		</div>
	);
}