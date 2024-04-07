import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Footer from '@/components/Footer';
import LoginForm from './components/LoginForm';

export default async function Login({
	searchParams,
	params,
}: {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
}) {
	unstable_setRequestLocale(params.locale);
	const t = await getTranslations('Login');

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="grid justify-items-center content-center bg-base-100 rounded-2xl w-[36rem]">
				<h1 className="py-16 text-4xl font-semibold">{t('welcome')}</h1>
				<div className="flex-1 flex flex-col w-full px-8 justify-center gap-2">
					<div className="mx-16">
						<LoginForm
							message={searchParams.message}
							code={searchParams.code}
							type={searchParams.type}
							locale={params.locale}
						/>
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
