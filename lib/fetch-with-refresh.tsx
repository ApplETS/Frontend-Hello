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
	body: any = null,
	tag: string | null = null
) {
	// Get the current session, refreshes it if it's expired
	const session = await getSession();

	const fetchOptions: RequestInit = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + session?.access_token,
		},
		next: {},
	};

	if (body && method.toUpperCase() !== 'GET') {
		fetchOptions.body = JSON.stringify(body);
	}

	if (tag && fetchOptions.next) {
		fetchOptions.next.tags = [tag];
	}

	return fetch(`${process.env.API_BASE_URL}/${routeSuffix}`, fetchOptions);
}
