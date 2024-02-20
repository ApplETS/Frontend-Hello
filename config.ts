import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "fr"] as const;

export const api = "http://localhost:8080/api";

export const pathnames = {
	"/": "/",
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
