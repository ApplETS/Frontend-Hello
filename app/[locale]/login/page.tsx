import Checkbox from '@/components/Checkbox';
import { signIn } from '@/utils/supabase/auth';
import Link from 'next/link';
import PasswordInput from './components/PasswordInput';
import Alert, { AlertType } from '@/components/Alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Footer from '@/components/Footer';
import EmailInput from '@/components/EmailInput';
import { getTranslationsWithDefault } from '@/utils/traductions/trads';

export default async function Login({
	searchParams,
	params,
}: {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
}) {
	unstable_setRequestLocale(params.locale);
	const t = await getTranslations('Login');
	const t_default = await getTranslationsWithDefault('Login');

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="grid justify-items-center content-center bg-base-100 rounded-2xl w-[36rem]">
				<h1 className="py-16 text-4xl font-semibold">{t('welcome')}</h1>
				<div className="flex-1 flex flex-col w-full px-8 justify-center gap-2">
					<div className="mx-16">
						<form className="flex-1 flex flex-col w-full justify-center gap-2" action={signIn}>
							<input type="hidden" name="locale" value={params.locale} />
							{(searchParams?.message || searchParams?.code) && (
								<Alert
									customStyle={'flex flex-1 flex-col w-full pb-2 justify-center gap-2'}
									text={searchParams.message ?? t_default(searchParams.code)}
									alertType={AlertType[searchParams.type as keyof typeof AlertType] as AlertType}
									icon={faTriangleExclamation}
								/>
							)}
							<label className="text-md" htmlFor="email">
								{t('email')}
							</label>
							<EmailInput />
							<label className="text-md" htmlFor="password">
								{t('password')}
							</label>
							<PasswordInput />
							<Checkbox
								inputName="remember"
								checked={false}
								style="self-end pb-6"
								text={t('remember')}
								textStyle="text-base"
							/>
							<div className="flex justify-center">
								<button className="btn btn-primary rounded-md text-base mb-2 w-64">{t('login')}</button>
							</div>
						</form>
					</div>

					<div className="text-s mt-12 pb-10">
						<div className="flex justify-center mb-3">
							<p className="">
								{t('forgot-info')}
								<Link href={`/${params.locale}/forgotpassword`} className="pl-1 underline text-primary font-semibold">
									{t('reset-password')}
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer locale={params.locale} />
		</div>
	);
}
