import { forgotPassword } from '@/utils/supabase/auth';
import Link from 'next/link';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Alert, { AlertType } from '@/components/Alert';
import Footer from '@/components/Footer';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default function ForgotPassword({
	searchParams,
	params,
}: {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
}) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('ForgotPassword');
	return (
		<div className='animate-in relative flex items-center justify-center rounded-2xl w-full h-screen'>
			<div className='relative grid justify-items-center content-center bg-base-100 rounded-2xl w-[34rem] h-[26rem]'>
				<h1 className='text-4xl mb-8 pt-4 font-semibold'>{t('title')}</h1>
				{(searchParams?.message || searchParams?.code) && (
					<Alert
						customStyle={'flex flex-1 flex-col w-full pb-2 justify-center gap-2'}
						text={searchParams.message ?? t(searchParams.code)}
						alertType={AlertType[searchParams.type as keyof typeof AlertType] as AlertType}
						icon={faTriangleExclamation}
					/>
				)}
				<form className='w-full px-28' action={forgotPassword}>
					<input type='hidden' name='locale' value={params.locale} />
					<div className='grid grid-cols-1 gap-8 w-full'>
						<div className='flex flex-col col-span-1'>
							<label className='text-md mb-2' htmlFor='email'>
								{t('email')}
							</label>
							<input className='input input-ghost input-bordered border-current' name='email' required />
						</div>
						<div className='flex flex-col col-span-1'>
							<button className='btn btn-primary text-base mb-8'>{t('send')}</button>
						</div>
					</div>
				</form>
				<div className='flex justify-center'>
					<p className='text-md'>
						{t('remember')}
						<Link href={`/${params.locale}/login`} className='text-md font-semibold text-primary pl-1 underline'>
							{t('rememberLink')}
						</Link>
					</p>
				</div>
			</div>
			<Footer locale={params.locale} />
		</div>
	);
}
