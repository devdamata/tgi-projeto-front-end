import { NextRequest, NextResponse } from "next/server";

export const TOKEN_KEY = 'auth_token';

export async function middleware(request: NextRequest) {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(cookieHeader.split('; ').map(cookie => {
        const [key, value] = cookie.split('=');
        return [key, value];
    }));

    const token = cookies[TOKEN_KEY];

    if (!token) {
        // Redireciona para a página de login se o token não existir
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Permite a requisição seguir se o token estiver presente
    return NextResponse.next();
}

export const config = {
    matcher: ['/app/:path*'], // Protege todas as rotas sob /app/
};
