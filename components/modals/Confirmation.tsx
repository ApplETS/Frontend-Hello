import React, { useTransition } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';
import Modal from './Modal';

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
	verify,
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
		<Modal>
			<div id="confirmation_modal" className={`bg-base-200 overflow-y-auto p-7 max-w-[40rem] rounded-2xl max-h-full`}>
				{isPending ? (
					<div className="flex justify-center items-center w-full h-full">
						<div className="loading loading-spinner loading-lg"></div>
					</div>
				) : (
					<div className="flex flex-col h-full justify-between">
						<div className="w-full">
							<p className="text-xl text-center mb-2">{title}</p>
							{inputTitle && (
								<label className="w-full" htmlFor="input">
									<div className="flex flex-col">
										<span className="label-text text-base mt-2">{inputTitle}</span>
										<textarea
											name="input"
											className="textarea textarea-ghost border-current row-span-2 h-full self-start col-span-2 w-full mt-2"
											required
											value={inputValue}
											onChange={(e) => setInputValue && setInputValue(e.target.value)}
										/>
									</div>
								</label>
							)}
						</div>

						<div className={`grid grid-cols-2 gap-6 mt-2 px-24 ${inputTitle ? 'mt-5' : ''}`}>
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
					</div>
				)}
			</div>
		</Modal>
	);
}
