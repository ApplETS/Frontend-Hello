import Dropzone from '@/components/Dropzone';
import Toast from '@/components/Toast';
import { AlertType } from '@/components/Alert';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

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
				<label className='text-xl font-bold'>Profil</label>
				<div className='grid grid-cols-4 gap-6 justify-left items-center pt-10'>
					<div className='avatar placeholder'>
						<div className='bg-neutral text-neutral-content rounded-full w-36'>
							<span className='text-3xl'>D</span>
						</div>
					</div>
					<Dropzone />
					<div className='col-span-2' />
					<label>Nom de l'organisation</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='organisation' />

					<label className='justify-self-center'>Description</label>
					<textarea className='textarea textarea-ghost border-current row-span-2 h-full' name='description' />

					<label>Courriel</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='email' required />

					<div />

					<label className=''>Secteur d'activité</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='theme' />

					<label className='justify-self-center'>Site web</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='activity' />

					<div className='col-span-2' />
				</div>
			</div>
			<footer className='sticky flex justify-end mt-auto'>
				<button className='btn btn-primary rounded-md text-base w-1/5 mt-auto'>{t('save')}</button>
			</footer>
		</form>
	);
}
