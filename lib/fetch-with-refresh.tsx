import { getSession } from '@/utils/supabase/auth';

export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
}

export async function fetchWithSession(
	routeSuffix: string,
	method: Method,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body: any = null
) {
	// Get the current session, refreshes it if it's expired
	const session = await getSession();

	const fetchOptions: RequestInit = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + session?.access_token,
		},
	};
	console.log(session?.access_token);

	if (body && method.toUpperCase() !== 'GET') {
		console.log(body);
		fetchOptions.body = JSON.stringify(body);
	}

	return fetch(`${process.env.API_BASE_URL}/${routeSuffix}`, fetchOptions);
}
