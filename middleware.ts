import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';
import createMiddleware from 'next-intl/middleware';
import { pathnames, locales, localePrefix } from './config';

export default createMiddleware({
	// A list of all locales that are supported
	locales,
	pathnames,
	localePrefix,
	// Used when no locale matches
	defaultLocale: 'fr',
});

export const config = {
	// Match only internationalized pathnames
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/', '/(fr|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};

export async function middleware(request: NextRequest) {
	try {
		// This `try/catch` block is only here for the interactive tutorial.
		// Feel free to remove once you have Supabase connected.
		const { supabase, response } = createClient(request);

		// Refresh session if expired - required for Server Components
		// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
		await supabase.auth.getSession();

		return response;
	} catch (e) {
		// If you are here, a Supabase client could not be created!
		// This is likely because you have not set up environment variables.
		// Check out http://localhost:3000 for Next Steps.
		return NextResponse.next({
			request: {
				headers: request.headers,
			},
		});
	}
}
