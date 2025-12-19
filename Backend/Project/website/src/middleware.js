import { NextResponse } from 'next/server'

export default function middleware(request) {

    var isLogin = request.cookies.get('token')?.value;

    console.log(isLogin)

    if((isLogin == '' || isLogin == undefined) && request.nextUrl.pathname.startsWith('/my-dashboard')){
        return NextResponse.redirect(new URL('/login-register', request.url));
    }

    if(isLogin != '' && isLogin != undefined && request.nextUrl.pathname.startsWith('/login-register')){
        return NextResponse.redirect(new URL('/my-dashboard', request.url));
    }

    return NextResponse.next();
}
