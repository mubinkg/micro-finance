import { NextResponse } from 'next/server'
var jwt = require('jsonwebtoken');

 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = (request.cookies.get('access_token'))
    
    const {pathname} = request.nextUrl

    if(!token && (pathname === '/authentication/login' || pathname === '/authentication/registration')){
        return NextResponse.next()
    }

    if(!token && pathname !== '/authentication/login' ){
        return NextResponse.redirect(new URL('/authentication/login', request.url))
    }
    if(token){
        var decoded = jwt.decode(token.value);
        const userRole = decoded?.role || 'user';
        if(userRole === 'admin'){
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
        if(pathname === '/authentication/login') return  NextResponse.redirect(new URL('/', request.url))
    }
    
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [ '/authentication/:path*', '/admin/:path*', '/zimba-cash/loan/:path*'],
}