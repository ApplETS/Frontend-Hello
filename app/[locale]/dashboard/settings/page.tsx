import { redirect } from 'next/navigation';

export default async function Settings(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    return redirect(`/${params.locale}/dashboard/settings/profile`);
}
