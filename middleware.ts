import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing'
import type { NextRequest } from 'next/server';
import { localePrefix, locales, pathnames } from './config';
import { getServerSession } from 'next-auth/next';

export async function middleware(req: NextRequest) {

	const url = req.nextUrl.clone();
	const path = url.pathname;

	const publicPaths = ['/auth/signin', '/dashboard/news'];
	const publicRoutes = locales.flatMap((locale) => publicPaths.map((path) => `/${locale}${path}`));
	if (publicRoutes.includes(path) || locales.map((locale) => path.startsWith(`/${locale}/dashboard/profile`))) {
		return NextResponse.next();
	}

	// User check logic for non-public routes
	// if (!session?.user) {
	// 	const locale = req.nextUrl.locale || 'fr';
	// 	const basePath = `/${locale}`;
	// 	return NextResponse.redirect(new URL(`${basePath}/auth/signing`, req.url));
	// }
	return NextResponse.next();
}

export default createMiddleware(routing);

export const config = {
	matcher: ['/((?!api|_next|static|public|favicon.ico).*)'],
};