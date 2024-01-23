'use client';
import { useState } from 'react';
import Eye from '@/public/Eye.svg';
import Image from 'next/image';

export default function PasswordInput() {
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordShown(!passwordShown);
	};
	return (
		<div className='relative flex items-center justify-center'>
			<input
				className={`'text-xs input input-ghost input-primary input-bordered bg-inherit text-primary flex-1`}
				type={passwordShown ? 'text' : 'password'}
				name='password'
				required
			/>
			<button onClick={togglePasswordVisibility} className='absolute right-0 mr-3' type='button'>
				{passwordShown ? <Image src={Eye} alt={'eye'} /> : <Image src={Eye} alt={'eye'} />}
			</button>
		</div>
	);
}