import { signUp } from '@/utils/supabase/auth';
import Link from 'next/link';
import Alert from '@/components/Alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import PasswordInput from '@/components/PasswordInput';
import Dropdown from '@/components/Dropdown';
import Captcha from '@/components/Captcha';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';

export default function SignUp({
	searchParams,
	params,
}: {
	searchParams: { message: string; type: string };
	params: { locale: string };
}) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('SignUp');
	return (
		<div className='animate-in relative flex justify-center items-center rounded-2xl w-screen h-screen'>
			<div className='relative grid justify-items-center content-center bg-base-100 rounded-2xl min-h-[75%] min-w-[50%]'>
				<h1 className='text-4xl mb-8 pt-4'>{t('title')}</h1>
				{searchParams?.message && (
					<Alert
						customStyle={'flex flex-1 flex-col w-full pb-8 justify-center gap-2'}
						text={searchParams.message}
						alertType={searchParams.type}
						icon={faTriangleExclamation}
					/>
				)}
				<form className='w-full px-24' action={signUp}>
					<input type='hidden' name='locale' value={params.locale} />
					<div className='grid grid-cols-2 gap-8 w-full'>
						<div className='flex flex-col col-span-1'>
							<label className='text-md mb-2' htmlFor='firstName'>
								{t('name')}
							</label>
							<input className='input input-ghost input-bordered border-current' name='firstName' required />
						</div>
						<div className='flex flex-col col-span-1'>
							<label className='text-md mb-2' htmlFor='lastName'>
								{t('activity')}
							</label>
							<Dropdown />
						</div>
						<div className='flex flex-col col-span-2'>
							<label className='text-md mb-2' htmlFor='email'>
								{t('email')}
							</label>
							<input className='input input-ghost input-bordered border-current' type='email' name='email' required />
						</div>
						<div className='flex flex-col col-span-1'>
							<label className='text-md mb-2' htmlFor='password'>
								{t('password')}
							</label>
							<PasswordInput />
						</div>
						<div className='flex flex-col col-span-1'>
							<label className='text-md mb-2' htmlFor='confirmPassword'>
								{t('confirm')}
							</label>
							<PasswordInput />
						</div>
					</div>
					<div className='flex flex-col justify-center items-center mt-4'>
						<Captcha />
						<div className='flex flex-col col-span-2 mt-4 pb-4'>
							<p className='text-center'>
								{t('already')}
								<Link href={`/${params.locale}/login`} className='pl-1 underline text-primary font-semibold'>
									{t('alreadyLink')}
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
			<Footer locale={params.locale} />
		</div>
	);
}
