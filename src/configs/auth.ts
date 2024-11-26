import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { passwordSchema } from "@/app/auth/_models/schema"
import bcrypt from "bcryptjs"

const users = [
  {
    id: "1",
    name: "Anna",
    email: "test@example.local",
    password: "$2a$10$SVht9kirZodK8u.XSveiLugFudqpCVyEnLZbQy7AUOjrr441grDHm",
  },
  {
    id: "2",
    name: "Anna",
    email: "vika@example.local",
    password: "$2a$10$H41/3ZsG5sS60TlQbP2EcOIg8wXlGQVQV9BebJvJBQ8tp83Hv25rC",
  },
]

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      type: "credentials",
      authorize: async (credentials) => {
        const { email, password } = await passwordSchema.parseAsync(credentials)
        const user = users.find((u) => u.email === email)
        if (!user) {
          throw new Error("Неправильные E-mail или пароль")
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
          throw new Error("Неправильные E-mail или пароль")
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
      id: "credentials",
      credentials: {},
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          email: token.email,
        }
      }
      return session
    },
  },
}
export default NextAuth(authOptions)
