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
import { useRef, useState } from 'react';
import { Area } from 'react-easy-crop';
import { getCroppedImgOnly } from '@/utils/canvasUtils';

export default function ProfileClient() {
	const t = useTranslations('Settings.profile-section');
	const t_default = useTranslationsWithDefault('Settings.profile-section');
	const t_dialog = useTranslations('Settings.dialog');
	const { user } = useUser();
	const { startTransition } = useLoading();
	const { setToast } = useToast();
	const [formData, setFormData] = useState<FormData>();
	const formRef = useRef<HTMLFormElement>(null);
	const isOrganizer = user?.type == UserTypes.ORGANIZER;

	const [image, setImage] = useState<string | null>(null);
	const [rotation, setRotation] = useState(0);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

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

	async function handleSubmit() {
		const form = formRef.current;

		if (form) {
			form.requestSubmit();

			if (formData) {
				const sendFormData = formData;
				const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
				const filename = `image_${timestamp}.jpg`;
				const blob = await getImageCropped();
				if (blob) sendFormData.set('avatarFile', blob, filename);
				handleSubmitForm(sendFormData, updateProfile, startTransition, setToast, t_default);
				setImage('');
			}
		}
	}

	return (
		<form className="flex flex-col basis-3/4" ref={formRef} action={(formData) => setFormData(formData)}>
			<div className="flex-grow">
				<label className="text-xl font-bold">{t('title')}</label>
				<div className="grid grid-cols-6 gap-6 justify-left items-center pt-10">
					<ProfilePicture
						dropzoneText={t('drop-picture')}
						buttonText={t('delete-picture')}
						setCroppedAreaPixels={setCroppedAreaPixels}
						image={image}
						setImage={setImage}
						rotation={rotation}
						setRotation={setRotation}
					/>
					<div className="col-span-3" />
					{isOrganizer && (
						<>
							<label>{t('company-name')}</label>
							<input
								type="text"
								className="input input-ghost col-span-2"
								name="organization"
								defaultValue={user.organization ?? ''}
								required
							/>
						</>
					)}
					{isOrganizer && (
						<>
							<label className="justify-self-center align-top row-span-2">{t('description')}</label>
							<textarea
								className="textarea textarea-ghost border-current row-span-2 h-full self-start col-span-2"
								name="description"
								defaultValue={user.profileDescription ?? ''}
							/>
						</>
					)}
					<label>{t('email')}</label>
					<input
						type="text"
						className="input input-ghost col-span-2"
						name="email"
						defaultValue={user?.email ?? ''}
						disabled
					/>

					<label className="">{t('activity')}</label>
					<ActivityAreaDropdown
						items={[{ title: t('scientific-club') }, { title: t('ets') }, { title: t('sve') }, { title: t('aeets') }]}
						inputName="activity"
						defaultItem={{ title: user?.activityArea ?? '' }}
						customStyle="col-span-2"
					/>
					{isOrganizer && (
						<>
							<label className="justify-self-center">{t('website')}</label>
							<input
								type="text"
								className="input input-ghost col-span-2"
								name="website"
								defaultValue={user?.webSiteLink ?? ''}
							/>
						</>
					)}
					<div className="col-span-3" />
				</div>
			</div>
			<SettingsFooter
				buttonText={t('save')}
				errorText={t('changes')}
				inputsConfig={{
					filled: ['organization', 'email', 'activity'],
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
