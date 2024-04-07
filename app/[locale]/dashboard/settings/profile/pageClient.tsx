'use client';

import ActivityAreaDropdown from '@/components/ActivityAreaDropdown';
import SettingsFooter from '../components/SettingsFooter';
import ProfilePicture from './components/ProfilePicture';
import { useTranslationsWithDefault } from '@/utils/traductions/trads';
import { UserTypes } from '@/models/user-types';
import { useTranslations } from 'next-intl';
import { useUser } from '@/utils/provider/UserProvider';
import { handleSubmitForm } from '@/app/actions/settings/submitForm';
import { updateProfile } from '@/app/actions/settings/update-profile';
import { useLoading } from '@/utils/provider/LoadingProvider';
import { useToast } from '@/utils/provider/ToastProvider';
import { useEffect, useRef, useState } from 'react';
import { Area } from 'react-easy-crop';
import { getCroppedImgOnly } from '@/utils/canvasUtils';
import { ActivityArea, getActivityAreaName } from '@/models/activity-area';

interface Props {
	locale: string;
	activityAreas: ActivityArea[];
}

export default function ProfileClient({ locale, activityAreas }: Props) {
	const t = useTranslations('Settings.profile-section');
	const t_default = useTranslationsWithDefault('Settings.profile-section');
	const t_dialog = useTranslations('Settings.dialog');

	const { user } = useUser();
	const { startTransition } = useLoading();
	const { setToast } = useToast();

	const isOrganizer = user?.type == UserTypes.ORGANIZER;

	const [formData, setFormData] = useState<FormData>();
	const [image, setImage] = useState<string | null>(null);
	const [rotation, setRotation] = useState(0);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const [organization, setOrganization] = useState(user?.organization);
	const [activity, setActivity] = useState(user?.activityArea?.id);
	const [errors, setErrors] = useState({ organization: '', activity: '' });

	const formRef = useRef<HTMLFormElement>(null);

	const validateForm = () => {
		let isValid = true;
		if (!organization) {
			setErrors((prevErrors) => ({
				...prevErrors,
				organization: t('field-required', { field: t('company-name').toLowerCase() }),
			}));
			isValid = false;
		} else {
			setErrors((prevErrors) => ({
				...prevErrors,
				organization: '',
			}));
		}

		if (!activity) {
			setErrors((prevErrors) => ({
				...prevErrors,
				activity: t('field-required', { field: t('activity').toLowerCase() }),
			}));
			isValid = false;
		} else {
			setErrors((prevErrors) => ({
				...prevErrors,
				activity: '',
			}));
		}

		return isValid;
	};

	useEffect(() => {
		setOrganization(user?.organization);
		setActivity(user?.activityArea?.id);
	}, [user]);

	useEffect(() => {
		validateForm();
	}, [organization, activity]);

	const items = activityAreas.map((activityArea) => {
		return {
			title: getActivityAreaName(activityArea, locale),
			value: activityArea.id,
		};
	});

	const getImageCropped = async () => {
		try {
			const croppedImage = await getCroppedImgOnly(image, croppedAreaPixels);
			const response = await fetch(croppedImage);

			if (!response.ok) {
				throw new Error('Failed to fetch image data');
			}

			const blob = await response.blob();

			return blob;
		} catch (error) {
			console.error('Error fetching image data:', error);
		}

		return null;
	};

	useEffect(() => {
		if (formData) {
			startTransition(async () => {
				const sendFormData = formData;
				const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
				const filename = `image_${timestamp}.jpg`;
				const blob = await getImageCropped();
				if (blob) sendFormData.set('avatarFile', blob, filename);
				handleSubmitForm(sendFormData, updateProfile, startTransition, setToast, t_default);
				setImage('');
			});
		}
	}, [formData]);

	function handleSubmit() {
		const form = formRef.current;

		if (form) {
			form.requestSubmit();
		}
	}

	return (
		<form className="flex flex-col basis-4/5" ref={formRef} action={(formData) => setFormData(formData)}>
			<div className="flex-grow">
				<label className="text-xl font-bold">{t('title')}</label>
				<div className="grid grid-cols-2 gap-8 mt-10 mb-6">
					<div className="grid grid-cols-3 gap-2">
						<ProfilePicture
							dropzoneText={t('drop-picture')}
							buttonText={t('delete-picture')}
							setCroppedAreaPixels={setCroppedAreaPixels}
							image={image}
							setImage={setImage}
							rotation={rotation}
							setRotation={setRotation}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-8 justify-start items-start">
					<div className="grid grid-cols-3 gap-4">
						{isOrganizer && (
							<>
								<label className={`flex items-center col-span-1 ${errors.organization && 'mb-8'}`}>
									{t('company-name')}
								</label>
								<div className="flex flex-col gap-2 col-span-2">
									<input
										type="text"
										className="input input-ghost"
										name="organization"
										onChange={(e) => setOrganization(e.target.value)}
										value={organization ?? ''}
										required
									/>
									{errors.organization && <p className="text-error">{errors.organization}</p>}
								</div>
							</>
						)}
						<label className="flex items-center col-span-1">{t('email')}</label>
						<input
							type="text"
							className="input input-ghost col-span-2"
							name="email"
							defaultValue={user?.email ?? ''}
							disabled
						/>
						{user && isOrganizer && (
							<>
								<label className={`flex items-center col-span-1 ${errors.activity && 'mb-8'}`}>{t('activity')}</label>
								<div className="flex flex-col gap-2 col-span-2" style={{ pointerEvents: 'none', opacity: 0.5 }}>
									<ActivityAreaDropdown
										items={items}
										inputName="activity"
										defaultItem={{
											title: user?.activityArea ? getActivityAreaName(user?.activityArea, locale) : '',
											value: user?.activityArea?.id,
										}}
										onItemChange={(item) => setActivity(item)}
									/>
									{errors.activity && <p className="text-error">{errors.activity}</p>}
								</div>
							</>
						)}
					</div>

					<div className="grid grid-cols-6 gap-4">
						{isOrganizer && (
							<>
								<label className="col-span-1 mt-3">{t('description')}</label>
								<textarea
									className="textarea textarea-ghost min-h-[7rem] border-current h-full self-start col-span-5"
									name="description"
									defaultValue={user.profileDescription ?? ''}
								/>
							</>
						)}
						{isOrganizer && (
							<>
								<label className="flex items-center col-span-1">{t('website')}</label>
								<div className="flex items-center col-span-5">
									<input
										type="text"
										className="input input-ghost w-full"
										name="website"
										defaultValue={user?.webSiteLink ?? ''}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<SettingsFooter
				buttonText={t('save')}
				errorText={t('changes')}
				inputsConfig={{
					filled: ['organization', 'email', 'activity'],
					changed: ['website', 'description', 'fileInput'],
				}}
				cancelButtonText={t('cancel')}
				dialogText={{
					title: t_dialog('title'),
					message: t_dialog('message'),
					yes: t_dialog('yes'),
					no: t_dialog('no'),
				}}
				onSend={handleSubmit}
			/>
		</form>
	);
}
