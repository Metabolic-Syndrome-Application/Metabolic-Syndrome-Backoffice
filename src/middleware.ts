import { NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token);
    // if (!request.nextauth?.token) {
    //   // Redirect to signIn page if not authenticated
    //   return NextResponse.redirect('/auth/signIn');
    // }

    if (request.nextauth.token?.role == 'patient') {
      return new Response('Access Denied', { status: 401 });
    }

    if (
      request.nextUrl.pathname.startsWith('/') &&
      request.nextauth.token?.role !== 'admin' &&
      request.nextauth.token?.role !== 'doctor' &&
      request.nextauth.token?.role !== 'staff'
    ) {
      return NextResponse.rewrite(new URL('/', request.url));
    }

    if (
      request.nextUrl.pathname.startsWith('/admin') &&
      request.nextauth.token?.role !== 'admin'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }

    if (
      request.nextUrl.pathname.startsWith('/doctor') &&
      request.nextauth.token?.role !== 'doctor'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }

    if (
      request.nextUrl.pathname.startsWith('/staff') &&
      request.nextauth.token?.role !== 'staff'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }

    if (
      request.nextUrl.pathname.startsWith('/patient') &&
      request.nextauth.token?.role !== 'doctor' &&
      request.nextauth.token?.role !== 'staff'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }

    if (
      request.nextUrl.pathname.startsWith('/plan') &&
      request.nextauth.token?.role !== 'doctor' &&
      request.nextauth.token?.role !== 'staff'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }

    if (
      request.nextUrl.pathname.startsWith('/challenge') &&
      request.nextauth.token?.role !== 'doctor' &&
      request.nextauth.token?.role !== 'staff'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }

    if (
      request.nextUrl.pathname.startsWith('/client') &&
      request.nextauth.token?.role !== 'admin' &&
      request.nextauth.token?.role !== 'staff'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    '/admin:path*',
    '/doctor:path*',
    '/staff:path*',
    '/patient:path*',
    '/plan:path*',
    '/challenge:path*',
    '/client',
    '/dashboard:path*',
    '/',
  ],
};
