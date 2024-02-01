import React from 'react';

export default function Page() {
    return (
        <div className="flex flex-col h-screen justify-around">
            <label className='text-xl font-bold'>Paramètres</label>
            <div className='grid grid-cols-4 gap-6 w-[75%] justify-left items-center'>
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-24">
                        <span className="text-3xl">D</span>
                    </div>
                </div>
                <div className='col-span-3'>
                    <input type="file" className="file-input w-full max-w-xs" />
                </div>
                <label className=''>Nom de l'organisation</label>
                <input type="text" className="input input-ghost input-bordered" />

                <label className='justify-self-center'>Langue</label>
                <input type="text" className="input input-ghost input-bordered" />

                <label className=''>Courriel</label>
                <input type="text" className="input input-ghost input-bordered" />

                <label className='justify-self-center'>Thème</label>
                <input type="text" className="input input-ghost input-bordered" />

                <label className=''>Secteur d'activité</label>
                <input type="text" className="input input-ghost input-bordered" />

                <div className='col-span-2' />

                <label className=''>Mot de passe</label>
                <input type="text" className="input input-ghost input-bordered" />

                <label className='justify-self-center'>Confirmation du mot de passe</label>
                <input type="text" className="input input-ghost input-bordered" />
            </div>
            {/* Sticky Footer */}
            <footer className="sticky bottom-0 bg-base-100 p-4 border-t-2 border-white md:flex md:items-center md:justify-between md:p-6">
                <span className="text-sm text-gray-500 sm:text-center"></span>
                <div className="flex mt-4 md:m-0">
                    <button className="btn btn-ghost mr-2">Annuler</button>
                    <button className="btn btn-primary">Enregistrer</button>
                </div>
            </footer>
        </div>
    );
};