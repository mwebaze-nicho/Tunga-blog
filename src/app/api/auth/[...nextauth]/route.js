import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import connectDB from "@/config/mongodb";
import jwt from "jsonwebtoken";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { userName, userPassword } = credentials;

        try {
          await connectDB();

          const userInfo = await User.findOne({ userName }).select(
            "+userPassword"
          );

          if (!userInfo) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            userPassword,
            userInfo.userPassword
          );

          if (!passwordMatch) {
            return null;
          } else {
            const { userName, _id } = userInfo;

            const userData = { userName, _id };

            const accessToken = jwt.sign(
              { userId: _id, username: userName },
              process.env.ACCESS_TOKEN_SECRET
            );

            return { ...userData, accessToken };
          }
        } catch (error) {
          console.log("An error occurred during authorization:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      //return token
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
