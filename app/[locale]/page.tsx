import { redirect } from 'next/navigation';

interface Props {
	params: { locale: string };
}

export default function Index({ params: { locale } }: Props) {
	return redirect(`${locale}/login`);
}
