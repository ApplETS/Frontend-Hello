import React, { useState, useTransition } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';
import Modal from './Modal';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@/utils/provider/ToastProvider';
import { AlertType } from '../Alert';

interface Props {
	onClose: () => void;
}

export default function SetPassword({ onClose }: Props) {
	const t = useTranslations('SetPassword');
	const { isLight } = useTheme();
	const { setToast } = useToast();

	const [isPending, startTransition] = useTransition();
	const [newPassword, setNewPassword] = useState('');
	const [passwordShown, setPasswordShown] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

	const handleClose = () => {
		onClose();
	};

	const togglePasswordVisibility = () => {
		setPasswordShown(!passwordShown);
	};

	const toggleConfirmPasswordVisibility = () => {
		setConfirmPasswordShown(!confirmPasswordShown);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (newPassword !== confirmPassword) {
			setToast(t('password-mismatch-error'), AlertType.error);
			return;
		}
		startTransition(async () => {
			// TODO: handle submit
			const success = 'success';

			setToast(
				t(`password-${success ? 'success' : 'error'}-toast-message`),
				success ? AlertType.success : AlertType.error
			);
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
					<form className="flex flex-col h-full justify-between" onSubmit={handleSubmit}>
						<div className="w-full">
							<p className="text-xl text-center mb-2">{t('title')}</p>
							<div className="flex flex-col">
								<label className="w-full" htmlFor="newPassword">
									<span className="label-text text-base mt-2">{t('new-password')}</span>
									<div className="relative flex items-center justify-center">
										<input
											id="newPassword"
											type={passwordShown ? 'text' : 'password'}
											className="'text-xs input input-ghost px-4 py-2 flex-1"
											required
											value={newPassword}
											onChange={(e) => setNewPassword(e.target.value)}
										/>
										<button onClick={togglePasswordVisibility} className="absolute right-0 mr-3" type="button">
											{passwordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
										</button>
									</div>
								</label>
							</div>
							<div className="flex flex-col mt-3">
								<label className="w-full" htmlFor="confirmPassword">
									<span className="label-text text-base mt-2">{t('confirm-password')}</span>
									<div className="relative flex items-center justify-center">
										<input
											id="confirmPassword"
											type={confirmPasswordShown ? 'text' : 'password'}
											className="'text-xs input input-ghost px-4 py-2 flex-1"
											required
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
										<button onClick={toggleConfirmPasswordVisibility} className="absolute right-0 mr-3" type="button">
											{confirmPasswordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
										</button>
									</div>
								</label>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-6 px-24 mt-7">
							<button
								className={`btn text-black ${isLight ? 'bg-base-300 hover:bg-secondary' : 'btn-secondary'}`}
								onClick={handleClose}
								type="button"
							>
								{t('cancel')}
							</button>
							<button className={`btn btn-success text-black`} type="submit">
								{t('save')}
							</button>
						</div>
					</form>
				)}
			</div>
		</Modal>
	);
}
