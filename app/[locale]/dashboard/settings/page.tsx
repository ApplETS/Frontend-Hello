import Dropzone from '@/components/Dropzone';
import PasswordInput from '@/components/PasswordInput';
import React from 'react';

export default function Page() {
	return (
		<div className='flex flex-col min-h-screen'>
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
					<input type='text' className='input input-ghost input-bordered border-current' />

					<label className='justify-self-center'>Langue</label>
					<input type='text' className='input input-ghost input-bordered border-current' />

					<label>Courriel</label>
					<input type='text' className='input input-ghost input-bordered border-current' />

					<label className='justify-self-center'>Thème</label>
					<input type='text' className='input input-ghost input-bordered border-current' />

					<label>Secteur d'activité</label>
					<input type='text' className='input input-ghost input-bordered border-current' />

					<div className='col-span-2' />

					<label>Mot de passe</label>
					<PasswordInput />

					<label className='justify-self-center'>Confirmation du mot de passe</label>
					<PasswordInput />
				</div>
			</div>
			<footer className='w-full bg-base-100 text-right p-4 sticky bottom-0'>
				<button className='btn btn-primary' type='submit'>
					Enregistrer
				</button>
			</footer>
		</div>
	);
}
