'use client';
import { useState } from 'react';
import Eye from '../../../public/Eye.svg';
import Image from 'next/image';

export default function PasswordInput() {
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordShown(!passwordShown);
	};
	return (
		<div className='relative flex items-center justify-center border rounded-md'>
			<input
				className={`${passwordShown ? 'text-base' : 'text-xs my-1'} rounded-md px-4 py-2 bg-inherit flex-1`}
				type={passwordShown ? 'text' : 'password'}
				name='password'
				placeholder='••••••••'
				required
				style={{ border: 'none', outline: 'none' }}
			/>
			<button onClick={togglePasswordVisibility} className='absolute right-0 mr-3' type='button'>
				{passwordShown ? <Image src={Eye} alt={'eye'} /> : <Image src={Eye} alt={'eye'} />}
			</button>
		</div>
	);
}
