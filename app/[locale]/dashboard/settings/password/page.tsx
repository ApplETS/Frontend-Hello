import { AlertType } from '@/components/Alert';
import Dropzone from '@/components/Dropzone';
import PasswordInput from '@/components/PasswordInput';
import Toast from '@/components/Toast';
import { updatePasswordSettings } from '@/utils/supabase/auth';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
};

export default function Page({ searchParams, params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('Settings');
	return (
		<form className='flex flex-col basis-3/4' action={updatePasswordSettings}>
			{(searchParams.message || searchParams.code) && (
				<>
					<Toast
						message={searchParams.message ?? t(searchParams.code)}
						alertType={AlertType[searchParams.type as keyof typeof AlertType] as AlertType}
					/>
				</>
			)}
			<input type='hidden' name='locale' value={params.locale} />
			<div className='flex-grow'>
				<label className='text-xl font-bold'>Mot de passe</label>
				<div className='grid grid-cols-4 gap-6 justify-left items-center pt-10'>
					<label>Nouveau mot de passe</label>
					<PasswordInput />

					<label className='justify-self-center text-center'>Confirmation du nouveau mot de passe</label>
					<PasswordInput inputName='confirmPassword' />
				</div>
			</div>
			<footer className='sticky flex justify-end mt-auto'>
				<button className='btn btn-primary rounded-md text-base w-1/5 mt-auto'>{t('save')}</button>
			</footer>
		</form>
	);
}
