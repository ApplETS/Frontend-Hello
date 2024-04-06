'use client';

import facebookIcon from '@/public/Socials/Facebook.svg';
import discordIcon from '@/public/Socials/Discord.svg';
import instagramIcon from '@/public/Socials/Instagram.svg';
import linkedinIcon from '@/public/Socials/Linkedin.svg';
import tiktokIcon from '@/public/Socials/Tiktok.svg';
import redditIcon from '@/public/Socials/Reddit.svg';
import xIcon from '@/public/Socials/X.svg';
import SettingsFooter from '../components/SettingsFooter';
import SocialInput from './components/SocialInput';
import { useUser } from '@/utils/provider/UserProvider';
import { handleSubmitForm } from '@/app/actions/settings/submitForm';
import { useLoading } from '@/utils/provider/LoadingProvider';
import { useToast } from '@/utils/provider/ToastProvider';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useTranslationsWithDefault } from '@/utils/traductions/trads';
import { updateSocials } from '@/app/actions/settings/update-socials';

export default function SocialsClient() {
	const t = useTranslations('Settings.socials-section');
	const t_default = useTranslationsWithDefault('Settings.profile-section');
	const t_dialog = useTranslations('Settings.dialog');
	const { user } = useUser();
	const { startTransition } = useLoading();
	const { setToast } = useToast();
	const formRef = useRef<HTMLFormElement>(null);

	const socials = [
		{ icon: facebookIcon, inputName: 'facebook', defaultValue: user?.facebookLink },
		{ icon: discordIcon, inputName: 'discord', defaultValue: user?.discordLink },
		{ icon: instagramIcon, inputName: 'instagram', defaultValue: user?.instagramLink },
		{ icon: linkedinIcon, inputName: 'linkedin', defaultValue: user?.linkedInLink },
		{ icon: tiktokIcon, inputName: 'tiktok', defaultValue: user?.tikTokLink },
		{ icon: redditIcon, inputName: 'reddit', defaultValue: user?.redditLink },
		{ icon: xIcon, inputName: 'x', defaultValue: user?.xLink },
	];

	return (
		<form
			className="flex flex-col basis-4/5"
			ref={formRef}
			action={(formData) => handleSubmitForm(formData, updateSocials, startTransition, setToast, t_default)}
		>
			<div className="flex-grow">
				<div className="flex flex-col gap-2 mb-2">
					<label className="text-xl font-bold">{t('title')}</label>
					<label className="text-md font-extralight">{t('info')}</label>
				</div>
				{socials.map((social, index) => (
					<SocialInput
						key={index}
						icon={social.icon}
						inputName={social.inputName}
						defaultValue={social.defaultValue ?? ''}
					/>
				))}
			</div>
			<SettingsFooter
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
