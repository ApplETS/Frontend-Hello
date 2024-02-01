import { headers, cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const signIn = async (formData: FormData) => {
	'use server';

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const locale = formData.get('locale') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return redirect(`/${locale}/login?code=${error.status}&type=error`);
	}

	return redirect(`/${locale}`);
};

export const signUp = async (formData: FormData) => {
	'use server';

	const origin = headers().get('origin');
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const locale = formData.get('locale') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/${locale}/login?code=200&type=success`,
		},
	});

	if (error) {
		return redirect(`/${locale}/signup?code=${error.status}&type=error`);
	}

	return redirect(`/${locale}`);
};

export const forgotPassword = async (formData: FormData) => {
	'use server';

	const email = formData.get('email') as string;
	const locale = formData.get('locale') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.resetPasswordForEmail(email);

	if (error) {
		return redirect(`/${locale}/forgotpassword?code=${error.status}&type=error`);
	}

	return redirect(`/${locale}/updatepassword?message=Veuillez consulter votre email&email=${email}&type=warning`);
};

export const updatePassword = async (formData: FormData) => {
	'use server';

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const token = formData.get('token') as string;
	const locale = formData.get('locale') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const resOtp = await supabase.auth.verifyOtp({
		email: email,
		token: token,
		type: 'recovery',
	});

	if (resOtp.error) {
		return redirect(`/${locale}/updatepassword?code=${resOtp.error.status}&type=error`);
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		return redirect(`/${locale}/updatepassword?code=${error.status}&type=error`);
	}

	return redirect(`/${locale}`);
};

export const signOut = async (formData: FormData) => {
	'use server';

	const redirectLink = formData.get('redirectLink') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	await supabase.auth.signOut();

	return redirect(redirectLink);
};
