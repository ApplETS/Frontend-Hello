import Dropzone from '@/components/Dropzone';
import Toast from '@/components/Toast';
import { AlertType } from '@/components/Alert';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import facebookIcon from '@/public/Socials/Facebook.svg';
import discordIcon from '@/public/Socials/Discord.svg';
import instagramIcon from '@/public/Socials/Instagram.svg';
import linkedinIcon from '@/public/Socials/Linkedin.svg';
import tiktokIcon from '@/public/Socials/Tiktok.svg';
import redditIcon from '@/public/Socials/Reddit.svg';
import xIcon from '@/public/Socials/X.svg';
import Image from 'next/image';
import CancelButton from '@/components/CancelButton';
import SettingsFooter from '../components/SettingsFooter';

type Props = {
	params: { locale: string };
};

export default function Page({ params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations('Settings.socials-section');
	return (
		<form className="flex flex-col basis-3/4">
			<input type="hidden" name="locale" value={params.locale} />
			<div className="flex-grow">
				<div className="flex flex-col gap-2">
					<label className="text-2xl font-bold">{t('title')}</label>
					<label className="text-md font-extralight">{t('info')}</label>
				</div>
				<div className="grid grid-cols-6 gap-6 justify-left items-center pt-10">
					<div className="avatar justify-self-center">
						<Image src={facebookIcon} alt="Facebook" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current col-span-2"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={discordIcon} alt="Discord" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current col-span-2"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={instagramIcon} alt="Instagram" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current col-span-2"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={linkedinIcon} alt="LinkedIn" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current col-span-2"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={tiktokIcon} alt="TikTok" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current col-span-2"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={redditIcon} alt="Reddit" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current col-span-2"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={xIcon} alt="X" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current col-span-2"
						name="organisation"
					/>
				</div>
			</div>
			<SettingsFooter locale={params.locale} buttonText={t('save')} errorText={t('changes')} inputsConfig={{}} />
		</form>
	);
}
