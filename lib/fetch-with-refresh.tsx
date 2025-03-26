import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/[locale]/auth/[...nextauth]/route";


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
	const session: (Session & { accessToken: string }) | null = await getServerSession(authOptions);

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
					Authorization: 'Bearer ' + session?.['accessToken'],
				}
				: { Authorization: 'Bearer ' + session?.['accessToken'] },
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
