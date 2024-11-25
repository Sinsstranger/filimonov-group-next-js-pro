import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { passwordSchema } from "@/app/auth/_models/schema"

const users = [
  { id: "1", name: "Anna", email: "test@example.local", password: "12345678" },
  { id: "2", name: "Anna", email: "vika@example.local", password: "12345678" },
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
}
export default NextAuth(authOptions)
