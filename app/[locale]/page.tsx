import AuthButton from "../../components/AuthButton";

interface Props {
  params: { locale: string };
}

export default function Index({ params: { locale } }: Props) {
  return <AuthButton locale={locale} />;
}
