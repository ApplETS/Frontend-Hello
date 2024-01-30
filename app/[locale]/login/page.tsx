import Checkbox from './components/Checkbox';
import { signIn } from '@/utils/supabase/auth';
import Link from 'next/link';
import ETSImage from '@/components/ETSImage';
import PasswordInput from './components/PasswordInput';
import Alert from '@/components/Alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import ThemeButton from '@/components/themeButton';
import LanguageButton from '@/components/languageButton';
import Footer from '@/components/Footer';

export default function Login({
	searchParams,
	params,
}: {
	searchParams: { message: string; type: string };
	params: { locale: string };
}) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('Login');
	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='grid justify-items-center content-center bg-base-100 rounded-2xl w-[36rem]'>
				<h1 className='py-10 text-4xl'>{t('welcome')}</h1>
				<div className='flex-1 flex flex-col w-full px-8 justify-center gap-2'>
					<div className='mx-16'>
						<form className='flex-1 flex flex-col w-full justify-center gap-2' action={signIn}>
							{searchParams?.message && (
								<Alert
									customStyle={'flex flex-1 flex-col w-full pb-2 justify-center gap-2'}
									text={searchParams.message}
									alertType={searchParams.type}
									icon={faTriangleExclamation}
								/>
							)}
							<label className='text-md' htmlFor='email'>
								{t('email')}
							</label>
							<input className='input input-ghost input-bordered border-current px-4 py-2 mb-6' name='email' required />
							<label className='text-md' htmlFor='password'>
								{t('password')}
							</label>
							<PasswordInput />
							<Checkbox checked={true} style='self-end pb-6 font-semibold' text={t('remember-me')} />
							<button className='btn btn-primary rounded-md text-base mb-2'>{t('login')}</button>
						</form>
					</div>

					<div className='text-s mt-10'>
						<div className='flex justify-center mb-3'>
							<p className=''>
								{t('forgot-info')}
								<Link href={`/${params.locale}/forgotpassword`} className='pl-1 underline text-primary font-semibold'>
									{t('reset-password')}
								</Link>
							</p>
						</div>
						<div className='flex justify-center'>
							<p className='pb-10'>
								{t('no-account')}
								<Link href={`/${params.locale}/signup`} className='pl-1 underline text-primary  font-semibold'>
									{t('signup')}
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
