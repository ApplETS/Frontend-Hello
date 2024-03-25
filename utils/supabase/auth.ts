import { headers, cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { api } from '@/config';
import { updateUserProfile } from '@/lib/update-profile';
import { getAuthenticatedUser } from '@/lib/get-authenticated-user';
import { AlertType } from '@/components/Alert';
import { Response } from '@/app/actions/settings/submitForm';

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

	return redirect(`/${locale}/dashboard/news`);
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
			data: {
				role: 'organizer',
			},
		},
	});

	if (error) {
		return redirect(`/${locale}/signup?code=${error.status}&type=error`);
	}

	const userObject = {
		id: data?.user?.id,
		email: email,
		organization: formData.get('name') as string,
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

	return redirect(`/${locale}/dashboard/news`);
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

	return redirect(`/${locale}/dashboard/news`);
};

export const updatePasswordSettings = async (formData: FormData) => {
	'use server';

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const confirmPassword = formData.get('confirmPassword') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	let response: Response = {
		status: '200',
		type: AlertType.success,
	};

	if (password !== confirmPassword) {
		const error: Response = {
			status: '400',
			type: AlertType.error,
		};

		return error;
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		response.status = String(error.status) ?? '400';
		response.type = AlertType.error;
	}

	return response;
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

	const userObject = await getAuthenticatedUser();

	userObject.email = formData.get('email') as string;
	userObject.organization = formData.get('organization') as string;
	userObject.activityArea = formData.get('activity') as string;
	userObject.profileDescription = formData.get('description') as string;
	userObject.webSiteLink = formData.get('website') as string;

	let response: Response;

	try {
		await updateUserProfile(userObject);
		response = {
			status: '200',
			type: AlertType.success,
		};
	} catch (e) {
		response = {
			status: '400',
			type: AlertType.error,
		};
	}

	return response;
};

export const updateSocials = async (formData: FormData) => {
	'use server';

	const userObject = await getAuthenticatedUser();

	userObject.facebookLink = formData.get('facebook') as string;
	userObject.discordLink = formData.get('discord') as string;
	userObject.instagramLink = formData.get('instagram') as string;
	userObject.linkedInLink = formData.get('linkedin') as string;
	userObject.tikTokLink = formData.get('tiktok') as string;
	userObject.redditLink = formData.get('reddit') as string;
	userObject.xLink = formData.get('x') as string;

	let response: Response;

	try {
		await updateUserProfile(userObject);
		response = {
			status: '200',
			type: AlertType.success,
		};
	} catch (e) {
		response = {
			status: '400',
			type: AlertType.error,
		};
	}

	return response;
};

export const getSession = async () => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await supabase.auth.getSession();

	if (error) {
		console.error('Error getting session', error);
		return;
	}

	return data.session;
};
