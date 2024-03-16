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

export default function ProfileClient() {
	const t = useTranslations('Settings.profile-section');
	const t_default = useTranslationsWithDefault('Settings.profile-section');
	const t_dialog = useTranslations('Settings.dialog');
	const { user } = useUser();
	const { startTransition } = useLoading();
	const { setToast } = useToast();
	const isOrganizer = user?.type == UserTypes.ORGANIZER;

	return (
		<form
			className="flex flex-col basis-3/4"
			action={(formData) => handleSubmitForm(formData, updateProfile, startTransition, setToast, t_default)}
		>
			<div className="flex-grow">
				<label className="text-xl font-bold">{t('title')}</label>
				<div className="grid grid-cols-6 gap-6 justify-left items-center pt-10">
					<ProfilePicture dropzoneText={t('drop-picture')} buttonText={t('delete-picture')} />
					<div className="col-span-3" />
					{isOrganizer && (
						<>
							<label>{t('company-name')}</label>
							<input
								type="text"
								className="input input-ghost col-span-2"
								name="organization"
								defaultValue={user.organisation ?? ''}
							/>
						</>
					)}
					{isOrganizer && (
						<>
							<label className="justify-self-center align-top row-span-2">{t('description')}</label>
							<textarea
								className="textarea textarea-ghost border-current row-span-2 h-full self-start mt-3 col-span-2"
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
						required
						defaultValue={user?.email ?? ''}
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
			/>
		</form>
	);
}
