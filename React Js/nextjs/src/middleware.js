import { NextResponse } from 'next/server'

export default function middleware(request) {

    var isLogin = request.cookies.get('isLogin')?.value;

    if(isLogin == 0 && request.nextUrl.pathname.startsWith('/my-profile')){
        return NextResponse.redirect(new URL('/', request.url));
    }

    if(isLogin == 1 && request.nextUrl.pathname.startsWith('/login')){
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
