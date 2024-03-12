import Toast from '@/components/Toast';
import { AlertType } from '@/components/Alert';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import facebookIcon from '@/public/Socials/Facebook.svg';
import discordIcon from '@/public/Socials/Discord.svg';
import instagramIcon from '@/public/Socials/Instagram.svg';
import linkedinIcon from '@/public/Socials/Linkedin.svg';
import tiktokIcon from '@/public/Socials/Tiktok.svg';
import redditIcon from '@/public/Socials/Reddit.svg';
import xIcon from '@/public/Socials/X.svg';
import SettingsFooter from '../components/SettingsFooter';
import SocialInput from './components/SocialInput';
import { updateSocials } from '@/utils/supabase/auth';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { getTranslationsWithDefault } from '@/utils/traductions/trads';

type Props = {
	params: { locale: string };
	searchParams: { message: string; type: string; code: string };
};

export default async function Socials({ params, searchParams }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = await getTranslations('Settings.socials-section');
	const t_default = await getTranslationsWithDefault('Settings.profile-section');
	const t_dialog = await getTranslations('Settings.dialog');
	const user = await getAuthenticatedUser();

	const socials = [
		{ icon: facebookIcon, inputName: 'facebook', defaultValue: user.facebookLink },
		{ icon: discordIcon, inputName: 'discord', defaultValue: user.discordLink },
		{ icon: instagramIcon, inputName: 'instagram', defaultValue: user.instagramLink },
		{ icon: linkedinIcon, inputName: 'linkedin', defaultValue: user.linkedInLink },
		{ icon: tiktokIcon, inputName: 'tiktok', defaultValue: user.tikTokLink },
		{ icon: redditIcon, inputName: 'reddit', defaultValue: user.redditLink },
		{ icon: xIcon, inputName: 'x', defaultValue: user.xLink },
	];

	return (
		<form className="flex flex-col basis-3/4" action={updateSocials}>
			{(searchParams.message || searchParams.code) && (
				<>
					<Toast
						message={searchParams.message ?? t_default(searchParams.code)}
						alertType={AlertType[searchParams.type as keyof typeof AlertType] as AlertType}
					/>
				</>
			)}
			<input type="hidden" name="locale" value={params.locale} />
			<div className="flex-grow">
				<div className="flex flex-col gap-2">
					<label className="text-xl font-bold">{t('title')}</label>
					<label className="text-md font-extralight">{t('info')}</label>
				</div>
				<div className="grid grid-cols-6 gap-6 justify-left items-center pt-10">
					{socials.map((social, index) => (
						<SocialInput
							key={index}
							icon={social.icon}
							inputName={social.inputName}
							defaultValue={social.defaultValue ?? ''}
						/>
					))}
				</div>
			</div>
			<SettingsFooter
				locale={params.locale}
				buttonText={t('save')}
				errorText={t('changes')}
				inputsConfig={{}}
				cancelButtonText={t('cancel')}
				dialogText={{
					title: t_dialog('title'),
					message: t_dialog('message'),
					yes: t_dialog('yes'),
					no: t_dialog('no'),
				}}
			/>
		</form>
	);
}
