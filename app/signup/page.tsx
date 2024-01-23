import { signUp } from '@/utils/supabase/auth';
import Link from 'next/link';
import Alert from '@/components/Alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import PasswordInput from '@/components/PasswordInput';
import Dropdown from '@/components/Dropdown';

export default function SignUp({ searchParams }: { searchParams: { message: string; type: string } }) {
	return (
		<div className='animate-in relative flex justify-center items-center rounded-2xl w-screen h-screen'>
			<div className={`absolute bottom-4 right-4 w-[141px] h-[79px] bg-[url('../public/ETS.svg')] bg-cover`} />
			<div className='min-w-fit min-h-fit max-w-full max-h-full relative z-10 grid justify-items-center content-center bg-accent rounded-2xl mx-6 my-6 shadow-2xl p-10'>
				<h1 className='text-4xl mb-8'>Inscription</h1>
				{searchParams?.message && (
					<Alert
						customStyle={'flex flex-1 flex-col w-full pb-8 justify-center gap-2'}
						text={searchParams.message}
						alertType={searchParams.type}
						icon={faTriangleExclamation}
					/>
				)}
				<form className='grid grid-cols-2 gap-4 w-full max-w-xl text-foreground' action={signUp}>
					<div className='flex flex-col col-span-1'>
						<label className='text-md mb-2 text-primary' htmlFor='firstName'>
							Nom de l'organisation
						</label>
						<input
							className='input input-ghost input-primary input-bordered bg-inherit text-primary'
							name='firstName'
							required
						/>
					</div>
					<div className='flex flex-col col-span-1'>
						<label className='text-md mb-2 text-primary' htmlFor='lastName'>
							Secteur d'activité
						</label>
						<Dropdown />
					</div>
					<div className='flex flex-col col-span-2'>
						<label className='text-md mb-2 text-primary' htmlFor='email'>
							Courriel
						</label>
						<input
							className='input input-ghost input-primary input-bordered bg-inherit text-primary'
							type='email'
							name='email'
							required
						/>
					</div>
					<div className='flex flex-col col-span-1'>
						<label className='text-md mb-2 text-primary' htmlFor='password'>
							Mot de passe
						</label>
						<PasswordInput />
					</div>
					<div className='flex flex-col col-span-1'>
						<label className='text-md mb-2 text-primary' htmlFor='confirmPassword'>
							Confirmation de mot de passe
						</label>
						<PasswordInput />
					</div>
					<div className='flex flex-col col-span-2'>
						<button className='btn btn-ghost bg-secondary rounded-md text-foreground text-base py-2 hover:bg-primary/75'>
							S&apos;inscrire
						</button>
					</div>
					<div className='flex flex-col col-span-2 mt-4 pb-4'>
						<p className='text-foreground text-center text-primary'>
							Vous avez déjà un compte ?{' '}
							<Link href='/login' className='underline text-secondary'>
								Connectez-vous
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
