import { createUser } from '@/app/[locale]/dashboard/accounts/actions/create';
import Dropdown from '@/components/SignUpActivity';
import { User } from '@/models/user';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';

interface Props {
	onClose: () => void;
	onCreate: (user: User | undefined) => void;
}

export default function UserCreationModal({ onClose, onCreate }: Props) {
	const t = useTranslations('Accounts.create');
	const [isPending, startTransition] = useTransition();
	const { isLight } = useTheme();

	const create = (formData: FormData) => {
		startTransition(async () => {
			const user = await createUser(formData);
			onCreate(user);
		});
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-10">
			<div className="bg-base-200 rounded-lg shadow-lg p-5 max-w-3xl w-full">
				<h2 className="text-2xl text-center font-semibold pb-4">{t('title')}</h2>
				{isPending ? (
					<div className="flex justify-center items-center w-full h-full">
						<div className="loading loading-spinner loading-lg"></div>
					</div>
				) : (
					<form action={create}>
						<div className="flex flex-row space-x-4 mb-4">
							{/* Organisation input */}
							<div className="flex flex-col flex-1">
								<label className="mb-2 text-base font-normal" htmlFor="organisation">
									{t('organisation')}
								</label>
								<input className="input input-ghost w-full" name="organisation" required />
							</div>
							{/* Activity dropdown */}
							<div className="flex flex-col flex-1">
								<label className="mb-2 text-base font-normal" htmlFor="activity">
									{t('activityarea')}
								</label>
								<Dropdown
									items={[
										{ title: t('activity.scientificClub') },
										{ title: t('activity.ets') },
										{ title: t('activity.sve') },
										{ title: t('activity.aeets') },
									]}
									inputName="activity"
								/>
							</div>
						</div>
						{/* Email input */}
						<div className="flex flex-col mb-4">
							<label className="text-md mb-2" htmlFor="email">
								{t('email')}
							</label>
							<input
								className="input input-ghost w-full"
								type="email"
								name="email"
								required
								placeholder="applets@etsmtl.ca"
							/>
						</div>
						<div className="divider divider-accent"></div>
						<div className="flex flex-row space-x-4 mb-4">
							<div className="w-3/5"></div>
							<button
								type="button"
								className={`btn font-normal text-black w-1/5 ${
									isLight ? 'bg-base-300 hover:bg-secondary' : 'btn-secondary bg-[#DCDCDC]'
								}`}
								onClick={onClose}
							>
								{t('close')}
							</button>
							<button className={`btn text-black btn-primary font-normal w-1/5 `}>{t('send')}</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
