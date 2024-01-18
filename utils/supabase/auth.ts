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
		return redirect(`/login?message=Mauvaises informations de connexion, ${error.message}`);
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
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		return redirect(`/signUp?message=Erreur lors de l'inscription, ${error.message}`);
	}

	return redirect("/signUp?message=Veuillez vérifier votre courriel afin de terminer l'inscription");
};

export const forgotPassword = async (formData: FormData) => {
	'use server';

	const email = formData.get('email') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.resetPasswordForEmail(email);

	if (error) {
		return redirect(`/forgotPassword?message=Erreur lors de l'envoi du courriel de réinitialisation, ${error.message}`);
	}

	return redirect('/updatePassword?message=Veuillez consulter votre email&email=' + email);
};

export const updatePassword = async (formData: FormData) => {
	'use server';

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const token = formData.get('token') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const resOtp = await supabase.auth.verifyOtp(
		{
			email: email,
			token: token,
			type: 'recovery'
		}
	)

	if (resOtp.error) {
		return redirect(`/updatePassword?message=Erreur lors de la mise à jour ${resOtp.error.message}`);
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		return redirect(`/updatePassword?message=Erreur lors de la mise à jour ${error.message}`);
	}

	return redirect('/');
};
