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
		<div className="flex justify-center items-center h-screen">
			<div className="grid justify-items-center content-center bg-base-100 rounded-2xl w-[36rem]">
				<h1 className="py-16 text-4xl font-semibold">{t('title')}</h1>
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
						<form className="flex-1 flex flex-col w-full justify-center gap-2" action={forgotPassword}>
							<input type="hidden" name="locale" value={params.locale} />
							<label className="text-md" htmlFor="email">
								{t('email')}
							</label>
							<input className="input input-ghost mb-6" name="email" required />
							<div className="flex justify-center">
								<button className="font-normal btn btn-primary rounded-md text-base mb-8 w-64">{t('send')}</button>
							</div>
						</form>
					</div>

					<div className="text-s mt-6 pb-10">
						<div className="flex justify-center mb-3">
							<p className="">
								{t('remember')}
								<Link href={`/${params.locale}/login`} className="text-md font-semibold text-primary pl-1 underline">
									{t('remember-link')}
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
