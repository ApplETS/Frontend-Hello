import { redirect } from 'next/navigation';

export default function Settings({ params }: { params: { locale: string } }) {
	return redirect(`/${params.locale}/dashboard/settings/profile`);
}
