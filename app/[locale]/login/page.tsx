import Checkbox from "./components/Checkbox";
import { signIn } from "@/utils/supabase/auth";
import Link from "next/link";
import Image from "next/image";
import ETS from "@/public/ETS.svg";
import PasswordInput from "./components/PasswordInput";
import Alert from "@/components/Alert";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import ThemeButton from "@/components/themeButton";
import LanguageButton from "@/components/languageButton";

export default function Login({
  searchParams,
  params,
}: {
  searchParams: { message: string; type: string };
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);

  const t = useTranslations("Login");
  return (
    <div className="animate-in relative flex justify-center items-center rounded-2xl w-screen h-screen">
      <ThemeButton />
	  <LanguageButton />
      <div className={`absolute bottom-4 right-4 w-[141px] h-[79px] bg-cover`}>
        <Image priority src={ETS} alt="ETS Logo" />
      </div>
      <div className="grid justify-items-center content-center bg-base-300 rounded-2xl min-h-min min-w-min ">
        <h1 className="py-10 text-4xl">{t("welcome")}</h1>
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
          <form
            className="flex-1 flex flex-col w-full justify-center  gap-2"
            action={signIn}
          >
            {searchParams?.message && (
              <Alert
                customStyle={
                  "flex flex-1 flex-col w-full pb-2 justify-center gap-2"
                }
                text={searchParams.message}
                alertType={searchParams.type}
                icon={faTriangleExclamation}
              />
            )}
            <label className="text-md" htmlFor="email">
              {t("email")}
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6 input-primary"
              name="email"
              required
            />
            <label className="text-md" htmlFor="password">
              {t("password")}
            </label>
            <PasswordInput />
            <Checkbox
              checked={true}
              style="self-end pb-6"
              text={t("remember-me")}
              checkboxStyle="checkbox-primary"
            />
            <button className="btn btn-primary rounded-md text-base mb-2">
              {t("login")}
            </button>
          </form>

          <div className="flex justify-center">
            <p className="text-xs">
              {t("forgot-info")}
              <Link
                href={"/forgotPassword"}
                className="text-xs pl-1 underline text-primary"
              >
                {t("reset-password")}
              </Link>
            </p>
          </div>
          <div className="flex justify-center">
            <p className="text-xs pb-10">
              {t("no-account")}
              <Link
                href={"/signUp"}
                className="text-xs pl-1 underline text-primary"
              >
                {t("signup")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
