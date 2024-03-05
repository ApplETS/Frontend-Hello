'use client';

import React, { useState } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';

interface ConfirmationProps {
	title: string;
	firstButtonTitle: string;
	secondButtonTitle: string;
	secondButtonColor: string;
	secondButtonHoverColor: string;
	inputTitle?: string;
	onClose: () => void;
}

export default function Confirmation({
	title,
	firstButtonTitle,
	secondButtonTitle,
	secondButtonColor,
	secondButtonHoverColor,
	inputTitle,
	onClose,
}: ConfirmationProps) {
	const { isLight } = useTheme();
	const [inputText, setInputText] = useState('');

	const handleClose = () => {
		onClose();
	};

	const submit = () => {
		onClose();
	};

	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
				<dialog
					id="confirmation_modal"
					className={`modal bg-base-200 overflow-y-auto p-4 w-96 rounded-lg transform -translate-x-1/2 -translate-y-1/2 ${
						inputTitle ? 'h-52' : 'h-40 '
					}`}
					open={true}
					style={{ top: '50%', left: '50%' }}
				>
					<p>{title}</p>
					{inputTitle && (
						<input
							type="text"
							placeholder={inputTitle}
							value={inputText}
							className="input input-ghost w-full border-base-content mt-2"
							onChange={(e) => setInputText(e.target.value)}
						/>
					)}
					<div className="mt-2">
						<button
							className={`btn text-black mr-3 ${isLight ? 'bg-base-300 hover:bg-secondary' : 'btn-secondary'}`}
							onClick={handleClose}
						>
							{firstButtonTitle}
						</button>
						<button className={`btn ${secondButtonColor} ${secondButtonHoverColor} text-black`} onClick={submit}>
							{secondButtonTitle}
						</button>
					</div>
				</dialog>
			</div>
		</>
	);
}
