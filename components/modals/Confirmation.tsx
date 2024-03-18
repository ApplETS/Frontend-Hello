'use client';

import React, { useState, useTransition } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';

interface Props {
	title: string;
	firstButtonTitle: string;
	secondButtonTitle: string;
	secondButtonColor: string;
	secondButtonHoverColor: string;
	inputTitle?: string;
	inputValue?: string;
	setInputValue?: (value: string) => void;
	onClose: () => void;
	handleError?: () => void;
	confirmationAction?: () => Promise<unknown>;
}

export default function Confirmation({
	title,
	firstButtonTitle,
	secondButtonTitle,
	secondButtonColor,
	secondButtonHoverColor,
	inputTitle,
	inputValue,
	setInputValue,
	onClose,
	handleError,
	confirmationAction,
}: Props) {
	const [isPending, startTransition] = useTransition();
	const { isLight } = useTheme();

	const handleClose = () => {
		onClose();
	};

	const submit = () => {
		startTransition(async () => {
			if (confirmationAction) {
				const response = await confirmationAction();
				if (response === false || response === undefined) {
					handleError && handleError();
				}
			}
		});
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
					{isPending ? (
						<div className="flex justify-center items-center w-full h-full">
							<div className="loading loading-spinner loading-lg"></div>
						</div>
					) : (
						<>
							{inputTitle && (
								<input
									type="text"
									placeholder={inputTitle}
									value={inputValue}
									className="input input-ghost w-full border-base-content mt-2"
									onChange={(e) => setInputValue && setInputValue(e.target.value)}
								/>
							)}
							<div className="mt-2">
								<button
									className={`btn text-black mr-3 ${isLight ? 'bg-base-300 hover:bg-secondary' : 'btn-secondary'}`}
									onClick={handleClose}
									type="button"
								>
									{firstButtonTitle}
								</button>
								<button
									className={`btn ${secondButtonColor} ${secondButtonHoverColor} text-black`}
									type="button"
									onClick={submit}
								>
									{secondButtonTitle}
								</button>
							</div>
						</>
					)}
				</dialog>
			</div>
		</>
	);
}
