import { updatePassword } from '@/utils/supabase/auth';
import PasswordInput from '@/components/PasswordInput';
import Alert from '@/components/Alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function UpdatePassword({
	searchParams,
}: {
	searchParams: { message: string; email: string; type: string };
}) {
	return (
		<div className='animate-in relative flex items-center justify-center rounded-2xl w-screen h-screen'>
			<div className='min-w-fit min-h-fit max-w-full max-h-full relative z-10 grid justify-items-center content-center bg-accent rounded-2xl shadow-2xl p-10 '>
				<h1 className='py-10 text-4xl text-wrap text-center'>Réinitialisez votre mot de passe</h1>
				{searchParams?.message && (
					<Alert
						customStyle={'flex flex-1 flex-col w-full px-8 pb-2 justify-center gap-2'}
						text={searchParams.message}
						alertType={searchParams.type}
						icon={faTriangleExclamation}
					/>
				)}
				<div className='flex-1 flex flex-col w-full px-8 justify-center gap-2'>
					<form className='flex-1 flex flex-col w-full justify-center gap-2 text-foreground' action={updatePassword}>
						<label className='text-md text-primary' htmlFor='email'>
							Token
						</label>
						<input
							className='input input-ghost input-primary input-bordered bg-inherit text-primary mb-4'
							name='token'
							placeholder='Token reçu par courriel'
							required
						/>
						<label className='text-md text-primary' htmlFor='email'>
							Courriel
						</label>
						<input
							className='input input-ghost input-primary input-bordered bg-inherit text-primary mb-4'
							name='email'
							defaultValue={searchParams.email}
							required
						/>
						<label className='text-md text-primary' htmlFor='password'>
							Nouveau mot de passe
						</label>
						<PasswordInput />
						<button className='btn btn-ghost bg-secondary rounded-md text-foreground text-base my-2 hover:bg-secondary/75'>
							Réinitialiser le mot de passe
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
