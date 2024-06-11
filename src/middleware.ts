import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/login', '/register', '/profile', '/transactionDetails', '/checkout'],
};

export default async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    let cookie = request.cookies.get('token')?.value;

    if (path == '/login' || path == '/register') {

        if (!cookie) return NextResponse.next()

        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/auth/me`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cookie)
            })

            const data = await res.json()
            console.log(data)

            if (res.ok) return NextResponse.next()

            request.cookies.delete('token')
            cookies().delete('token')
            return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/`, request.url));

        } catch (error) {
            console.log(error)
            if (cookie) return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/`, request.url));
        }
    }

    if (path == '/profile') {
        if (!cookie) return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/login`, request.url));
    }

    if (path == '/transactionDetails') {
        if (!cookie) return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/`, request.url));
    }

    // if (path == '/checkout') {

    //     if (!cookie) return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/`, request.url));

    //     // this scope check for user basket so if its empty, checkout page is forbidden
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/UserRelatedData/get`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(cookie)
    //     })

    //     const { userRelatedData } = await response.json()

    //     if (!userRelatedData?.BasketItem?.length) return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/`, request.url));
    // }

    return NextResponse.next()
}