import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import facebookIcon from '@/public/Socials/Facebook.svg';
import discordIcon from '@/public/Socials/Discord.svg';
import instagramIcon from '@/public/Socials/Instagram.svg';
import linkedinIcon from '@/public/Socials/Linkedin.svg';
import tiktokIcon from '@/public/Socials/Tiktok.svg';
import redditIcon from '@/public/Socials/Reddit.svg';
import xIcon from '@/public/Socials/X.svg';
import SettingsFooter from '../components/SettingsFooter';
import SocialInput from './components/SocialInput';

type Props = {
	params: { locale: string };
};

export default function Page({ params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('Settings.socials-section');
	const t_dialog = useTranslations('Settings.dialog');

	const socials = [
		{ icon: facebookIcon, inputName: 'facebook' },
		{ icon: discordIcon, inputName: 'discord' },
		{ icon: instagramIcon, inputName: 'instagram' },
		{ icon: linkedinIcon, inputName: 'linkedin' },
		{ icon: tiktokIcon, inputName: 'tiktok' },
		{ icon: redditIcon, inputName: 'reddit' },
		{ icon: xIcon, inputName: 'x' },
	];

	return (
		<form className="flex flex-col basis-3/4">
			<input type="hidden" name="locale" value={params.locale} />
			<div className="flex flex-col gap-2">
				<label className="text-xl font-bold">{t('title')}</label>
				<label className="text-md font-extralight">{t('info')}</label>
			</div>
			<div className="grid grid-cols-6 gap-6 justify-left items-center pt-10">
				{socials.map((social, index) => (
					<SocialInput key={index} icon={social.icon} inputName={social.inputName} />
				))}
			</div>
			<SettingsFooter
				locale={params.locale}
				buttonText={t('save')}
				errorText={t('changes')}
				inputsConfig={{
					filled: ['facebook', 'discord', 'instagram', 'linkedin', 'tiktok', 'reddit', 'x'],
				}}
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
