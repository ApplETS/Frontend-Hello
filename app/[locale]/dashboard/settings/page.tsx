import { AlertType } from '@/components/Alert';
import ConfirmButton from '@/components/ConfirmButton';
import Dropzone from '@/components/Dropzone';
import PasswordInput from '@/components/PasswordInput';
import Toast from '@/components/Toast';
import { updatePasswordSettings } from '@/utils/supabase/auth';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

export default function Page({
	searchParams,
	params,
}: {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
}) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('Settings');
	return (
		<form className='flex flex-col h-screen' action={updatePasswordSettings}>
			{(searchParams?.message || searchParams?.code) && (
				<>
					<Toast
						message={searchParams.message ?? t(searchParams.code)}
						alertType={AlertType[searchParams.type as keyof typeof AlertType] as AlertType}
					/>
				</>
			)}
			<input type='hidden' name='locale' value={params.locale} />
			<div className='flex-grow'>
				<label className='text-xl font-bold'>Paramètres</label>
				<div className='grid grid-cols-4 gap-6 w-[75%] justify-left items-center pt-10'>
					<div className='avatar placeholder'>
						<div className='bg-neutral text-neutral-content rounded-full w-36'>
							<span className='text-3xl'>D</span>
						</div>
					</div>
					<Dropzone />
					<div className='col-span-2' />
					<label>Nom de l'organisation</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='organisation' />

					<label className='justify-self-center'>Langue</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='language' />

					<label>Courriel</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='email' />

					<label className='justify-self-center'>Thème</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='theme' />

					<label>Secteur d'activité</label>
					<input type='text' className='input input-ghost input-bordered border-current' name='activity' />

					<div className='col-span-2' />

					<label>Ancien mot de passe</label>
					<PasswordInput inputName='oldPassword' />

					<label className='justify-self-center text-center'>Confirmation de l'ancien mot de passe</label>
					<PasswordInput inputName='oldConfirmPassword' />

					<label>Nouveau mot de passe</label>
					<PasswordInput />

					<label className='justify-self-center text-center'>Confirmation du nouveau mot de passe</label>
					<PasswordInput inputName='confirmPassword' />
				</div>
			</div>
			<footer className='sticky flex justify-end mt-auto'>
				<ConfirmButton
					buttonText={'Enregistrer'}
					style={'btn btn-primary rounded-md text-base w-1/5 mt-auto'}
					extraInputs
				/>
			</footer>
		</form>
	);
}
