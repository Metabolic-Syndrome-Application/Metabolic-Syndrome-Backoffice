import NextAuth from 'next-auth/next';

import { authOptions } from './authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// app/api/auth/[...nextauth]/route.ts
// import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
// import NextAuth from 'next-auth';

// import { NextRequest } from 'next/server';

// interface RouteHandlerContext {
//   params: { nextauth: string[] };
// }

// const handler = async (req: NextRequest, context: RouteHandlerContext) => {
//   return NextAuth(req, context, authOptions);
// };

// export { handler as GET, handler as POST };
