import { updatePassword } from '@/utils/supabase/auth';
import PasswordInput from '@/components/PasswordInput';
import Alert from '@/components/Alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default function UpdatePassword({
	searchParams,
	params
}: {
	searchParams: { message: string; email: string; type: string, code: string };
	params: { locale: string };
}) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('UpdatePassword');
	return (
		<div className='animate-in relative flex items-center justify-center rounded-2xl w-screen h-screen'>
			<div className='min-w-fit min-h-fit max-w-full max-h-full relative z-10 grid justify-items-center content-center bg-base-100 rounded-2xl shadow-2xl p-10 '>
				<h1 className='py-10 text-4xl text-wrap text-center'>Réinitialisez votre mot de passe</h1>
				{(searchParams?.message || searchParams?.code) && (
					<Alert
						customStyle={'flex flex-1 flex-col w-full pb-2 justify-center gap-2'}
						text={searchParams.message ?? t(searchParams.code)}
						alertType={searchParams.type}
						icon={faTriangleExclamation}
					/>
				)}
				<div className='flex-1 flex flex-col w-full px-8 justify-center gap-2'>
					<form className='flex-1 flex flex-col w-full justify-center gap-2 text-foreground' action={updatePassword}>
						<input type='hidden' name='locale' value={params.locale} />
						<label className='text-md' htmlFor='email'>
							Token
						</label>
						<input
							className='input input-ghost input-bordered border-current bg-inherit'
							name='token'
							placeholder='Token reçu par courriel'
							required
						/>
						<label className='text-md' htmlFor='email'>
							Courriel
						</label>
						<input
							className='input input-ghost input-bordered border-current bg-inherit'
							name='email'
							defaultValue={searchParams.email}
							required
						/>
						<label className='text-md' htmlFor='password'>
							Nouveau mot de passe
						</label>
						<PasswordInput />
						<button className='btn btn-ghost bg-primary rounded-md font-normal mb-8 mt-8'>
							Réinitialiser le mot de passe
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
