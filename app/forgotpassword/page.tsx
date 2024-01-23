import { forgotPassword } from '@/utils/supabase/auth';
import Link from 'next/link';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Alert from '@/components/Alert';

export default function ForgotPassword({ searchParams }: { searchParams: { message: string; type: string } }) {
	return (
		<div className='animate-in relative flex items-center justify-center rounded-2xl w-screen h-screen'>
			<div className={`absolute bottom-4 right-4 w-[141px] h-[79px] bg-[url('../public/ETS.svg')] bg-cover`} />
			<div className='min-w-fit min-h-fit max-w-full max-h-full relative z-10 grid justify-items-center content-center bg-accent rounded-2xl shadow-2xl p-10 '>
				<h1 className='py-10 text-4xl text-wrap text-center'>Mot de passe oublié</h1>
				{searchParams?.message && (
					<Alert
						customStyle={'flex flex-1 flex-col w-full pb-2 justify-center gap-2'}
						text={searchParams.message}
						alertType={searchParams.type}
						icon={faTriangleExclamation}
					/>
				)}
				<div className='flex-1 flex flex-col w-full justify-center'>
					<form className='flex-1 flex flex-col w-full justify-center gap-2 text-foreground' action={forgotPassword}>
						<label className='text-md text-primary' htmlFor='email'>
							Courriel
						</label>
						<input
							className='input input-ghost input-primary input-bordered bg-inherit text-primary mb-10'
							name='email'
							required
						/>
						<button className='btn btn-ghost bg-secondary rounded-md text-foreground text-base mb-10 hover:bg-secondary/75'>
							Envoyer
						</button>
					</form>
					<div className='flex justify-center pb-10'>
						<p className='text-sm text-primary'>
							Vous avez un compte?
							<Link href={'/login'} className='text-sm font-semibold text-secondary pl-1 underline'>
								Connectez-vous
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
