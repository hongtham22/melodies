import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('accessToken');

    const loginRegisterPages = ['/login', '/signup'];

    if (accessToken && loginRegisterPages.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/signup'],
};
