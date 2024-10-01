import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { mongooseConnect } from "@/lib/mongoose";

export const authOptions = {
	secret: process.env.SECRET,
	session: {
		strategy: "jwt",
	},
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			id: "credentials",
			credentials: {
				username: {
					label: "Email",
					type: "email",
					placeholder: "test@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const email = credentials?.email;
				const password = credentials?.password;

				await mongooseConnect();
				const user = await User.findOne({ email });
				if (user && bcrypt.compareSync(password, user.password)) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
};

export default NextAuth(authOptions);
