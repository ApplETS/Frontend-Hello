import { AlertType } from "@/components/Alert";
import Dropzone from "@/components/Dropzone";
import PasswordInput from "@/components/PasswordInput";
import Dropdown from "@/components/SignUpActivity";
import Toast from "@/components/Toast";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

type Props = {
	params: { locale: string };
};

export default function Page({ params }: Props) {
	unstable_setRequestLocale(params.locale);
	const t = useTranslations("Settings.display-section");

	return (
		<form className="flex flex-col basis-3/4">
			<input type="hidden" name="locale" value={params.locale} />
			<div className="flex-grow">
				<label className="text-xl font-bold">{t("title")}</label>
				<div className="grid grid-cols-4 gap-6 justify-left items-center pt-10">
					<label className="">{t("theme")}</label>
					<Dropdown items={["light", "dark"]} inputName="theme" />

					<label className="justify-self-center">{t("language")}</label>
					<Dropdown items={["English", "French"]} inputName="language" />
				</div>
			</div>
		</form>
	);
}
