import { updatePassword } from '@/utils/supabase/auth';
import PasswordInput from '@/components/PasswordInput';
import Alert, { AlertType } from '@/components/Alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import ConfirmButton from '@/components/ConfirmButton';
import Footer from '@/components/Footer';

export default function UpdatePassword({
	searchParams,
	params,
}: {
	searchParams: { message: string; email: string; type: string; code: string };
	params: { locale: string };
}) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('UpdatePassword');

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="grid justify-items-center content-center bg-base-100 rounded-2xl w-[40rem]">
				<h1 className="py-10 text-4xl text-wrap text-center font-semibold">{t('title')}</h1>
				<div className="flex-1 flex flex-col w-full px-8 justify-center gap-2">
					<div className="mx-16">
						{(searchParams?.message || searchParams?.code) && (
							<Alert
								customStyle={'flex flex-1 flex-col w-full pb-2 justify-center gap-2'}
								text={searchParams.message ?? t(searchParams.code)}
								alertType={AlertType[searchParams.type as keyof typeof AlertType] as AlertType}
								icon={faTriangleExclamation}
							/>
						)}
						<form className="flex-1 flex flex-col w-full justify-center gap-2" action={updatePassword}>
							<input type="hidden" name="locale" value={params.locale} />
							<label className="text-md" htmlFor="email">
								{t('token')}
							</label>
							<input
								className="input input-ghost bg-inherit mb-4"
								name="token"
								placeholder="Token reçu par courriel"
								required
							/>
							<label className="text-md" htmlFor="email">
								{t('email')}
							</label>
							<input
								className="input input-ghost bg-inherit mb-4"
								name="email"
								defaultValue={searchParams.email}
								required
							/>
							<label className="text-md" htmlFor="password">
								{t('password')}
							</label>
							<PasswordInput style="mb-4" />
							<label className="text-md" htmlFor="password">
								{t('confirm-password')}
							</label>
							<PasswordInput inputName="confirmPassword" />
							<div className="flex justify-center mt-6">
								<ConfirmButton
									buttonText={'Réinitialiser le mot de passe'}
									style="btn btn-primary rounded-md text-base mb-8 w-64"
									inputsConfig={{
										match: ['password', 'confirmPassword'],
										filled: ['token', 'email'],
									}}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer locale={params.locale} />
		</div>
	);
}
