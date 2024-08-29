import { NextResponse } from 'next/server';

export function middleware(request) {
  return NextResponse.redirect(new URL('/mypage/info', request.url));
}

export const config = {
  matcher: '/mypage',
};
