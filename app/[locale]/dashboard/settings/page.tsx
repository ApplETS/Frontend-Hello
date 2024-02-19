import { redirect } from 'next/navigation';

export default function Page({ params }: { params: { locale: string } }) {
	return redirect(`/${params.locale}/dashboard/settings/profile`);
}
