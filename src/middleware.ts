import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { v4 } from 'uuid';

import { deviceIdCookieName } from '@web/utils/config';

export default async function middleware(req: NextRequest) {
  const deviceId = cookies().get(deviceIdCookieName)?.value || v4();

  const response = NextResponse.next();
  response.cookies.set({
    name: deviceIdCookieName,
    value: deviceId,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'strict',
  });

  if (!req.nextUrl.pathname.match(/^\/(api)|(_next)|(directus-assets)\//)) {
    const utmSource = req.nextUrl.searchParams.get('utm_source');
    const utmMedium = req.nextUrl.searchParams.get('utm_medium');
    const utmCampaign = req.nextUrl.searchParams.get('utm_campaign');
    const utmTerm = req.nextUrl.searchParams.get('utm_term');
    if (utmSource) {
      response.cookies.set({
        name: 'utm_source',
        value: utmSource,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'strict',
      });
    }
    if (utmMedium) {
      response.cookies.set({
        name: 'utm_medium',
        value: utmMedium,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'strict',
      });
    }
    if (utmCampaign) {
      response.cookies.set({
        name: 'utm_campaign',
        value: utmCampaign,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'strict',
      });
    }
    if (utmTerm) {
      response.cookies.set({
        name: 'utm_term',
        value: utmTerm,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'strict',
      });
    }
  }

  return response;
}
