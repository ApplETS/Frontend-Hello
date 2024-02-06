import Dropzone from "@/components/Dropzone";
import Toast from "@/components/Toast";
import { AlertType } from "@/components/Alert";
import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import facebookIcon from "@/public/socials/Facebook.svg";
import discordIcon from "@/public/socials/Discord.svg";
import instagramIcon from "@/public/socials/Instagram.svg";
import linkedinIcon from "@/public/socials/Linkedin.svg";
import tiktokIcon from "@/public/socials/TikTok.svg";
import redditIcon from "@/public/socials/Reddit.svg";
import xIcon from "@/public/socials/X.svg";
import Image from "next/image";

type Props = {
	params: { locale: string };
};

export default function Page({ params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations("Settings.socials-section");
	return (
		<form className="flex flex-col basis-3/4">
			<input type="hidden" name="locale" value={params.locale} />
			<div className="flex-grow">
				<label className="text-xl font-bold">{t("title")}</label>
				<div className="grid grid-cols-4 gap-6 justify-left items-center pt-10">
					<div className="avatar justify-self-center">
						<Image src={facebookIcon} alt="Facebook" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={discordIcon} alt="Discord" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={instagramIcon} alt="Instagram" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={linkedinIcon} alt="LinkedIn" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={tiktokIcon} alt="TikTok" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={redditIcon} alt="Reddit" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current"
						name="organisation"
					/>
					<div className="avatar placeholder justify-self-center">
						<Image src={xIcon} alt="X" />
					</div>
					<input
						type="text"
						className="input input-ghost input-bordered border-current"
						name="organisation"
					/>
				</div>
			</div>
			<footer className="sticky flex justify-end mt-auto">
				<button className="btn btn-primary rounded-md text-base w-1/5 mt-auto">
					{t("save")}
				</button>
			</footer>
		</form>
	);
}
