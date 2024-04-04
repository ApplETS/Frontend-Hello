import { getSession } from '@/utils/supabase/auth';
import { Session } from '@supabase/supabase-js';

export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
	POSTFORM = 'POSTFORM',
	PATCHFORM = 'PATCHFORM',
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
	console.log(session);
	const fetchOptions: RequestInit = {
		method:
			method !== Method.POSTFORM && method !== Method.PATCHFORM
				? method
				: method === Method.POSTFORM
				? Method.POST
				: Method.PATCH,
		headers:
			method !== Method.POSTFORM && method !== Method.PATCHFORM
				? {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + session?.access_token,
				  }
				: { Authorization: 'Bearer ' + session?.access_token },
		next: {},
	};

	if (body && method !== Method.GET) {
		fetchOptions.body = method !== Method.POSTFORM && method !== Method.PATCHFORM ? JSON.stringify(body) : body;
	}

	if (tag && fetchOptions.next) {
		fetchOptions.next.tags = [tag];
	}

	return fetch(`${process.env.API_BASE_URL}/${routeSuffix}`, fetchOptions);
}
