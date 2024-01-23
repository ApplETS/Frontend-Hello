import { ReactElement } from "react";
import AuthButton from "../../components/AuthButton";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  children: ReactElement;
  params: { locale: string };
};

export default function Index({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Test");

  return <AuthButton />;
}
