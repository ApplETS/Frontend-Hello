import NextAuth, { AuthOptions } from "next-auth"
import Authentik from "next-auth/providers/authentik"
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
	providers: [
		Authentik({
			issuer: process.env.OPENID_ISSUER!,
			clientId: process.env.OPENID_CLIENT_ID!,
			clientSecret: process.env.OPENID_CLIENT_SECRET!/*clientSecret:null!*/,
			wellKnown: `${process.env.OPENID_ISSUER!}.well-known/openid-configuration`,
			client: {
				id_token_signed_response_alg: "HS256",
			},
			authorization: {params: {scope: "profile email openid offline_access"}}
		})
	],
	secret: process.env.AUTH_SECRET,
	callbacks: {

		async signIn(user) {
			console.log("🚀 ~ file: route.ts ~ line 44 ~ signIn ~ user", user);
			return true
		},
		async jwt({ token, user, account, profile }) {
			console.log(token);
			if (account) {
				return {
					...token,
					access_token: account.access_token,
					refresh_token: account.refresh_token,
					expires_at: account.expires_at,
				};
			}
			else if (validToken(token)) {
				return token;
			}
			return await refreshToken(token);
		},
		async session({ session, token }) {
			return { ...session, accessToken: token.accessToken };
		},

	},
}

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

function validToken(token: JWT): boolean{
	return (token.expires_at !== undefined && Date.now() < token.expires_at * 1000);
}

async function refreshToken(token: JWT): Promise<JWT>{
	if (!token.refresh_token){
		throw new Error("No refresh token");
	}

	const parameters = new URLSearchParams({
		"grant_type": "refresh_token",
		"refresh_token": token.refresh_token,
		"client_id": process.env.OPENID_CLIENT_ID!,
		"scope": "profile email openid offline_access"
	});

	const refreshResponse = await fetch(`${process.env.OPENID_BASE_URL!}token/`, {
		method: "POST",
		body: parameters.toString(),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});

	if (!refreshResponse.ok){
		console.log("Failed to refresh");
		const text = await refreshResponse.text();
		console.log(text);
		return {
			...token,
			error: "RefreshTokenError"
		}
	}
	const response = await refreshResponse.json();

	const newToken = response as {
            access_token: string
            expires_in: number
            refresh_token: string
    };

	const expiration = calculateExpiration(token.expires_at!, newToken.expires_in);

	return {
		...token,
		access_token: newToken.access_token,
		refresh_token: newToken.refresh_token,
		expires_at: expiration
	};
}

function calculateExpiration(formerExpiration: number, expiresIn: number): number {
	return Math.floor((Date.now() / 1000) + expiresIn);
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string
    expires_at?: number
    refresh_token?: string
    error?: "RefreshTokenError"
  }
}