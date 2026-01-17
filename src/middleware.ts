import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: [
        // Ignore internal paths and static files
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ]
};