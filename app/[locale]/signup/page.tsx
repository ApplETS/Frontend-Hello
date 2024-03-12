import { signUp } from '@/utils/supabase/auth';
import Link from 'next/link';
import Alert, { AlertType } from '@/components/Alert';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import PasswordInput from '@/components/PasswordInput';
import Captcha from '@/components/Captcha';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Dropdown from '@/components/SignUpActivity';

export default function SignUp({
	searchParams,
	params,
}: {
	searchParams: { message: string; type: string; code: string };
	params: { locale: string };
}) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('SignUp');
	return (
		<div className="animate-in relative flex justify-center items-center rounded-2xl w-full h-screen">
			<div className="relative grid justify-items-center content-center bg-base-100 rounded-2xl w-[48rem]">
				<h1 className="text-4xl py-16 font-semibold">{t('title')}</h1>
				{(searchParams?.message || searchParams?.code) && (
					<Alert
						customStyle={'flex flex-1 flex-col w-full pb-2 justify-center gap-2'}
						text={searchParams.message ?? t(searchParams.code)}
						alertType={AlertType[searchParams.type as keyof typeof AlertType] as AlertType}
						icon={faTriangleExclamation}
					/>
				)}
				<form className="w-full px-16" action={signUp}>
					<input type="hidden" name="locale" value={params.locale} />
					<div className="grid grid-cols-2 gap-8 w-full">
						<div className="flex flex-col col-span-1">
							<label className="text-md mb-2" htmlFor="name">
								{t('name')}
							</label>
							<input className="input input-ghost" name="name" required />
						</div>
						<div className="flex flex-col col-span-1">
							<label className="text-md mb-2" htmlFor="lastName">
								{t('activity')}
							</label>
							<Dropdown
								items={[
									{ title: t('scientific-club') },
									{ title: t('ets') },
									{ title: t('sve') },
									{ title: t('aeets') },
								]}
								inputName="activity"
							/>
						</div>
						<div className="flex flex-col col-span-2">
							<label className="text-md mb-2" htmlFor="email">
								{t('email')}
							</label>
							<input className="input input-ghost" type="email" name="email" required />
						</div>
						<div className="flex flex-col col-span-1">
							<label className="text-md mb-2" htmlFor="password">
								{t('password')}
							</label>
							<PasswordInput />
						</div>
						<div className="flex flex-col col-span-1">
							<label className="text-md mb-2" htmlFor="confirmPassword">
								{t('confirm')}
							</label>
							<PasswordInput inputName="confirmPassword" />
						</div>
					</div>
					<div className="flex flex-col justify-center items-center mt-6">
						<Captcha />
						<div className="flex flex-col col-span-2 mt-2 mb-6">
							<p className="text-center">
								{t('already')}
								<Link href={`/${params.locale}/login`} className="pl-1 underline text-primary font-semibold">
									{t('already-link')}
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
