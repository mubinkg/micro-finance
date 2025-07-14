import { NextResponse } from 'next/server'
var jwt = require('jsonwebtoken');

const publicRoutes = ['/forget-password', '/login', '/registration', '/']
const adminRoutes = ['/applicants', '/dashboard', '/loan-details']
const userRoutes = ['/contact', '/history', '/loan', '/privacy-policy', '/profile', '/resubmit', '/sms-policy', '/terms-conditions']

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = (request.cookies.get('access_token'))
    const pathName = request.nextUrl.pathname
    console.log("Pathname ==== ", pathName)
    console.log('Is Public route ==== ', publicRoutes.includes(pathName))

    if (!token && !publicRoutes.includes(pathName)) {
        return Response.redirect(new URL('/login', request.url))

    }
    if (token) {
        const decoded = jwt.decode(token.value);
        const userRole = decoded?.role || 'user';
        console.log('User role ==== ', pathName.startsWith('/loan-details'))
        if (userRole === 'admin') {
            if (!(adminRoutes.includes(pathName) || pathName.startsWith('/loan-details'))) {
                return Response.redirect(new URL('/dashboard', request.url))
            }
            return NextResponse.next()
        } else {
            if (!userRoutes.includes(pathName)) {
                return Response.redirect(new URL('/dashboard', request.url))
            }
            return NextResponse.next()
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|sw\\.js$|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|bmp|tiff|avif)$).*)',
    ],
}
