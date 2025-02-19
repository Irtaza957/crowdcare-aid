import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function handleLoginRedirect(request: NextRequest) {
  const token = request.cookies.get('token');

  if (token?.value) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

function handleProtectedRedirect(request: NextRequest) {
  const token = request.cookies.get('token');

  if (!token?.value) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/static/')
  ) {
    return NextResponse.next();
  }

  if (
    url.pathname === '/login' ||
    url.pathname === '/signup' ||
    url.pathname === '/forgetPassword' ||
    url.pathname === '/changePassword' ||
    url.pathname === '/otpVerification'
  ) {
    return handleLoginRedirect(request);
  }

  if (url.pathname === '/home') {
    return handleProtectedRedirect(request);
  }

  const token = request.cookies.get('token');
  if (!token?.value) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/login', '/(.*)'],
};
