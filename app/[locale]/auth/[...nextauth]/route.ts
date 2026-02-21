import NextAuth, { AuthOptions } from "next-auth"
import AzureAD from "next-auth/providers/azure-ad"
import Authentik from "next-auth/providers/authentik"

export const authOptions: AuthOptions = {
	providers: [
		/*AzureAD({
			clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID as string,
			issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
			clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET as string,
			authorization: {
				params: {
					scope: "openid profile email User.Read api://bf42ef76-b599-4ab1-a015-6e4b8afa347b/access_as_user",
				},
			},
		}),*/
		Authentik({
			issuer: process.env.OPENID_ISSUER!,
			clientId: process.env.OPENID_CLIENT_ID!,
			clientSecret: process.env.OPENID_CLIENT_SECRET!/*clientSecret:null!*/,
			wellKnown: `${process.env.OPENID_ISSUER!}.well-known/openid-configuration`,
			client: {
				id_token_signed_response_alg: "HS256",
			}
		})
	],
	secret: process.env.AUTH_SECRET,
	callbacks: {

		async signIn(user) {
			console.log("🚀 ~ file: route.ts ~ line 44 ~ signIn ~ user", user)
			return true
		},
		async jwt({ token, user, account, profile }) {
			if (user) {
				token.accessToken = account?.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			return { ...session, accessToken: token.accessToken };
		},

	},
}

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;