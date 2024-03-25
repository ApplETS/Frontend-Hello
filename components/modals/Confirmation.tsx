import React, { useTransition } from 'react';
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
		<>
			<div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
				<dialog
					id="confirmation_modal"
					className={`modal bg-base-200 overflow-y-auto ${
						inputTitle ? 'p-5 w-[40rem]' : 'm-5 p-2 w-[32rem]'
					} rounded-2xl transform -translate-x-1/2 -translate-y-1/2 ${inputTitle ? 'h-64' : 'h-40 '}`}
					open={true}
					style={{ top: '50%', left: '50%' }}
				>
					{isPending ? (
						<div className="flex justify-center items-center w-full h-full">
							<div className="loading loading-spinner loading-lg"></div>
						</div>
					) : (
						<>
							<div className="w-full px-5">
								<p className="text-xl text-center">{title}</p>
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

							<div className={`grid grid-cols-2 gap-6 mt-2 ${inputTitle ? 'mt-5' : ''}`}>
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
