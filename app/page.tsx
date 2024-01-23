import { cookies } from 'next/headers';
import AuthButton from '../components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Index() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return redirect('/login');

	return <AuthButton />;
}
