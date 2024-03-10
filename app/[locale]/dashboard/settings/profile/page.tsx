import Toast from '@/components/Toast';
import { AlertType } from '@/components/Alert';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Dropdown from '@/components/SignUpActivity';
import { updateProfile } from '@/utils/supabase/auth';
import SettingsFooter from '../components/SettingsFooter';
import ProfilePicture from './components/ProfilePicture';
import { getTranslationsWithDefault } from '@/utils/traductions/trads';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { UserTypes } from '@/models/user-types';

type Props = {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
};

export default async function Page({ searchParams, params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = await getTranslations('Settings.profile-section');
	const t_default = await getTranslationsWithDefault('Settings.profile-section');
	const t_dialog = await getTranslations('Settings.dialog');
	const user = await getAuthenticatedUser();
	const isOrganizer = user.type == UserTypes.ORGANIZER;

	return (
		<form className="flex flex-col basis-3/4" action={updateProfile}>
			{(searchParams.message || searchParams.code) && (
				<>
					<Toast
						message={searchParams.message ?? t_default(searchParams.code)}
						alertType={AlertType[searchParams.type as keyof typeof AlertType] as AlertType}
					/>
				</>
			)}
			<input type="hidden" name="locale" value={params.locale} />
			<div className="flex-grow">
				<label className="text-xl font-bold">{t('title')}</label>
				<div className="grid grid-cols-6 gap-6 justify-left items-center pt-10">
					<ProfilePicture dropzoneText={t('dropPicture')} buttonText={t('deletePicture')} />
					<div className="col-span-3" />
					{isOrganizer && (
						<div>
							<label>{t('companyName')}</label>
							<input
								type="text"
								className="input input-ghost col-span-2"
								name="organization"
								defaultValue={user.organisation ?? ''}
							/>
						</div>
					)}
					{isOrganizer && (
						<div>
							<label className="justify-self-center">{t('description')}</label>
							<textarea
								className="textarea textarea-ghost border-current row-span-2 h-full self-start mt-3 col-span-2"
								name="description"
							/>
						</div>
					)}
					<label>{t('email')}</label>
					<input
						type="text"
						className="input input-ghost col-span-2"
						name="email"
						required
						defaultValue={user.email ?? ''}
					/>

					<label className="">{t('activity')}</label>
					<Dropdown
						items={[{ title: t('scientificClub') }, { title: t('ets') }, { title: t('sve') }, { title: t('aeets') }]}
						inputName="activity"
						defaultItem={{ title: user.activityArea ?? '' }}
						customStyle="col-span-2"
					/>
					{isOrganizer && (
						<div>
							<label className="justify-self-center">{t('website')}</label>
							<input type="text" className="input input-ghost col-span-2" name="website" defaultValue={user.webSiteLink ?? ''} />
						</div>
					)}
					<div className="col-span-3" />
				</div>
			</div>
			<SettingsFooter
				locale={params.locale}
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
