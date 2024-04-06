import { createUser } from '@/lib/users/actions/create';
import { User } from '@/models/user';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { useTranslations } from 'next-intl';
import { useRef, useState, useTransition } from 'react';
import ActivityAreaDropdown from '../ActivityAreaDropdown';
import { ActivityArea, getActivityAreaName } from '@/models/activity-area';

interface Props {
	onClose: () => void;
	onCreate: (user: User | undefined) => void;
	activityAreas: ActivityArea[];
	locale: string;
}

export default function UserCreationModal({ onClose, onCreate, activityAreas, locale }: Props) {
	const { isLight } = useTheme();
	const t = useTranslations('Accounts.create');
	const [isPending, startTransition] = useTransition();
	const [selectedActivity, setSelectedActivity] = useState(t('activity.scientificClub'));
	const [email, setEmail] = useState('');
	const [organization, setOrganization] = useState('');
	const [errors, setErrors] = useState({ email: '', organization: '' });

	const items = activityAreas.map((activityArea) => {
		return {
			title: getActivityAreaName(activityArea, locale),
			value: activityArea.id,
		};
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let hasErrors = false;

		if (!email) {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: t('field-required', { field: t('email').toLowerCase() }),
			}));
			hasErrors = true;
		} else {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: '',
			}));
		}

		if (!organization) {
			setErrors((prevErrors) => ({
				...prevErrors,
				organization: t('field-required', { field: t('organization').toLowerCase() }),
			}));
			hasErrors = true;
		} else if (organization.length > 25) {
			setErrors((prevErrors) => ({
				...prevErrors,
				organization: t('organization-length-error'),
			}));
			hasErrors = true;
		} else {
			setErrors((prevErrors) => ({
				...prevErrors,
				organization: '',
			}));
		}

		if (!hasErrors) {
			const formData = new FormData(event.currentTarget);
			create(formData);
		}
	};

	const isSubmittingCreateRef = useRef(false);
	const create = (formData: FormData) => {
		if (isSubmittingCreateRef.current) {
			return;
		}

		isSubmittingCreateRef.current = true;

		startTransition(async () => {
			formData.set('activity', selectedActivity);
			const user = await createUser(formData);
			isSubmittingCreateRef.current = false;
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
					<form onSubmit={handleSubmit}>
						<div className="flex flex-row space-x-4 mb-4">
							<div className="flex flex-col flex-1">
								<label className="mb-2 text-base font-normal" htmlFor="organization">
									{t('organization')}
								</label>
								<input
									className="input input-ghost w-full"
									name="organization"
									value={organization}
									onChange={(e) => setOrganization(e.target.value)}
								/>
								{errors.organization && <p className="text-error">{errors.organization}</p>}
							</div>
							<div className="flex flex-col flex-1">
								<label className="mb-2 text-base font-normal" htmlFor="activity">
									{t('activityarea')}
								</label>
								<ActivityAreaDropdown
									items={items}
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
							<input
								className="input input-ghost w-full"
								type="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{errors.email && <p className="text-error">{errors.email}</p>}
						</div>
						<div className="divider my-1"></div>
						<div className="flex flex-row space-x-4">
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
							<button className={`btn text-black btn-primary font-normal w-1/5 `} type="submit">
								{t('send')}
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
