import React, { useState, useTransition } from 'react';
import { useTheme } from '@/utils/provider/ThemeProvider';
import Modal from './Modal';
import { useTranslations } from 'next-intl';

interface Props {
	onSend: (email: string) => void;
	onClose: () => void;
}

export default function AskEmail({ onSend, onClose }: Props) {
	const t = useTranslations('Profile');
	const { isLight } = useTheme();
	const [isPending] = useTransition();
	const [errors, setErrors] = useState({ email: '' });

	const [email, setEmail] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!email) {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: t('field-required', { field: t('email').toLowerCase() }),
			}));
			return;
		}

		onSend(email);
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
							<p className="text-xl text-center mb-2">{t('enter-email')}</p>
							<div className="flex flex-col">
								<label className="w-full" htmlFor="email">
									<span className="label-text text-base mt-2">{t('email')}</span>
									<div className="relative flex items-center justify-center">
										<input
											id="email"
											type="email"
											className="text-xs input input-ghost px-4 py-2 flex-1"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									{errors.email && <p className="text-error">{errors.email}</p>}
								</label>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-6 px-24 mt-7">
							<button
								className={`btn text-black ${isLight ? 'bg-base-300 hover:bg-secondary' : 'btn-secondary'}`}
								onClick={() => onClose()}
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
