import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

const hasGoogle = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
export const { handlers, auth } = NextAuth({
  session: { strategy: 'jwt' },
  providers: hasGoogle ? [Google] : [],
  pages: { signIn: '/auth' },
  secret: process.env.NEXTAUTH_SECRET,
})
export const GET = handlers.GET
export const POST = handlers.POST
