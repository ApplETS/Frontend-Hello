import { headers, cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const signIn = async (formData: FormData) => {
	'use server';

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return redirect(`/login?message=${error.message}&type=error`);
	}

	return redirect('/');
};

export const signUp = async (formData: FormData) => {
	'use server';

	const origin = headers().get('origin');
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/login?message=Parfait mon tchum&type=success`,
		},
	});

	if (error) {
		return redirect(`/signup?message=${error.message}&type=error`);
	}

	return redirect("/signup?message=Veuillez vérifier votre courriel afin de terminer l'inscription&type=success");
};

export const forgotPassword = async (formData: FormData) => {
	'use server';

	const email = formData.get('email') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.resetPasswordForEmail(email);

	if (error) {
		return redirect(`/forgotpassword?message=${error.message}, ${error.status}&type=error`);
	}

	return redirect('/updatepassword?message=Veuillez consulter votre email&email=' + email + '&type=success');
};

export const updatePassword = async (formData: FormData) => {
	'use server';

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const token = formData.get('token') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const resOtp = await supabase.auth.verifyOtp({
		email: email,
		token: token,
		type: 'recovery',
	});

	if (resOtp.error) {
		return redirect(`/updatepassword?message=${resOtp.error.message}, ${resOtp.error.status}&type=error`);
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		return redirect(`/updatepassword?message=${error.message}&type=error`);
	}

	return redirect('/');
};