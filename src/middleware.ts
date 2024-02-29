// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { sessionStatus } from '@/types/session';

// //protect route -> ใช้ sessionStatus = false จะ redirect สู๋หน้า home
// const protectedRoutes = ['/manage-user'];
// export default function middleware(req: any) {
//   if (!sessionStatus && protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL('/', req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }

// import { NextResponse } from 'next/server';
// import { withAuth } from 'next-auth/middleware';
// import { getToken } from 'next-auth/jwt';

// export default withAuth(
//   function middleware(req) {
//     console.log('token: ', req.nextauth.token);

//     if (
//       req.nextUrl.pathname.startsWith('/admin') &&
//       req.nextauth.token?.user?.user?.role !== 'admin'
//     ) {
//       // return NextResponse.redirect(new URL('/auth/signIn', req.url));
//       new URL('/auth/login?message=You Are Not Authorized!', req.url);
//     }

//     if (
//       req.nextUrl.pathname.startsWith('/doctor') &&
//       req.nextauth.token?.user?.user?.role === 'doctor'
//     ) {
//       return NextResponse.redirect(
//         new URL('/auth/login?message=You Are Not Authorized!', req.url)
//       );
//       //new URL('/', req.url);
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       async authorized({ req }) {
//         // This function is executed before rendering the page
//         const token = await getToken({ req });
//         return !!token;
//       },
//     },
//   }
// );

// export const config = {
//   // Define the protected routes here
//   // It will trigger the middleware for routes starting with /admin and /doctor
//   matcher: ['/admin/:path*', '/doctor/:path*'],
// };

// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
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
