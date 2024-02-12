import { headers, cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { api } from '@/config';

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

	return redirect(`/${locale}/dashboard`);
};

export const signUp = async (formData: FormData) => {
	'use server';

	const origin = headers().get('origin');
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const locale = formData.get('locale') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/${locale}/login?code=200&type=success`,
		},
	});

	if (error) {
		return redirect(`/${locale}/signup?code=${error.status}&type=error`);
	}

	const userObject = {
		id: data?.user?.id,
		email: email,
		organisation: formData.get('name') as string,
		activityArea: formData.get('activity') as string,
	};

	const response = await fetch(`${api}/user/organizer`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + data?.session?.access_token,
		},
		body: JSON.stringify(userObject),
	});
	console.log(response);
	console.log(data?.session?.access_token);
	console.log(data?.user?.id);

	return redirect(`/${locale}/dashboard`);
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

	return redirect(`/${locale}/dashboard`);
};

export const updatePasswordSettings = async (formData: FormData) => {
	'use server';

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const confirmPassword = formData.get('confirmPassword') as string;
	const locale = formData.get('locale') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	if (password !== confirmPassword) {
		return redirect(`/${locale}/dashboard/settings/password?code=400&type=error`);
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		console.log(error);
		return redirect(`/${locale}/dashboard/settings/password?code=${error.status}&type=error`);
	}

	return redirect(`/${locale}/dashboard/settings/password?code=200&type=success`);
};

export const signOut = async (formData: FormData) => {
	'use server';

	const redirectLink = formData.get('redirectLink') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	await supabase.auth.signOut();

	return redirect(redirectLink);
};

export const updateProfile = async (formData: FormData) => {
	'use server';

	const locale = formData.get('locale') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data, error } = await supabase.auth.getUser();

	if (error) {
		return redirect(`/${locale}/dashboard/settings/profile?code=${error.status}&type=error`);
	}

	const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

	if (sessionError) {
		return redirect(`/${locale}/dashboard/settings/profile?code=${sessionError.status}&type=error`);
	}

	const userObject = {
		id: data.user?.id,
		email: formData.get('email') as string,
		organisation: formData.get('organization') as string,
		activityArea: formData.get('activity') as string,
	};

	const response = await fetch(`${api}/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + sessionData.session?.access_token,
		},
		body: JSON.stringify(userObject),
	});

	if (!response.ok) {
		return redirect(`/${locale}/dashboard/settings/profile?code=${response.status}&type=error`);
	}

	return redirect(`/${locale}/dashboard/settings/profile?code=200&type=success`);
};

export const getSession = async () => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await supabase.auth.getSession();

	if (error) {
		console.log('Error getting session', error);
		return;
	}

	return data.session;
};
