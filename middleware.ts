import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import {pathnames, locales, localePrefix} from './config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  pathnames,
  localePrefix,
  // Used when no locale matches
  defaultLocale: "fr",
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/",
    "/(fr|en)/:path*",
    '/((?!_next|_vercel|.*\\..*).*)'
  ],
};

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user && req.nextUrl.pathname === '/login') {
		return NextResponse.redirect(new URL('/', req.url));
	}

	if (!user && req.nextUrl.pathname !== '/login') {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	return res;
}
