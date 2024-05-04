import { NextResponse } from 'next/server'
var jwt = require('jsonwebtoken');

 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = (request.cookies.get('access_token'))
    
    const {pathname} = request.nextUrl
    
    if(token){
        var decoded = jwt.decode(token.value);
        const userRole = decoded?.role || 'user';
        if(userRole === 'admin'){
            if(pathname === '/authentication/login') return NextResponse.redirect(new URL('/admin/dashboard', request.url))
            if(!pathname.startsWith('/admin')){
                return NextResponse.redirect(new URL('/admin/dashboard', request.url))
            }
            if(pathname === '/'){
                return NextResponse.redirect(new URL('/admin/dashboard', request.url))
            }
        }else{
            if(pathname === '/authentication/login' || pathname === '/authentication/registration') {
                return  NextResponse.redirect(new URL('/', request.url))
            }

            if(pathname.startsWith('/admin')){
                return NextResponse.redirect(new URL('/', request.url))
            }
        }
    }else{

        if(pathname === '/'){
            return NextResponse.next()
        }
    
        if((pathname === '/authentication/login' || pathname === '/authentication/registration' || pathname === '/authentication/forget-password')){
            return NextResponse.next()
        }
    
        if(pathname !== '/authentication/login' ){
            return NextResponse.redirect(new URL('/authentication/login', request.url))
        }
    }
    
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [ '/authentication/:path*', '/admin/:path*', '/zimba-cash/:path*','/'],
}