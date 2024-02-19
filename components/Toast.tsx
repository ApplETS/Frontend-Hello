'use client';

import React, { useState } from 'react';
import { AlertType } from './Alert';

type Props = {
	message: string;
	alertType: AlertType;
};

export default function Toast(props: Props) {
	const [isVisible, setIsVisible] = useState(true);

	const handleClose = () => {
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<div
			className={`absolute top-4 right-4 alert ${
				props.alertType ?? 'alert-info'
			} flex items-center w-full max-w-xs p-4 shadow-xl`}
			role='alert'
		>
			<div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200'>
				<svg
					className='w-5 h-5'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='currentColor'
					viewBox='0 0 20 20'
				>
					<path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
				</svg>
				<span className='sr-only'>Check icon</span>
			</div>
			<div className='ms-3 text-sm font-normal'>{props.message}</div>
			<button
				type='button'
				onClick={handleClose}
				className='ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8'
				aria-label='Close'
			>
				<span className='sr-only'>Close</span>
				<svg className='w-3 h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
					<path
						stroke='currentColor'
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
					/>
				</svg>
			</button>
		</div>
	);
}
