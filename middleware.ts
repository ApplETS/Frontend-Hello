import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import type { NextRequest } from 'next/server';
import { localePrefix, locales, pathnames } from './config';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const url = req.nextUrl.clone();
	const path = url.pathname;

	const publicPaths = ['/login', '/signup', '/updatepassword', '/forgotpassword'];
	const publicRoutes = locales.flatMap((locale) => publicPaths.map((path) => `/${locale}${path}`));

	if (publicRoutes.includes(path)) {
		return NextResponse.next();
	}
/*
	// User check logic for non-public routes
	if (!user) {
		const locale = req.nextUrl.locale || 'fr';
		const basePath = `/${locale}`;
		return NextResponse.redirect(new URL(`${basePath}/login`, req.url));
	}
*/
	return NextResponse.next();
}

export default createMiddleware({
	locales,
	pathnames,
	localePrefix,
	defaultLocale: 'fr',
});

export const config = {
	matcher: ['/((?!api|_next|static|public|favicon.ico).*)'],
};
