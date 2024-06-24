import { verifyPassword } from "lib/auth";
import { connectToDatabase } from "lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email" },
        password: { label: "password" },
      },
      async authorize(credentials) {
        const client = await connectToDatabase();
        const userCollection = client.db("ecom").collection("user");
        const existingUser = await userCollection.findOne({
          email: credentials?.email,
        });

        if (!existingUser) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials?.password,
          existingUser.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        // return { id: user?._id, email: user.email };

        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", email: credentials?.email };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});
