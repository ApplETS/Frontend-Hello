import Dropzone from '@/components/Dropzone';
import Toast from '@/components/Toast';
import { AlertType } from '@/components/Alert';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Dropdown from '@/components/SignUpActivity';
import { updateProfile } from '@/utils/supabase/auth';
import { getUser } from '@/lib/getUser';
import ConfirmButton from '@/components/ConfirmButton';
import CancelButton from '@/components/CancelButton';
import { useSettings } from '@/utils/provider/SettingsProvider';
import SettingsFooter from '../components/SettingsFooter';
import ProfilePicture from './components/ProfilePicture';

type Props = {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
};

export default async function Page({ searchParams, params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = await getTranslations('Settings.profile-section');
	const t_dialog = await getTranslations('Settings.dialog');
	const user = await getUser();

	return (
		<form className="flex flex-col basis-3/4" action={updateProfile}>
			{(searchParams.message || searchParams.code) && (
				<>
					<Toast
						message={searchParams.message ?? t(searchParams.code)}
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
					<label>{t('companyName')}</label>
					<input
						type="text"
						className="input input-ghost col-span-2"
						name="organization"
						defaultValue={user.organisation}
					/>

					<label className="justify-self-center">{t('description')}</label>
					<textarea
						className="textarea textarea-ghost border-current row-span-2 h-full self-start mt-3 col-span-2"
						name="description"
					/>

					<label>{t('email')}</label>
					<input type="text" className="input input-ghost col-span-2" name="email" required defaultValue={user.email} />

					<div />

					<label className="">{t('activity')}</label>
					<Dropdown
						items={[{ title: t('scientificClub') }, { title: t('ets') }, { title: t('sve') }, { title: t('aeets') }]}
						inputName="activity"
						defaultItem={{ title: user.activityArea }}
						customStyle="col-span-2"
					/>
					<label className="justify-self-center">{t('website')}</label>
					<input type="text" className="input input-ghost col-span-2" name="website" />

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
