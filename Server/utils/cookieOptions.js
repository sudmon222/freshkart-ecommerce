const isProductionLike =
    process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

export const getCookieOptions = () => ({
    httpOnly: true,
    secure: isProductionLike,
    sameSite: isProductionLike ? 'none' : 'lax',
    path: '/'
});

export const getAuthCookieOptions = () => ({
    ...getCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000
});
