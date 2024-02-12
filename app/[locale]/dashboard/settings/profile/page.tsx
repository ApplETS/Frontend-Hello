import Dropzone from '@/components/Dropzone';
import Toast from '@/components/Toast';
import { AlertType } from '@/components/Alert';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Dropdown from '@/components/SignUpActivity';
import { updateProfile } from '@/utils/supabase/auth';

type Props = {
	params: { locale: string };
};

export default function Page({ params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('Settings.profile-section');
	return (
		<form className="flex flex-col basis-3/4" action={updateProfile}>
			<input type="hidden" name="locale" value={params.locale} />
			<div className="flex-grow">
				<label className="text-xl font-bold">{t('title')}</label>
				<div className="grid grid-cols-4 gap-6 justify-left items-center pt-10">
					<div className="avatar placeholder">
						<div className="bg-neutral text-neutral-content rounded-full w-36">
							<span className="text-3xl">D</span>
						</div>
					</div>
					<Dropzone />
					<div className="col-span-2" />
					<label>{t('companyName')}</label>
					<input type="text" className="input input-ghost input-bordered border-current" name="organization" />

					<label className="justify-self-center">{t('description')}</label>
					<textarea className="textarea textarea-ghost border-current row-span-2 h-full" name="description" />

					<label>{t('email')}</label>
					<input type="text" className="input input-ghost input-bordered border-current" name="email" required />

					<div />

					<label className="">{t('activity')}</label>
					<Dropdown
						items={[{ title: t('scientificClub') }, { title: t('ets') }, { title: t('sve') }, { title: t('aeets') }]}
						inputName="activity"
					/>
					<label className="justify-self-center">{t('website')}</label>
					<input type="text" className="input input-ghost input-bordered border-current" name="website" />

					<div className="col-span-2" />
				</div>
			</div>
			<footer className="sticky flex justify-end mt-auto">
				<button className="btn btn-primary rounded-md text-base w-1/5 mt-auto">{t('save')}</button>
			</footer>
		</form>
	);
}
