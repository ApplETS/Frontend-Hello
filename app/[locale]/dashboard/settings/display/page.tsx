import { AlertType } from '@/components/Alert';
import Dropzone from '@/components/Dropzone';
import PasswordInput from '@/components/PasswordInput';
import Toast from '@/components/Toast';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
	params: { locale: string };
};

export default function Page({ params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('Settings');
	return (
		<form className='flex flex-col basis-3/4'>
			<input type='hidden' name='locale' value={params.locale} />
			<div className='flex-grow'>
				<label className='text-xl font-bold'>Apparence</label>
				<div className='grid grid-cols-4 gap-6 justify-left items-center pt-10'>
					<label className=''>Thème</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='theme' />

					<label className='justify-self-center'>Secteur d'activité</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='activity' />
				</div>
			</div>
			<footer className='sticky flex justify-end mt-auto'>
				<button className='btn btn-primary rounded-md text-base w-1/5 mt-auto'>{t('save')}</button>
			</footer>
		</form>
	);
}
