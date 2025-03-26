import NextAuth, { AuthOptions } from "next-auth"
import AzureAD from "next-auth/providers/azure-ad"



export const authOptions: AuthOptions = {
	providers: [
		AzureAD({
			clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID as string,
			issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
			clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET as string,
			authorization: {
				params: {
					scope: "openid profile email User.Read api://bf42ef76-b599-4ab1-a015-6e4b8afa347b/access_as_user",
				},
			},
		}),
	],
	secret: process.env.AUTH_SECRET,
	callbacks: {
		async signIn(user) {
			console.log("🚀 ~ file: route.ts ~ line 44 ~ signIn ~ user", user)
			return true
		},
		async jwt({ token, user, account, profile }) {
			if (user) {
				token.accessToken = account?.id_token;
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