'use client';

import React, { createRef, useRef, useTransition } from 'react';
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
	verify?: () => boolean;
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
	verify
}: Props) {
	const [isPending, startTransition] = useTransition();
	const { isLight } = useTheme();

	const handleClose = () => {
		onClose();
	};

	const submit = () => {
		if (verify && verify()) {
			return;
		}
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
					className={`modal bg-base-200 overflow-y-auto ${inputTitle ? "px-12 py-4 w-1/2" : "p-4 w-96"} rounded-2xl transform -translate-x-1/2 -translate-y-1/2 ${
						inputTitle ? 'h-1/2' : 'h-40 '
					}`}
					open={true}
					style={{ top: '50%', left: '50%' }}
				>
					{isPending ? (
						<div className="flex justify-center items-center w-full h-full">
							<div className="loading loading-spinner loading-lg"></div>
						</div>
					) : (
						<>
							<p className='text-xl text-center'>{title}</p>
							{inputTitle && (
								<label className='w-full' htmlFor="input">
									<span className="label-text text-base">{inputTitle}</span>
									<input
										name="input"
										type="text"
										value={inputValue}
										className="input input-ghost w-full border-base-content mt-2"
										required
										onChange={(e) => setInputValue && setInputValue(e.target.value)}
									/>
								</label>
							)}
							<div className="mt-2 grid grid-cols-2 gap-6">
								<button
									className={`btn text-black ${isLight ? 'bg-base-300 hover:bg-secondary' : 'btn-secondary'}`}
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
