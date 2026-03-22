import { redirect } from 'next/navigation';

interface Props {
	params:  Promise<{ locale: string }>;
}

export default async function Index({ params }: Props) {
	const {locale} = await params
	return redirect(`${locale}/dashboard/news`);
}
