import Checkbox from './components/Checkbox';
import { signIn } from '@/utils/supabase/auth';
import Link from 'next/link';
import ETS from '../../public/ETS.svg';
import PasswordInput from './components/PasswordInput';
import Alert from '@/components/Alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Login({ searchParams }: { searchParams: { message: string; type: string } }) {
	return (
		<div className='animate-in relative flex justify-center items-center rounded-2xl w-screen h-screen'>
			<div className={`absolute bottom-4 right-4 w-[141px] h-[79px] bg-[url('../public/ETS.svg')] bg-cover`} />
			<div className='grid justify-items-center content-center bg-accent rounded-2xl mx-6 my-6 w-1/3 h-5/6 '>
				<h1 className='py-10 text-4xl'>Bienvenue</h1>
				<div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
					<form className='flex-1 flex flex-col w-full justify-center gap-2 text-foreground' action={signIn}>
						{searchParams?.message && (
							<Alert
								customStyle={'flex flex-1 flex-col w-full pb-2 justify-center gap-2'}
								text={searchParams.message}
								alertType={searchParams.type}
								icon={faTriangleExclamation}
							/>
						)}
						<label className='text-md text-primary' htmlFor='email'>
							Courriel
						</label>
						<input
							className='rounded-md px-4 py-2 bg-inherit border mb-6'
							name='email'
							placeholder='john.doe@hotmail.com'
							required
						/>
						<label className='text-md text-primary' htmlFor='password'>
							Mot de passe
						</label>
						<PasswordInput />
						<Checkbox checked={true} style='self-end pb-6' text='Se souvenir de moi' textStyle='text-primary' />
						<button className='btn btn-ghost bg-secondary rounded-md text-foreground text-base mb-2 hover:bg-secondary/75'>
							Se connecter
						</button>
					</form>

					<div className='flex justify-center'>
						<p className='text-xs text-primary'>
							Vous avez oublié vos informations?
							<Link href={'/forgotPassword'} className='text-xs pl-1 underline text-white'>
								Réinitialisez votre mot de passe
							</Link>
						</p>
					</div>
					<div className='flex justify-center'>
						<p className='text-xs pb-10 text-primary'>
							Vous n&apos;avez pas de compte?
							<Link href={'/signUp'} className='text-xs pl-1 underline text-white'>
								Inscrivez-vous
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
