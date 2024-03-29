import { createUser } from '@/lib/users/actions/create';
import { User } from '@/models/user';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import ActivityAreaDropdown from '../ActivityAreaDropdown';

interface Props {
	onClose: () => void;
	onCreate: (user: User | undefined) => void;
}

export default function UserCreationModal({ onClose, onCreate }: Props) {
	const t = useTranslations('Accounts.create');
	const [isPending, startTransition] = useTransition();
	// TODO : Change with backend value ?
	const [selectedActivity, setSelectedActivity] = useState(t('activity.scientificClub'));
	const { isLight } = useTheme();

	const create = (formData: FormData) => {
		startTransition(async () => {
			formData.set('activity', selectedActivity);
			const user = await createUser(formData);
			onCreate(user);
		});
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-10">
			<div className="bg-base-200 rounded-2xl shadow-lg p-6 max-w-3xl w-full">
				<h2 className="text-2xl text-center font-semibold pb-4">{t('title')}</h2>
				{isPending ? (
					<div className="flex justify-center items-center w-full h-full">
						<div className="loading loading-spinner loading-lg"></div>
					</div>
				) : (
					<form action={create}>
						<div className="flex flex-row space-x-4 mb-4">
							<div className="flex flex-col flex-1">
								<label className="mb-2 text-base font-normal" htmlFor="organization">
									{t('organization')}
								</label>
								<input className="input input-ghost w-full" name="organization" required />
							</div>
							<div className="flex flex-col flex-1">
								<label className="mb-2 text-base font-normal" htmlFor="activity">
									{t('activityarea')}
								</label>
								<ActivityAreaDropdown
									items={[
										{ title: t('activity.scientificClub') },
										{ title: t('activity.ets') },
										{ title: t('activity.sve') },
										{ title: t('activity.aeets') },
									]}
									inputName="activity"
									onItemChange={(item: string) => setSelectedActivity(item)}
									customStyle="col-span-2"
								/>
							</div>
						</div>
						<div className="flex flex-col mb-4">
							<label className="text-md mb-2" htmlFor="email">
								{t('email')}
							</label>
							<input className="input input-ghost w-full" type="email" name="email" required />
						</div>
						<div className="divider before:bg-base-content after:bg-base-content"></div>
						<div className="flex flex-row space-x-4">
							<div className="w-3/5"></div>
							<button
								type="button"
								className={`btn text-lg font-normal text-black w-1/5 ${
									isLight ? 'bg-base-300 hover:bg-secondary' : 'btn-secondary bg-[#DCDCDC]'
								}`}
								onClick={onClose}
							>
								{t('close')}
							</button>
							<button className={`btn text-lg text-black btn-primary font-normal w-1/5 `}>{t('send')}</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
