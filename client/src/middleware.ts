import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = request.nextUrl

  // If user is not authenticated and trying to access the dashboard, redirect to login
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Allow the request to proceed
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/api/(.*)']
}
